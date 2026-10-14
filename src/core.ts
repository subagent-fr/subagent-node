// Transport HTTP du SDK : un POST par opération. Aucune dépendance (fetch de Node 20 et plus).

import { SubagentConnectionError, SubagentError } from "./errors.js";
import { VERSION } from "./version.js";

export const BASE_URL = "https://api.subagent.fr";

/** Les réglages du client. */
export interface SubagentOptions {
  /** La clé `sak_…` de l'agent. Absente : variable d'environnement SUBAGENT_KEY. `""` : sans clé. */
  apiKey?: string;
  /** L'adresse du service. Par défaut : https://api.subagent.fr, ou SUBAGENT_BASE_URL. */
  baseUrl?: string;
  /** Délai d'un appel, en millisecondes (30 000 par défaut). */
  timeout?: number;
  /** Réessais quand le serveur ne répond pas, pour les seuls appels rejouables sans risque (2 par défaut). */
  maxRetries?: number;
  /** Un autre `fetch` que celui de la plateforme. */
  fetch?: typeof fetch;
}

/** Les options d'un appel par nom (`client.call`). */
export interface CallOptions {
  /** Clé d'idempotence, envoyée dans l'en-tête `Idempotency-Key`. */
  idempotencyKey?: string;
}

// Réponses d'un mandataire devant le service, sans corps d'erreur Subagent.
const PASSERELLE = new Set([502, 503, 504]);

function environnement(nom: string): string | undefined {
  return typeof process !== "undefined" ? process.env?.[nom] || undefined : undefined;
}

export class Transport {
  apiKey: string | undefined;
  readonly baseUrl: string;
  readonly timeout: number;
  readonly maxRetries: number;
  /** Millisecondes avant le premier réessai, doublées ensuite. */
  attente = 500;
  readonly #fetch: typeof fetch;

  constructor(options: SubagentOptions = {}) {
    // Une clé donnée l'emporte sur l'environnement ; "" veut dire « sans clé », même si SUBAGENT_KEY existe.
    this.apiKey = (options.apiKey !== undefined ? options.apiKey : environnement("SUBAGENT_KEY")) || undefined;
    this.baseUrl = (options.baseUrl || environnement("SUBAGENT_BASE_URL") || BASE_URL).replace(/\/+$/, "");
    this.timeout = options.timeout ?? 30_000;
    this.maxRetries = Math.max(0, Math.trunc(options.maxRetries ?? 2));
    this.#fetch = options.fetch ?? fetch;
  }

  /**
   * Appelle `POST /v1/{operation}` et rend le résultat de l'opération.
   *
   * `rejouable` : l'appel peut être rejoué sans risque de doublon (lecture seule, ou clé
   * d'idempotence). Seul un appel rejouable est réessayé, et seulement quand le serveur n'a pas
   * répondu ; un refus du serveur n'est jamais réessayé.
   */
  async post<T>(
    operation: string,
    args: object,
    options: { idempotencyKey?: string; rejouable: boolean },
  ): Promise<T> {
    const corps = JSON.stringify(
      Object.fromEntries(Object.entries(args).filter(([, valeur]) => valeur !== undefined && valeur !== null)),
    );
    const entetes: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": `subagent-mail-node/${VERSION}`,
    };
    if (this.apiKey) entetes.Authorization = `Bearer ${this.apiKey}`;
    if (options.idempotencyKey !== undefined) entetes["Idempotency-Key"] = options.idempotencyKey;
    const url = `${this.baseUrl}/v1/${operation}`;
    const essais = 1 + (options.rejouable ? this.maxRetries : 0);

    for (let essai = 0; ; essai++) {
      const dernier = essai === essais - 1;
      let reponse: Response;
      let texte: string;
      try {
        reponse = await this.#fetch(url, {
          method: "POST",
          headers: entetes,
          body: corps,
          signal: AbortSignal.timeout(this.timeout),
        });
        texte = await reponse.text();
      } catch (cause) {
        if (!dernier) {
          await pause(this.attente * 2 ** essai);
          continue;
        }
        const suite = options.rejouable
          ? ""
          : " L'appel n'a pas été réessayé : il a pu aboutir. Relisez l'état avant de recommencer, ou rejouez-le avec la même idempotency_key.";
        throw new SubagentConnectionError(`Pas de réponse de ${this.baseUrl} (${raison(cause)}).${suite}`, {
          cause,
        });
      }

      const valeur = objet(texte);
      if (reponse.ok) {
        if (valeur === undefined) {
          throw new SubagentConnectionError(`Réponse illisible du serveur (HTTP ${reponse.status}).`, {
            status: reponse.status,
          });
        }
        return valeur as T;
      }
      const refus = valeur?.error;
      if (estUnObjet(refus) && typeof refus.code === "string") {
        throw new SubagentError({
          status: reponse.status,
          code: refus.code,
          message: typeof refus.message === "string" ? refus.message : "",
          hint: typeof refus.hint === "string" ? refus.hint : undefined,
        });
      }
      if (PASSERELLE.has(reponse.status) && !dernier) {
        await pause(this.attente * 2 ** essai);
        continue;
      }
      throw new SubagentConnectionError(
        `Réponse inattendue du serveur (HTTP ${reponse.status}), sans corps d'erreur Subagent.`,
        { status: reponse.status },
      );
    }
  }
}

function estUnObjet(valeur: unknown): valeur is Record<string, unknown> {
  return typeof valeur === "object" && valeur !== null && !Array.isArray(valeur);
}

function objet(texte: string): Record<string, unknown> | undefined {
  try {
    const valeur: unknown = JSON.parse(texte);
    return estUnObjet(valeur) ? valeur : undefined;
  } catch {
    return undefined;
  }
}

function raison(cause: unknown): string {
  if (cause instanceof Error) {
    const profonde = cause.cause instanceof Error ? cause.cause.message : "";
    return profonde || cause.message;
  }
  return String(cause);
}

function pause(ms: number): Promise<void> {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}

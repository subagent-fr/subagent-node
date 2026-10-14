// Le comportement du client contre le faux serveur : clé, refus, idempotence, réessais.
//
//     npm test

import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, test } from "node:test";

import { CODES, Subagent, SubagentConnectionError, SubagentError, VERSION } from "../dist/index.js";
import { CLE_AGENT, CLE_HUMAIN, DESTINATAIRE_BLOQUE, FauxServeur, OPERATIONS } from "./faux-serveur.mjs";

const BOITE = "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95";
const MESSAGE = "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48";
const ENVOI = { inbox_id: BOITE, to: "nadia.morel@exemple.com", subject: "Rendez-vous de jeudi", text: "Bonjour, …" };

let serveur;
let client;

function nouveauClient(options = {}) {
  const c = new Subagent({ apiKey: CLE_AGENT, baseUrl: serveur.url, ...options });
  c.transport.attente = 0; // pas d'attente entre deux réessais pendant les tests
  return c;
}

beforeEach(async () => {
  serveur = await new FauxServeur().demarrer();
  client = nouveauClient();
});
afterEach(() => serveur.arreter());

/** Attend que `appel` soit refusé par le serveur, et rend le refus. */
async function refus(appel) {
  try {
    await appel();
  } catch (erreur) {
    assert.ok(erreur instanceof SubagentError, `SubagentError attendue, reçu : ${erreur}`);
    return erreur;
  }
  assert.fail("un refus était attendu");
}

describe("clé", () => {
  test("la clé part en en-tête Authorization", async () => {
    await client.inboxStatus();
    const entetes = serveur.derniere.entetes;
    assert.equal(entetes.authorization, `Bearer ${CLE_AGENT}`);
    assert.equal(entetes["user-agent"], `subagent-mail-node/${VERSION}`);
    assert.equal(entetes["content-type"], "application/json");
  });

  test("la clé se lit dans l'environnement", async () => {
    const anciens = { cle: process.env.SUBAGENT_KEY, url: process.env.SUBAGENT_BASE_URL };
    process.env.SUBAGENT_KEY = CLE_AGENT;
    process.env.SUBAGENT_BASE_URL = serveur.url;
    try {
      await new Subagent().inboxStatus();
    } finally {
      for (const [nom, valeur] of [["SUBAGENT_KEY", anciens.cle], ["SUBAGENT_BASE_URL", anciens.url]]) {
        if (valeur === undefined) delete process.env[nom];
        else process.env[nom] = valeur;
      }
    }
    assert.equal(serveur.derniere.entetes.authorization, `Bearer ${CLE_AGENT}`);
  });

  test("une clé seule suffit comme argument", async () => {
    process.env.SUBAGENT_BASE_URL = serveur.url;
    try {
      await new Subagent(CLE_AGENT).inboxStatus();
    } finally {
      delete process.env.SUBAGENT_BASE_URL;
    }
    assert.equal(serveur.derniere.entetes.authorization, `Bearer ${CLE_AGENT}`);
  });

  test("sans clé, seule l'inscription passe", async () => {
    const sansCle = nouveauClient({ apiKey: "" });
    assert.equal(sansCle.apiKey, undefined);
    const erreur = await refus(() => sansCle.inboxStatus());
    assert.deepEqual([erreur.status, erreur.code], [401, "unauthorized"]);
    assert.match(erreur.hint, /sign_up/);

    const inscription = await sansCle.signUp({ username: "atelier-exemple", human_email: "marie@exemple.fr" });
    assert.equal(serveur.derniere.entetes.authorization, undefined);
    assert.equal(inscription.api_key, CLE_AGENT);
    // La clé rendue par sign_up sert aux appels suivants du même client.
    assert.equal(sansCle.apiKey, CLE_AGENT);
    await sansCle.verify({ otp_code: "482913" });
    assert.equal(serveur.derniere.entetes.authorization, `Bearer ${CLE_AGENT}`);
  });

  test("une clé inconnue est refusée", async () => {
    const erreur = await refus(() => nouveauClient({ apiKey: "sak_inconnue" }).inboxStatus());
    assert.equal(erreur.code, "unauthorized");
  });
});

describe("refus", () => {
  test("un refus porte code, message et piste", async () => {
    const erreur = await refus(() => client.sendEmail({ ...ENVOI, to: DESTINATAIRE_BLOQUE }));
    assert.equal(erreur.status, 422);
    assert.equal(erreur.code, "recipient_suppressed");
    assert.ok(erreur.message.includes(DESTINATAIRE_BLOQUE));
    assert.ok(erreur.hint);
    assert.equal(String(erreur), `recipient_suppressed : ${erreur.message} Piste : ${erreur.hint}`);
    assert.equal(CODES[erreur.code], erreur.status);
  });

  test("un agent ne valide pas son brouillon", async () => {
    const erreur = await refus(() => client.approveMessage({ message_id: MESSAGE }));
    assert.deepEqual([erreur.status, erreur.code], [403, "forbidden"]);
    assert.match(erreur.message, /approve/);
    // La clé d'un humain, elle, porte approve.
    const valide = await nouveauClient({ apiKey: CLE_HUMAIN }).approveMessage({ message_id: MESSAGE });
    assert.equal(valide.id, MESSAGE);
  });

  test("un refus n'est jamais réessayé", async () => {
    await refus(() => client.sendEmail({ ...ENVOI, to: DESTINATAIRE_BLOQUE, idempotency_key: "cle-1" }));
    assert.equal(serveur.connexions, 1);
  });

  test("un paramètre inconnu est refusé par le serveur", async () => {
    const erreur = await refus(() =>
      client.call("send_email", { ...ENVOI, thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814" }),
    );
    assert.equal(erreur.code, "invalid_argument");
    assert.match(erreur.message, /thread_id/);
  });

  test("une opération inconnue", async () => {
    const erreur = await refus(() => client.call("envoyer_un_fax"));
    assert.deepEqual([erreur.status, erreur.code], [404, "unknown_operation"]);
  });

  test("espace non vérifié", async () => {
    serveur.verifie = false;
    const erreur = await refus(() => client.sendEmail(ENVOI));
    assert.equal(erreur.code, "space_unverified");
    assert.match(erreur.hint, /verify/);
  });

  test("chaque code du registre est connu du SDK", () => {
    assert.equal(Object.keys(CODES).length, 84);
    for (const code of ["recipient_suppressed", "duplicate_recipient", "idempotency_conflict", "unauthorized"]) {
      assert.ok(code in CODES, code);
    }
  });
});

describe("arguments", () => {
  test("un argument absent ne part pas", async () => {
    await client.sendEmail({ ...ENVOI, html: undefined, requires_approval: undefined });
    assert.deepEqual(serveur.derniere.arguments, ENVOI);
  });

  test("brouillon", async () => {
    const resultat = await client.sendEmail({ ...ENVOI, requires_approval: true });
    assert.equal(resultat.message.status, "draft");
    assert.equal(resultat.estimated_send_at, null);
  });
});

describe("idempotence", () => {
  test("la clé d'idempotence part en en-tête", async () => {
    await client.sendEmail({ ...ENVOI, idempotency_key: "rdv-jeudi-nadia-morel" });
    assert.equal(serveur.derniere.entetes["idempotency-key"], "rdv-jeudi-nadia-morel");
    assert.equal(serveur.derniere.arguments.idempotency_key, "rdv-jeudi-nadia-morel");
  });

  test("rejouer ne crée rien", async () => {
    const premier = await client.sendEmail({ ...ENVOI, idempotency_key: "rdv-jeudi-nadia-morel" });
    const second = await client.sendEmail({ ...ENVOI, idempotency_key: "rdv-jeudi-nadia-morel" });
    assert.equal(premier.replayed, false);
    assert.equal(second.replayed, true);
    assert.equal(second.message.id, premier.message.id);
  });

  test("même clé, autre contenu : refus explicite", async () => {
    await client.sendEmail({ ...ENVOI, idempotency_key: "rdv-jeudi-nadia-morel" });
    const erreur = await refus(() =>
      client.sendEmail({ ...ENVOI, text: "Autre texte.", idempotency_key: "rdv-jeudi-nadia-morel" }),
    );
    assert.deepEqual([erreur.status, erreur.code], [409, "idempotency_conflict"]);
  });

  test("reply_to_thread aussi, et par call", async () => {
    await client.replyToThread({
      thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
      text: "Merci.",
      idempotency_key: "reponse-1",
    });
    assert.equal(serveur.derniere.entetes["idempotency-key"], "reponse-1");
    await client.call("send_email", ENVOI, { idempotencyKey: "par-call-1" });
    assert.equal(serveur.derniere.arguments.idempotency_key, "par-call-1");
  });
});

describe("réessais", () => {
  test("une lecture est réessayée quand le serveur ne répond pas", async () => {
    serveur.pannes = 2;
    const etat = await client.inboxStatus();
    assert.ok("inboxes" in etat);
    assert.equal(serveur.connexions, 3);
  });

  test("un envoi sans clé d'idempotence n'est pas réessayé", async () => {
    serveur.pannes = 1;
    await assert.rejects(
      () => client.sendEmail(ENVOI),
      (erreur) => erreur instanceof SubagentConnectionError && /idempotency_key/.test(erreur.message),
    );
    assert.equal(serveur.connexions, 1);
  });

  test("un envoi avec clé d'idempotence est réessayé", async () => {
    serveur.pannes = 1;
    const resultat = await client.sendEmail({ ...ENVOI, idempotency_key: "rdv-jeudi-nadia-morel" });
    assert.equal(serveur.connexions, 2);
    assert.equal(resultat.message.to, ENVOI.to);
  });

  test("une réponse de mandataire n'est pas un refus", async () => {
    serveur.passerelles = 1;
    await assert.rejects(
      () => client.sendEmail(ENVOI),
      (erreur) => erreur instanceof SubagentConnectionError && erreur.status === 502,
    );
    serveur.passerelles = 1;
    assert.ok("items" in (await client.listThreads())); // lecture : réessayée
  });

  test("maxRetries à zéro", async () => {
    const sansReessai = nouveauClient({ maxRetries: 0 });
    serveur.pannes = 1;
    await assert.rejects(() => sansReessai.inboxStatus(), SubagentConnectionError);
    assert.equal(serveur.connexions, 1);
  });

  test("serveur injoignable", async () => {
    const perdu = new Subagent({ apiKey: CLE_AGENT, baseUrl: "http://127.0.0.1:9", maxRetries: 0, timeout: 2000 });
    await assert.rejects(() => perdu.inboxStatus(), SubagentConnectionError);
  });

  test("délai dépassé", async () => {
    serveur.lenteur = 400;
    const presse = nouveauClient({ timeout: 50, maxRetries: 0 });
    await assert.rejects(() => presse.inboxStatus(), SubagentConnectionError);
  });
});

describe("couverture", () => {
  test("une méthode par opération du registre", () => {
    const camel = (nom) => nom.replace(/_([a-z])/g, (_, lettre) => lettre.toUpperCase());
    for (const nom of Object.keys(OPERATIONS)) {
      assert.equal(typeof Subagent.prototype[camel(nom)], "function", nom);
    }
  });
});

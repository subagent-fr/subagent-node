> **This repository has moved to [escouade-io/escouade-mail-node](https://github.com/escouade-io/escouade-mail-node).** Subagent is now Escouade Mail; this repository is archived.
>
> **Ce dépôt est devenu [escouade-io/escouade-mail-node](https://github.com/escouade-io/escouade-mail-node).** Subagent devient Escouade Mail ; ce dépôt est archivé.

# subagent-node

Le SDK TypeScript de **Subagent Mail** : des boîtes mail pour agents IA. Votre agent crée sa boîte, écrit, lit ses fils et répond avec sa propre adresse. Le serveur applique les règles d'envoi : montée progressive, créneaux, validation humaine, désinscription.

- **Une méthode par opération du serveur** (67), aux noms des outils du MCP en camelCase, avec les mêmes arguments.
- **Aucune dépendance** : le `fetch` de la plateforme, Node 20 ou plus.
- **Typé** : arguments et résultats sont tirés des schémas du serveur.
- **Généré** depuis le registre d'opérations du serveur, jamais écrit à la main.

## Installer

```sh
npm install subagent-mail
```

Le paquet est un module ES : `import { Subagent } from "subagent-mail"`.

## Démarrer

### 1. Une clé

Sans clé, une seule opération est ouverte : `sign_up`. Elle rend une clé, affichée une seule fois, et une boîte sur `subagentmail.fr`. Votre humain reçoit un code à 6 chiffres par e-mail ; `verify` ouvre l'envoi.

```ts
import { Subagent } from "subagent-mail";

const client = new Subagent(); // lit SUBAGENT_KEY ; sans clé, seule sign_up est ouverte

const inscription = await client.signUp({ username: "atelier-exemple", human_email: "marie@exemple.fr" });
console.log(inscription.api_key); // affichée une seule fois : rangez-la
console.log(inscription.inbox?.address); // atelier-exemple@subagentmail.fr

await client.verify({ otp_code: "482913" }); // le code reçu par votre humain
```

Vous avez déjà une clé ? Rangez-la hors du code, le client la lit seul :

```sh
export SUBAGENT_KEY="sak_…"
```

### 2. Où en est la boîte

`inboxStatus` est le point de départ de toute session : l'espace, les permissions de la clé, le créneau d'envoi, et pour chaque boîte son quota du jour.

```ts
const { inboxes = [] } = await client.inboxStatus();
const boite = inboxes[0];
if (!boite?.id) throw new Error("Aucune boîte : créez-en une avec createInbox.");
console.log(boite.address, boite.quota?.remaining_today);
```

### 3. Un premier envoi

Un envoi de test ne part qu'à l'humain de l'espace ou à une autre de ses boîtes : remplacez l'adresse par la vôtre.

```ts
const envoi = await client.sendEmail({
  inbox_id: boite.id,
  to: "marie@exemple.fr",
  subject: "Premier message",
  text: "Bonjour Marie,\n\nCeci est mon premier message.\n",
  test: true, // à soi-même seulement
  requires_approval: true, // reste en brouillon jusqu'à la validation d'un humain
  idempotency_key: "premier-message-1", // rejouer cet appel ne crée pas de doublon
});
console.log(envoi.message?.status); // draft
```

Sans `requires_approval`, le message entre en file et part dans le créneau d'envoi, selon le quota du jour de la boîte. `estimated_send_at` donne l'heure de départ au plus tôt. Un message en file n'est pas une erreur : ne le renvoyez pas.

## Les méthodes

| Famille | Méthodes |
| --- | --- |
| Inscription | `signUp`, `verify`, `attachHuman` |
| Établi MCP | `openWorkspace`, `navigateWorkspace`, `workspaceEvents` |
| Boîtes | `inboxStatus`, `activityReport`, `listInboxes`, `createInbox`, `updateInbox`, `deleteInbox`, `requestInboxReview` |
| Domaines | `inspectDomain`, `addDomain`, `verifyDomain`, `listDomains`, `domainQuality`, `removeDomain` |
| Envoi | `sendEmail`, `replyToThread` |
| Fils | `listThreads`, `getThread`, `classifyThread`, `closeThread`, `getMessage` |
| Brouillons | `listDrafts`, `updateDraft`, `approveMessage`, `cancelMessage` |
| Pièces jointes | `attachFiles`, `removeAttachment`, `getAttachment` |
| Liste de blocage | `addSuppression`, `removeSuppression`, `listSuppressions` |
| Contacts et audiences | `listContacts`, `getContact`, `saveContact`, `setContactAudiences`, `listAudiences`, `getAudience`, `saveAudience`, `importContacts`, `removeAudienceContact` |
| Campagnes | `listCampaigns`, `getCampaign`, `saveCampaign`, `previewCampaign`, `campaignAction`, `campaignMetrics`, `campaignHistory`, `listCampaignTemplates`, `saveCampaignTemplate` |
| Main courante | `listEvents`, `workspaceSnapshot` |
| Forfait | `billingStatus`, `subscribe`, `cancelSubscription` |
| Espace et accès | `getSettings`, `updateSettings`, `listKeys`, `createKey`, `revokeKey`, `setWebhook`, `removeWebhook`, `closeSpace` |

Arguments, résultats et un exemple par méthode : [`reference.md`](reference.md). Sur le site : [documentation](https://subagent.fr/docs) · [`openapi.json`](https://api.subagent.fr/openapi.json) · [`llms.txt`](https://api.subagent.fr/llms.txt).

Les champs rendus sont typés facultatifs (`envoi.message?.id`) : le serveur ne déclare aucun champ de sortie obligatoire, et il peut en ajouter.

## Quand le serveur refuse

Un refus n'est pas une panne. Il lève `SubagentError`, qui porte un `code` stable, un `message` en français et une piste (`hint`) qui dit quoi faire. La piste se suit, elle ne se contourne pas.

```ts
import { SubagentError } from "subagent-mail";

try {
  await client.approveMessage({ message_id: envoi.message?.id ?? "" });
} catch (refus) {
  if (!(refus instanceof SubagentError)) throw refus;
  console.log(refus.code); // forbidden : la clé d'un agent ne porte pas approve
  console.log(refus.message); // la phrase du serveur, en français
  console.log(refus.hint); // ce qu'il faut faire
  console.log(refus.status); // 403
}
```

Un agent ne valide jamais son propre brouillon : `approveMessage` demande la permission `approve`, que la clé rendue par `signUp` ne porte pas.

Les refus les plus courants :

| `code` | HTTP | Ce qui s'est passé | Que faire |
| --- | --- | --- | --- |
| `space_unverified` | 403 | L'espace n'est pas vérifié : ses boîtes reçoivent, mais n'envoient pas. | Demander à l'humain le code à 6 chiffres, puis appeler `verify`. S'il n'a rien reçu, ou si aucun e-mail n'est rattaché à l'espace : `attach_human`. |
| `trial_limit` | 429 | Sur un serveur réglé sans forfaits, le nombre de destinataires distincts permis depuis le domaine commun est atteint. | Suivre la piste : elle donne le moment où l'envoi reprend. |
| `recipient_suppressed` | 422 | Le destinataire est bloqué : désinscription, plainte, adresse morte ou blocage manuel. | Ne plus écrire à cette adresse, depuis aucune boîte. |
| `duplicate_recipient` | 409 | Cette boîte a déjà écrit un premier message à ce destinataire dans les 30 derniers jours. | Répondre dans le fil donné par la piste, avec `reply_to_thread`. |
| `key_daily_cap` | 429 | Le plafond de messages par jour de la clé est atteint. | Reprendre le lendemain, à partir de 0 h, heure de Paris. |
| `inbox_suspended` | 409 | Le coupe-circuit a suspendu la boîte. La raison est dans le message. | Vérifier la liste de destinataires. La reprise est manuelle, par un administrateur de Subagent : l'humain la demande avec `request_inbox_review`. |
| `unresolved_placeholder` | 422 | Un champ entre doubles accolades est resté dans le sujet ou le texte. | Remplacer chaque champ par sa valeur. Seul `{{unsubscribe_url}}` est accepté. |
| `idempotency_conflict` | 409 | La même `idempotency_key` a déjà servi pour un contenu différent. | Même message : réutiliser la clé telle quelle. Nouveau message : en prendre une nouvelle. |
| `forbidden` | 403 | La clé ne porte pas la permission que l'outil demande. | Pour `approve` : le geste revient à l'humain, depuis son assistant branché à `https://api.subagent.fr/connect`. La piste le dit. |

Tous les codes (90) : [`reference.md`](reference.md#erreurs), ou l'objet `CODES` du paquet.

`SubagentConnectionError` est l'autre cas : le serveur n'a pas répondu (réseau, délai dépassé). Rien ne dit alors si l'appel a abouti.

## Idempotence

Passez une `idempotency_key` à chaque envoi qu'un agent pourrait rejouer. Elle part dans l'en-tête `Idempotency-Key`.

```ts
const compteRendu = {
  inbox_id: boite.id,
  to: "marie@exemple.fr",
  subject: "Compte rendu",
  text: "Bonjour Marie, …",
  test: true,
  idempotency_key: "compte-rendu-12-octobre",
};
const premier = await client.sendEmail(compteRendu);
const second = await client.sendEmail(compteRendu);
console.log(premier.replayed, second.replayed); // false true : rien de nouveau n'a été créé
```

Même clé, même contenu : le message déjà créé, avec `replayed` à vrai. Même clé, autre contenu : refus `idempotency_conflict`.

Le client ne réessaie seul que ce qui se rejoue sans risque : une lecture, ou un envoi qui porte une `idempotency_key`, et seulement quand le serveur n'a pas répondu. Un refus n'est jamais réessayé.

## Réglages

```ts
const autre = new Subagent({ apiKey: process.env.SUBAGENT_KEY, timeout: 10_000, maxRetries: 0 });
```

| Option | Par défaut | Rôle |
| --- | --- | --- |
| `apiKey` | variable `SUBAGENT_KEY` | La clé `sak_…` de l'agent. |
| `baseUrl` | `https://api.subagent.fr`, ou variable `SUBAGENT_BASE_URL` | L'adresse du service. |
| `timeout` | 30 000 | Délai d'un appel, en millisecondes. |
| `maxRetries` | 2 | Réessais quand le serveur ne répond pas, pour les seuls appels rejouables. |
| `fetch` | celui de la plateforme | Un autre `fetch`. |

Une opération plus récente que ce SDK s'appelle par son nom : `await client.call("nom", { argument: "valeur" })`.

Le service refuse les appels venus de la page web d'un autre site (en-tête `Origin`) : ce SDK s'emploie côté serveur ou dans un agent, pas dans un navigateur.

## Tests

Les tests tournent contre un faux serveur local, généré depuis le même registre : il contrôle la clé, les permissions et chaque argument contre le schéma, et n'envoie rien.

```sh
npm install
npm test
```

Pour essayer un script à la main sans toucher au service :

```sh
node tests/faux-serveur.mjs   # http://127.0.0.1:8787, clé sak_exemple_agent
```

## Contribuer

Ce dépôt est généré depuis le registre d'opérations du serveur : une modification faite ici à la main serait écrasée à la génération suivante. Ouvrez un ticket plutôt qu'une demande de fusion.

## Licence

MIT. Le serveur Subagent, lui, n'est pas ouvert : ces clients ne servent qu'avec une clé Subagent.

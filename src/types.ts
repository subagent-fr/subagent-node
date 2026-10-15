// Les arguments et les objets rendus par les opérations.
//
// Le serveur ne déclare aucun champ de sortie comme obligatoire et peut en ajouter : chaque
// champ rendu est donc facultatif, et un champ inconnu ne casse rien.
//
// Généré depuis le registre d'opérations du serveur (clients/generer.py) : ne le modifiez pas.


// ─── Objets rendus ───────────────────────────────────────────────────────────────────────────

/** Rendu par create_inbox, update_inbox. */
export interface Inbox {
  /** Adresse e-mail. */
  address?: string;
  /** Alias d’expédition autorisés ; quota et réception partagés avec la boîte. */
  aliases?: string[];
  /** Nom affiché des envois. */
  display_name?: string;
  drafts?: number;
  /** Identifiant de la boîte (inb_…). */
  id?: string;
  /** Prochain départ au plus tôt (ISO 8601). */
  next_send_at?: string | null;
  queued?: number;
  /** daily_quota, daily_max, sent_today, remaining_today. */
  quota?: Record<string, unknown>;
  /** Créneau d’envoi en clair. */
  send_window?: string;
  /** Boîte du domaine commun, et non d’un domaine de l’espace. */
  shared?: boolean;
  status?: "active" | "suspended" | "deleted";
  /** Depuis quand la boîte est dans cet état (ISO 8601) : la date d’une suspension, ou d’une reprise. */
  status_changed_at?: string | null;
  status_reason?: string | null;
  /** Pour une boîte suspendue : review (none, ou requested quand la reprise a été demandée) et requested_at. null sinon. */
  suspension?: Record<string, unknown> | null;
  /** Réchauffage : semaine, palier du jour, paliers, terminé ou non. */
  warmup?: Record<string, unknown>;
}

/** Rendu par sign_up. */
export interface SignUpResult {
  /** Votre clé d’API (sak_…). Affichée une seule fois : Subagent n’en garde qu’une empreinte. */
  api_key?: string;
  /** Fin de validité du code (ISO 8601). */
  code_expires_at?: string | null;
  /** Un code de vérification est parti à l’humain. */
  code_sent?: boolean;
  /** E-mail de l’humain, masqué. */
  human_email?: string | null;
  inbox?: Inbox;
  /** Adresse du MCP, à appeler avec l’en-tête Authorization: Bearer <clé>. */
  mcp_url?: string;
  /** Identifiant de l’espace. */
  space_id?: string;
  /** unverified : la boîte reçoit, n’envoie pas. */
  status?: "unverified" | "verified";
  /** Limites d’essai une fois l’espace vérifié. */
  trial_limits?: Record<string, unknown>;
}

/** Rendu par verify. */
export interface VerifyResult {
  /** Identifiant de l’espace. */
  space_id?: string;
  /** Limites d’essai des boîtes du domaine commun. */
  trial_limits?: Record<string, unknown>;
  /** L’espace est vérifié : l’envoi est ouvert. */
  verified?: boolean;
  /** ISO 8601. */
  verified_at?: string;
}

/** Rendu par attach_human. */
export interface AttachHumanResult {
  /** Fin de validité du code (ISO 8601). */
  code_expires_at?: string;
  /** Un code est parti. */
  code_sent?: boolean;
  /** E-mail de l’humain, masqué. */
  human_email?: string;
  /** L’adresse remplace celle qui était rattachée. */
  replaced?: boolean;
}

/** Rendu par open_workspace. */
export interface OpenWorkspaceResult {
  _navigation?: Record<string, unknown>;
  /** Instance libérée. */
  closed?: boolean;
  /** Instance de cet établi. */
  instance_id?: string;
  sequence?: number;
  /** pending ou superseded : navigation demandée, pas confirmation de son affichage. */
  status?: string;
  /** Aucune nouvelle page à appliquer. */
  unchanged?: boolean;
}

/** Rendu par inbox_status. */
export interface InboxStatusResult {
  /** Où en est le paiement de l’espace : standing (exempt, unpaid, paid), plan, paid_until, subscription_status (none, pending, active, past_due, canceled), last_payment (none, pending, paid, failed). null : rien à payer sur ce serveur. */
  billing?: Record<string, unknown> | null;
  /** L’adresse de l’humain de l’espace, masquée (m•••@societe.fr). null : aucun humain rattaché. */
  human_email?: string | null;
  inboxes?: Inbox[];
  key?: Record<string, unknown>;
  /** Instant de cet état (ISO 8601, heure de Paris). */
  now?: string;
  /** Tout envoi de l’espace attend une validation humaine. */
  require_approval?: boolean;
  /** Créneau d’envoi en clair. */
  send_window?: string;
  tenant?: Record<string, unknown>;
  /** Limites d’essai des boîtes du domaine commun : limit, used, window, next_limit, next_at. null : aucune. */
  trial?: Record<string, unknown> | null;
  /** L’espace est vérifié : il envoie. Sinon ses boîtes reçoivent seulement (verify). */
  verified?: boolean;
}

/** Rendu par workspace_snapshot. */
export interface WorkspaceSnapshotResult {
  /** Empreinte opaque de l’accès. */
  access_key?: string;
  /** Dernière préparation. */
  refreshed_at?: string;
  /** Révision opaque. */
  revision?: string;
  unavailable?: Record<string, unknown>;
  unchanged?: boolean;
  views?: Record<string, unknown>;
}

/** Rendu par activity_report. */
export interface ActivityReportResult {
  /** Où en est le paiement de l’espace : standing (exempt, unpaid, paid), plan, paid_until, subscription_status, last_payment. null : rien à payer sur ce serveur. */
  billing?: Record<string, unknown> | null;
  /** Un objet par jour de la période, dans l’ordre : date, sent, quota (0 un jour sans envoi), replies, bounces, unsubscribes, complaints. */
  by_day?: Record<string, unknown>[];
  inboxes?: Inbox[];
  /** La clé qui lit : name, permissions. */
  key?: Record<string, unknown>;
  /** Instant du relevé (ISO 8601, heure de Paris). */
  now?: string;
  /** Ce qui attend une décision. drafts : count et items (les cinq brouillons les plus récents : id, inbox_id, to, to_name, subject, is_reply, created_at). replies : count et items (les cinq fils les plus récents dont le dernier message est un e-mail reçu sans réponse), ou null sans la permission read. domains : les domaines non vérifiés (id, domain, status, required_missing), ou null sans la permission read ou manage_inboxes. suspended_inboxes : id, address, status_reason, suspended_at. */
  pending?: Record<string, unknown>;
  /** kind (today ou week), from et to : jours de Paris (AAAA-MM-JJ), compris. */
  period?: Record<string, unknown>;
  /** Tout envoi de l’espace attend une validation humaine. */
  require_approval?: boolean;
  /** Créneau d’envoi en clair. */
  send_window?: string;
  /** L’espace : id, name. */
  tenant?: Record<string, unknown>;
  /** Sur la période : sent (envois comptés au quota), quota (somme des quotas du jour), queued (en file à l’instant), replies (réponses reçues dans un fil, hors réponses automatiques), bounces, unsubscribes, complaints. */
  totals?: Record<string, unknown>;
  /** L’espace est vérifié : il envoie. */
  verified?: boolean;
}

/** Rendu par list_events. */
export interface ListEventsResult {
  /** Le jour lu (AAAA-MM-JJ), ou null pour l’historique d’un objet. */
  day?: string | null;
  /** Du plus récent au plus ancien : id, at, kind, text (phrase nominale en français, sans sujet), actor (kind agent, human ou service ; name ; you), et les objets touchés (inbox_id, thread_id, message_id, campaign_id, audience_id, contact, domain) quand il y en a. */
  events?: Record<string, unknown>[];
  next_cursor?: string | null;
}

/** Rendu par billing_status. */
export interface BillingStatusResult {
  /** Les factures, de la plus récente à la plus ancienne : number, issued_on, amount_cents, amount, url. */
  invoices?: Record<string, unknown>[];
  /** L’issue du dernier paiement ouvert par subscribe. */
  last_payment?: "none" | "pending" | "paid" | "failed";
  /** La période payée : start, until (ISO 8601). */
  period?: Record<string, unknown> | null;
  /** Le forfait en cours : code, price_cents, price, inboxes, monthly_emails. */
  plan?: Record<string, unknown> | null;
  /** Les forfaits en vente. */
  plans?: Record<string, unknown>[];
  /** exempt : aucun forfait ne s’applique à cet espace ; unpaid : aucun forfait en cours ; paid : forfait en cours. */
  standing?: "exempt" | "unpaid" | "paid";
  /** Le prélèvement mensuel : status (none, pending, active, past_due, canceled), renews, next_charge_on (date du prochain prélèvement, ou null), ends_at (fin du forfait quand rien ne le renouvelle, ou null). */
  subscription?: Record<string, unknown>;
  /** inboxes et inboxes_max ; emails (partis depuis le début du mois en cours de la période, emails_since) et emails_max ; emails_reset_at : quand le volume repart. */
  usage?: Record<string, unknown>;
}

/** Rendu par subscribe. */
export interface SubscribeResult {
  /** Fin de validité du lien (ISO 8601). */
  expires_at?: string | null;
  /** L’adresse masquée de l’humain de l’espace. */
  human?: string | null;
  /** Le lien à donner à votre humain. */
  payment_url?: string | null;
  /** Le forfait proposé, ou le forfait en cours. */
  plan?: Record<string, unknown> | null;
  /** Les forfaits en vente. */
  plans?: Record<string, unknown>[];
  /** link_ready : le lien est prêt ; subscribed : un forfait est déjà en cours et prélevé ; exempt : aucun forfait ne s’applique à cet espace. */
  status?: "link_ready" | "subscribed" | "exempt";
}

/** Rendu par cancel_subscription. */
export interface CancelSubscriptionResult {
  /** Fin du mois payé (ISO 8601) : l’envoi continue jusque-là. */
  paid_until?: string | null;
  /** Le forfait qui s’arrêtera. */
  plan?: Record<string, unknown> | null;
  status?: "canceled" | "already_canceled";
}

/** Rendu par list_inboxes. */
export interface ListInboxesResult {
  items?: Inbox[];
  /** À repasser en cursor pour la page suivante ; null à la dernière page. */
  next_cursor?: string | null;
}

/** Rendu par delete_inbox. */
export interface DeleteInboxResult {
  cancelled_messages?: number;
  /** Identifiant de la boîte supprimée. */
  deleted?: string;
  /** Compte de messagerie supprimé. */
  remote_account_removed?: boolean;
}

/** Rendu par request_inbox_review. */
export interface RequestInboxReviewResult {
  /** true : elle l’était déjà, rien n’a été ajouté. */
  already_requested?: boolean;
  inbox?: Inbox;
  /** true : la reprise de cette boîte est demandée. */
  requested?: boolean;
  /** Date de la demande (ISO 8601). */
  requested_at?: string;
}

export interface DnsRecord {
  /** Le rôle en clair. */
  label?: string;
  /** Nom complet de l’enregistrement. */
  name?: string;
  note?: string | null;
  /** Exigé pour que le domaine soit vérifié (DMARC est seulement conseillé). */
  required?: boolean;
  /** Ce que l’enregistrement prouve ou autorise. */
  role?: "ownership" | "dkim" | "spf" | "mx" | "dmarc";
  /** La valeur vue dans le DNS quand elle diffère. */
  seen?: string | null;
  /** État au dernier contrôle : trouvé, absent, ou valeur différente. */
  state?: "found" | "missing" | "different" | null;
  type?: "TXT" | "MX";
  /** Valeur exacte à publier. */
  value?: string;
}

/** Rendu par add_domain, verify_domain. */
export interface Domain {
  /** Nom de domaine. */
  domain?: string;
  /** Identifiant du domaine (dom_…). */
  id?: string;
  last_checked_at?: string | null;
  records?: DnsRecord[];
  /** pending : DNS à publier ; verified : on peut y créer des boîtes ; suspended : le DNS a disparu, ses boîtes n’envoient plus. */
  status?: "pending" | "verified" | "suspended";
  status_reason?: string | null;
  verified_at?: string | null;
}

/** Rendu par list_domains. */
export interface ListDomainsResult {
  items?: Domain[];
}

/** Rendu par domain_quality. */
export interface DomainQualityResult {
  /** Instant de consultation. */
  collected_at?: string;
  dns?: Record<string, unknown>;
  /** Domaine de cet espace. */
  domain?: string;
  history_excluded?: boolean;
  inboxes?: Record<string, unknown>[];
  inboxes_truncated?: boolean;
  /** Portée des indicateurs. */
  notice?: string;
  period?: Record<string, unknown>;
  protections?: Record<string, unknown>;
  quality?: boolean;
  rates?: Record<string, unknown>;
  scope_limited?: boolean;
  state?: "blocked" | "configuration_required" | "attention" | "no_data" | "limited_data" | "no_alert";
  tests_included?: boolean;
  volume?: Record<string, unknown>;
}

/** Rendu par remove_domain. */
export interface RemoveDomainResult {
  /** Le domaine a été retiré du serveur de messagerie. */
  remote_domain_removed?: boolean;
  /** Le domaine retiré. */
  removed?: string;
}

/** Rendu par update_draft, cancel_message. */
export interface Message {
  /** Pièces jointes (voir get_attachment). */
  attachments?: Record<string, unknown>[];
  /** Réponse automatique (absence…). */
  auto_reply?: boolean;
  /** Copies (sortant) ; autres destinataires (reçu). */
  cc?: string[];
  /** ISO 8601. */
  created_at?: string;
  direction?: "outbound" | "inbound";
  /** Expéditeur. */
  from?: string;
  /** Le message a une version HTML. */
  has_html?: boolean;
  /** Identifiant du message (msg_…). */
  id?: string;
  /** Boîte du message. */
  inbox_id?: string;
  received_at?: string | null;
  /** Adresse de réponse, si elle diffère de la boîte. */
  reply_to?: string | null;
  /** Version du message : change à chaque modification (voir approve_message). */
  revision?: string;
  sent_at?: string | null;
  status?: "draft" | "queued" | "sending" | "sent" | "delivered" | "bounced" | "failed" | "rejected" | "cancelled" | "received";
  /** Code stable d’un refus ou d’un échec. */
  status_code?: string | null;
  /** Sujet. */
  subject?: string;
  /** Texte (lecture d’un message ou d’un fil). */
  text?: string;
  /** Fil du message. */
  thread_id?: string;
  /** Destinataire. */
  to?: string;
}

export interface Thread {
  /** Conversation archivée. */
  archived?: boolean;
  /** Adresse du correspondant. */
  counterpart?: string;
  counterpart_name?: string | null;
  /** Identifiant du fil (thr_…). */
  id?: string;
  /** Boîte du fil. */
  inbox_id?: string;
  labels?: string[];
  last_inbound_at?: string | null;
  /** ISO 8601. */
  last_message_at?: string;
  last_outbound_at?: string | null;
  message_count?: number;
  origin?: "outbound" | "inbound";
  status?: "open" | "replied" | "bounced" | "unsubscribed" | "closed";
  /** Sujet. */
  subject?: string;
  /** Au moins un message reçu depuis la dernière lecture. */
  unread?: boolean;
}

/** Rendu par send_email. */
export interface SendEmailResult {
  /** Départ au plus tôt (estimation : créneau, étalement, quota). */
  estimated_send_at?: string | null;
  inbox?: Inbox;
  message?: Message;
  /** true : même clé d’idempotence et même contenu, rien de nouveau n’a été créé. */
  replayed?: boolean;
  thread?: Thread;
}

/** Rendu par list_threads. */
export interface ListThreadsResult {
  /** Boîtes accessibles : id, address, aliases, status. */
  inboxes?: Record<string, unknown>[];
  items?: Thread[];
  /** À repasser en cursor pour la page suivante ; null à la dernière page. */
  next_cursor?: string | null;
}

/** Rendu par classify_thread. */
export interface ClassifyThreadResult {
  thread?: Thread;
}

/** Rendu par inspect_domain. */
export interface InspectDomainResult {
  current_mx?: Record<string, unknown>[];
  current_spf?: string[];
  /** Domaine contrôlé. */
  domain?: string;
  /** Des MX conduisent à un autre service. */
  receives_elsewhere?: boolean;
  /** Domaine proposé pour Subagent. */
  suggested_domain?: string;
}

export interface Audience {
  /** Audience (aud_…). */
  id?: string;
  /** Nom de l’audience. */
  name?: string;
}

export interface Contact {
  audiences?: Audience[];
  /** Création de la fiche. */
  created_at?: string;
  /** Adresse unique dans l’espace. */
  email?: string;
  fields?: Record<string, unknown>;
  labels?: string[];
  /** Nom du contact. */
  name?: string;
  /** Blocage effectif : kind (adresse/domaine), value, reason, scope (global ou propre à l’espace), source et created_at. Null ne signifie pas consentement commercial. */
  suppression?: Record<string, unknown> | null;
  /** Dernière édition globale. */
  updated_at?: string;
}

/** Rendu par list_contacts. */
export interface ListContactsResult {
  items?: Contact[];
  next_offset?: number | null;
  total?: number;
}

/** Rendu par get_contact. */
export interface GetContactResult {
  contact?: Contact;
}

/** Rendu par list_audiences. */
export interface ListAudiencesResult {
  /** Les audiences de l’espace, 200 au plus. */
  items?: Record<string, unknown>[];
}

/** Rendu par list_campaign_templates. */
export interface ListCampaignTemplatesResult {
  /** Les modèles : id, name, subject, text_body, html_body, source, previous (la version qu’une correction a remplacée), updated_at. */
  templates?: Record<string, unknown>[];
}

/** Rendu par save_campaign_template. */
export interface SaveCampaignTemplateResult {
  /** Le modèle enregistré : id, name, subject, text_body, html_body, previous, updated_at. */
  template?: Record<string, unknown>;
}

/** Rendu par save_audience. */
export interface SaveAudienceResult {
  /** Une audience : id (aud_…), name, source (subagent, ou l’outil d’où elle est reprise), external_id, contacts (leur nombre, dans list_audiences), created_at, updated_at. */
  audience?: Record<string, unknown>;
}

/** Rendu par get_audience. */
export interface GetAudienceResult {
  /** Une audience : id (aud_…), name, source (subagent, ou l’outil d’où elle est reprise), external_id, contacts (leur nombre, dans list_audiences), created_at, updated_at. */
  audience?: Record<string, unknown>;
  /** Les contacts de la page, 200 au plus : email, name, fields, labels, created_at. */
  items?: Record<string, unknown>[];
  /** Le rang de la page suivante (offset), ou null. */
  next_offset?: number | null;
}

/** Rendu par import_contacts. */
export interface ImportContactsResult {
  /** Le nombre de contacts ajoutés ou actualisés. */
  updated?: number;
}

/** Rendu par remove_audience_contact. */
export interface RemoveAudienceContactResult {
  /** Le contact est retiré de l’audience. */
  removed?: boolean;
}

/** Rendu par list_campaigns. */
export interface ListCampaignsResult {
  /** Les campagnes de la page, 100 au plus, les plus récentes d’abord. */
  items?: Record<string, unknown>[];
  /** Le rang de la page suivante (offset), ou null. */
  next_offset?: number | null;
}

/** Rendu par save_campaign. */
export interface SaveCampaignResult {
  /** Une campagne : id (cmp_…), name, status (draft, scheduled, running, paused, completed, stopped), archived, inbox_id, from_address, audience_id, reply_to, steps (de 1 à 4 étapes : delay_days et variants, chacune avec subject, text, html), starts_at, status_reason, source, previous (dans get_campaign : les étapes qu’une correction a remplacées, avec l’auteur et l’heure de la correction), created_at, updated_at. */
  campaign?: Record<string, unknown>;
}

/** Rendu par get_campaign. */
export interface GetCampaignResult {
  /** Une campagne : id (cmp_…), name, status (draft, scheduled, running, paused, completed, stopped), archived, inbox_id, from_address, audience_id, reply_to, steps (de 1 à 4 étapes : delay_days et variants, chacune avec subject, text, html), starts_at, status_reason, source, previous (dans get_campaign : les étapes qu’une correction a remplacées, avec l’auteur et l’heure de la correction), created_at, updated_at. */
  campaign?: Record<string, unknown>;
  /** La première page de l’historique repris, comme campaign_history la rend. */
  history?: Record<string, unknown>;
  /** Les performances, comme campaign_metrics les rend. */
  metrics?: Record<string, unknown>;
}

/** Rendu par preview_campaign. */
export interface PreviewCampaignResult {
  /** Les destinataires bloquants et la raison de chacun (champ vide, blocage, doublon). */
  blocked?: Record<string, unknown>[];
  /** Le nombre de destinataires bloquants. */
  blocked_count?: number;
  /** Une campagne : id (cmp_…), name, status (draft, scheduled, running, paused, completed, stopped), archived, inbox_id, from_address, audience_id, reply_to, steps (de 1 à 4 étapes : delay_days et variants, chacune avec subject, text, html), starts_at, status_reason, source, previous (dans get_campaign : les étapes qu’une correction a remplacées, avec l’auteur et l’heure de la correction), created_at, updated_at. */
  campaign?: Record<string, unknown>;
  /** Les départs différés et leur raison. */
  deferred?: Record<string, unknown>[];
  /** Le nombre de destinataires dont le départ sera différé. */
  deferred_count?: number;
  /** Ce qu’il faut relire avant de lancer. */
  notice?: string;
  /** Un aperçu personnalisé de chaque étape et variante. */
  previews?: Record<string, unknown>[];
  /** Rien ne bloque le lancement. */
  ready?: boolean;
  /** Le nombre de destinataires. */
  recipients?: number;
  /** L’empreinte de ce qui a été relu : à donner à campaign_action pour start. */
  revision?: string;
}

/** Rendu par campaign_metrics. */
export interface CampaignMetricsResult {
  /** Une campagne : id (cmp_…), name, status (draft, scheduled, running, paused, completed, stopped), archived, inbox_id, from_address, audience_id, reply_to, steps (de 1 à 4 étapes : delay_days et variants, chacune avec subject, text, html), starts_at, status_reason, source, previous (dans get_campaign : les étapes qu’une correction a remplacées, avec l’auteur et l’heure de la correction), created_at, updated_at. */
  campaign?: Record<string, unknown>;
  /** live (les envois de Subagent : envoyés, remis, rebonds, réponses, erreurs, en file), history (ouvertures et clics repris, à part), recipients, variants (par étape et variante), note. */
  metrics?: Record<string, unknown>;
}

/** Rendu par campaign_history. */
export interface CampaignHistoryResult {
  /** Les envois repris, 100 au plus : email, status, sent_at, delivery, opened, clicked. */
  items?: Record<string, unknown>[];
  /** Le rang de la page suivante (offset), ou null. */
  next_offset?: number | null;
}

/** Rendu par get_thread. */
export interface GetThreadResult {
  messages?: Message[];
  /** Curseur de la suite du fil, s’il reste des messages. */
  next_cursor?: string | null;
  thread?: Thread;
  /** true : des corps ont été tronqués (200 Ko au plus par appel). */
  truncated?: boolean;
}

/** Rendu par close_thread. */
export interface CloseThreadResult {
  /** true : le fil vient d’être clos ; false : il l’était déjà. */
  closed?: boolean;
  thread?: Thread;
}

/** Rendu par get_message. */
export interface GetMessageResult {
  events?: Record<string, unknown>[];
  message?: Message;
  /** Pour un message en file : reason (pourquoi il n’est pas encore parti) et earliest_send_at (départ au plus tôt, ISO 8601, ou null). null : le message n’est pas en file. */
  waiting?: Record<string, unknown> | null;
}

/** Rendu par list_drafts. */
export interface ListDraftsResult {
  items?: Message[];
  /** La clé qui lit : name, permissions. approve ouvre la validation (approve_message) ; send ou approve, l’annulation (cancel_message). */
  key?: Record<string, unknown>;
  /** À repasser en cursor pour la page suivante ; null à la dernière page. */
  next_cursor?: string | null;
}

/** Rendu par approve_message. */
export interface ApproveMessageResult {
  /** Pièces jointes (voir get_attachment). */
  attachments?: Record<string, unknown>[];
  /** Réponse automatique (absence…). */
  auto_reply?: boolean;
  /** Copies (sortant) ; autres destinataires (reçu). */
  cc?: string[];
  /** ISO 8601. */
  created_at?: string;
  direction?: "outbound" | "inbound";
  /** Départ au plus tôt du message validé (estimation : créneau, étalement, quota). */
  estimated_send_at?: string | null;
  /** Expéditeur. */
  from?: string;
  /** Le message a une version HTML. */
  has_html?: boolean;
  /** Identifiant du message (msg_…). */
  id?: string;
  /** Boîte du message. */
  inbox_id?: string;
  received_at?: string | null;
  /** Adresse de réponse, si elle diffère de la boîte. */
  reply_to?: string | null;
  /** Version du message : change à chaque modification (voir approve_message). */
  revision?: string;
  sent_at?: string | null;
  status?: "draft" | "queued" | "sending" | "sent" | "delivered" | "bounced" | "failed" | "rejected" | "cancelled" | "received";
  /** Code stable d’un refus ou d’un échec. */
  status_code?: string | null;
  /** Sujet. */
  subject?: string;
  /** Texte (lecture d’un message ou d’un fil). */
  text?: string;
  /** Fil du message. */
  thread_id?: string;
  /** Destinataire. */
  to?: string;
}

/** Rendu par attach_files. */
export interface AttachFilesResult {
  /** Pièces déjà jointes. */
  attachments?: Record<string, unknown>[];
  /** Fin de validité (ISO 8601). */
  expires_at?: string;
  /** Octets permis en tout. */
  max_bytes?: number;
  /** Le brouillon. */
  message_id?: string;
  /** Le lien de dépôt. */
  upload_url?: string;
}

/** Rendu par remove_attachment. */
export interface RemoveAttachmentResult {
  /** Pièces qui restent. */
  attachments?: Record<string, unknown>[];
  removed?: Record<string, unknown>;
}

/** Rendu par get_attachment. */
export interface GetAttachmentResult {
  attachment?: Record<string, unknown>;
  /** null : contenu non gardé (stored = false). */
  download_url?: string | null;
  expires_at?: string | null;
  /** Texte d’une petite pièce textuelle. */
  text?: string | null;
  /** Pièce reçue d’un tiers. */
  untrusted?: boolean;
}

/** Rendu par add_suppression. */
export interface AddSuppressionResult {
  cancelled_messages?: number;
  kind?: "address" | "domain";
  /** Entrée nouvelle. */
  new?: boolean;
  /** Ce qui est bloqué. */
  value?: string;
}

/** Rendu par remove_suppression. */
export interface RemoveSuppressionResult {
  /** Ce qui n’est plus bloqué. */
  removed?: string;
}

export interface Suppression {
  /** ISO 8601. */
  created_at?: string;
  /** address ou domain. */
  kind?: string;
  reason?: "unsubscribe" | "hard_bounce" | "complaint" | "manual";
  scope?: "tenant" | "global";
  /** D’où vient l’entrée : qui l’a ajoutée et sa note, ou la voie de la désinscription. null pour une adresse morte commune. */
  source?: string | null;
  /** Adresse ou domaine. */
  value?: string;
}

/** Rendu par list_suppressions. */
export interface ListSuppressionsResult {
  items?: Suppression[];
  /** À repasser en cursor pour la page suivante ; null à la dernière page. */
  next_cursor?: string | null;
}

/** Rendu par get_settings. */
export interface GetSettingsResult {
  /** Après update_settings : les réglages modifiés. */
  changed?: string[];
  /** Jours pendant lesquels une boîte n’écrit pas deux premiers messages au même destinataire. */
  dedup_days?: number;
  /** Ce que le service fixe : daily_max (quota d’une boîte par jour) et warmup_steps (paliers de la montée progressive). */
  limits?: Record<string, unknown>;
  /** Adresse postale écrite en pied des premiers messages. */
  postal_address?: string;
  /** Tout envoi de l’espace attend une validation humaine. */
  require_approval?: boolean;
  /** Le créneau d’envoi : text (en clair), weekdays (plages du lundi au vendredi si elles sont les mêmes, sinon null), saturday, sunday, days (les sept jours, lundi d’abord), skip_holidays, no_send_days. */
  send_window?: Record<string, unknown>;
  /** id, name, verified. */
  space?: Record<string, unknown>;
  /** Minutes au moins entre deux envois d’une boîte. */
  spacing_minutes?: number;
  /** Le webhook de l’espace : url (entière pour l’humain, son hôte seul pour un agent) et set_at. null : aucun. */
  webhook?: Record<string, unknown> | null;
}

export interface Key {
  /** ISO 8601. */
  created_at?: string;
  /** true : c’est l’accès qui appelle. */
  current?: boolean;
  /** Plafond de messages créés par jour, s’il y en a un. */
  daily_cap?: number | null;
  /** Pour un assistant branché : l’adresse de son humain, masquée. */
  human_email?: string | null;
  /** Identifiant de l’accès (key_…), à passer à revoke_key. */
  id?: string;
  /** « all » : toutes les boîtes de l’espace ; sinon la liste des adresses ouvertes à cet accès. */
  inboxes?: unknown;
  /** key : la clé d’un agent ; connection : l’assistant branché d’un humain. */
  kind?: "key" | "connection";
  last_used_at?: string | null;
  /** Nom de l’accès. */
  name?: string;
  permissions?: string[];
  /** Début de la clé, pour la reconnaître. null pour un assistant branché. */
  prefix?: string | null;
}

/** Rendu par list_keys. */
export interface ListKeysResult {
  items?: Key[];
}

/** Rendu par create_key. */
export interface CreateKeyResult {
  /** La clé (sak_…), affichée cette seule fois. */
  api_key?: string;
  key?: Key;
  /** L’adresse MCP où l’agent présente sa clé. */
  mcp_url?: string;
}

/** Rendu par revoke_key. */
export interface RevokeKeyResult {
  kind?: "key" | "connection";
  /** Son nom. */
  name?: string;
  /** Identifiant de l’accès retiré. */
  revoked?: string;
}

/** Rendu par set_webhook. */
export interface SetWebhookResult {
  /** Les événements signalés. */
  events?: string[];
  /** true : une adresse était déjà déclarée, elle est remplacée. */
  replaced?: boolean;
  /** Le secret de signature (whsec_…), affiché cette seule fois. */
  secret?: string;
  /** L’adresse déclarée. */
  url?: string;
}

/** Rendu par remove_webhook. */
export interface RemoveWebhookResult {
  /** L’adresse retirée ; null s’il n’y en avait pas. */
  removed?: string | null;
}

/** Rendu par close_space. */
export interface CloseSpaceResult {
  /** true : une clôture confirmée vient d’être annulée. */
  cancelled?: boolean;
  /** Date de l’effacement (ISO 8601), une fois la clôture confirmée. */
  closes_at?: string | null;
  /** true : un code de clôture vient de partir à l’humain de l’espace. */
  code_sent?: boolean;
  /** Fin de validité du code (ISO 8601). */
  expires_at?: string | null;
  /** L’adresse où le code est parti, masquée. */
  human_email?: string | null;
  /** Ce que la clôture emporte : inboxes, domains, subscription (un prélèvement à arrêter), invoices_kept. */
  removes?: Record<string, unknown>;
  /** true : la clôture est confirmée, l’espace sera effacé à closes_at. */
  scheduled?: boolean;
}

/** navigate_workspace rend le même objet que open_workspace. */
export type NavigateWorkspaceResult = OpenWorkspaceResult;

/** workspace_events rend le même objet que open_workspace. */
export type WorkspaceEventsResult = OpenWorkspaceResult;

/** save_contact rend le même objet que get_contact. */
export type SaveContactResult = GetContactResult;

/** set_contact_audiences rend le même objet que get_contact. */
export type SetContactAudiencesResult = GetContactResult;

/** campaign_action rend le même objet que save_campaign. */
export type CampaignActionResult = SaveCampaignResult;

/** reply_to_thread rend le même objet que send_email. */
export type ReplyToThreadResult = SendEmailResult;

/** update_settings rend le même objet que get_settings. */
export type UpdateSettingsResult = GetSettingsResult;

// ─── Arguments ───────────────────────────────────────────────────────────────────────────────

/** Les arguments de sign_up. */
export interface SignUpParams {
  /** Nom de votre boîte, avant @ : 3 à 32 caractères, minuscules, chiffres, . _ - (par exemple « atelier-durand »). Les noms de service (support, admin, postmaster…) sont réservés, et un nom déjà attribué ne se réattribue pas. */
  username: string;
  /** E-mail de la personne pour qui vous travaillez : elle reçoit le code de vérification. Facultatif : sans lui, la boîte reçoit mais n’envoie pas. */
  human_email?: string;
  /** Votre nom d’agent, tel qu’il s’affichera dans « De : » et dans l’e-mail envoyé à votre humain : lettres, chiffres, espaces, tirets et apostrophes. Facultatif. */
  agent_name?: string;
}

/** Les arguments de verify. */
export interface VerifyParams {
  /** Le code à 6 chiffres reçu par votre humain. */
  otp_code: string;
}

/** Les arguments de attach_human. */
export interface AttachHumanParams {
  /** E-mail de la personne pour qui vous travaillez : elle reçoit le code. */
  human_email: string;
}

/** Les arguments de open_workspace. */
export interface OpenWorkspaceParams {
  /** Rubrique à afficher. jour par défaut. performances avec campaign_id montre les résultats de cette campagne. */
  page?: "jour" | "valider" | "fils" | "campagnes" | "audiences" | "contacts" | "boites" | "domaines" | "blocages" | "espace" | "performances";
  /** Arguments de lecture de la page : query pour chercher un contact, email pour sa fiche, campaign_id, audience_id, thread_id ou message_id pour ouvrir un détail. Aucun envoi. */
  arguments?: Record<string, unknown>;
}

/** Les arguments de navigate_workspace. */
export interface NavigateWorkspaceParams {
  /** Identifiant de l’établi actif, fourni par son contexte. Ne jamais en inventer ni reprendre celui d’une autre conversation. */
  instance_id: string;
  /** Rubrique à afficher. jour par défaut. performances avec campaign_id montre les résultats de cette campagne. */
  page: "jour" | "valider" | "fils" | "campagnes" | "audiences" | "contacts" | "boites" | "domaines" | "blocages" | "espace" | "performances";
  /** Arguments de lecture de la page : query pour chercher un contact, email pour sa fiche, campaign_id, audience_id, thread_id ou message_id pour ouvrir un détail. Aucun envoi. */
  arguments?: Record<string, unknown>;
}

/** Les arguments de workspace_events. */
export interface WorkspaceEventsParams {
  /** Instance de cet établi. */
  instance_id: string;
  after_sequence: number;
  ack_sequence?: number;
  /** Libère cette instance à la fermeture de la vue, sans attendre. */
  close?: boolean;
  /** Barrière de séquence après un geste de navigation local. Invalide les commandes précédentes sans relire la page. */
  local_navigation?: boolean;
}

/** Les arguments de inbox_status. */
export interface InboxStatusParams {
  /** Une boîte précise (inb_…). Absent : toutes les boîtes de la clé. */
  inbox_id?: string;
}

/** Les arguments de workspace_snapshot. */
export interface WorkspaceSnapshotParams {
  /** Révision opaque précédemment reçue, facultative. */
  known_revision?: string;
}

/** Les arguments de activity_report. */
export interface ActivityReportParams {
  /** today : le jour en cours (heure de Paris). week : les sept derniers jours, aujourd’hui compris. */
  period?: "today" | "week";
  /** Une seule boîte (inb_…). Absent : toutes les boîtes de la clé. */
  inbox_id?: string;
}

/** Les arguments de list_events. */
export interface ListEventsParams {
  /** Un jour de Paris, AAAA-MM-JJ. Absent : aujourd’hui, sauf si un objet est donné (alors tout son historique). */
  day?: string;
  /** Une boîte (inb_…). */
  inbox_id?: string;
  /** Un fil (thr_…). */
  thread_id?: string;
  /** Un message (msg_…). */
  message_id?: string;
  /** Une campagne (cmp_…). */
  campaign_id?: string;
  /** Une audience (aud_…). */
  audience_id?: string;
  /** Une adresse : ses fils, sa fiche, ses blocages. */
  contact?: string;
  /** Un domaine : ses vérifications et ses boîtes. */
  domain?: string;
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
  limit?: number;
}

/** Les arguments de subscribe. */
export interface SubscribeParams {
  /** Le forfait à proposer (mail-9 par défaut). Votre humain peut en choisir un autre sur la page. */
  plan?: "mail-9" | "mail-19" | "mail-49";
}

/** Les arguments de list_inboxes. */
export interface ListInboxesParams {
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
  /** Nombre d’éléments rendus (20 par défaut). */
  limit?: number;
}

/** Les arguments de create_inbox. */
export interface CreateInboxParams {
  /** Partie avant @ (minuscules, chiffres, . _ -), par exemple « prospection » ou « marie.durand ». Sur le domaine commun : 3 à 32 caractères, et une adresse déjà attribuée ne se réattribue pas. */
  username: string;
  /** Nom affiché dans « De : », par exemple « Marie de Prescriptio ». */
  display_name: string;
  /** Domaine d’envoi de l’espace. Absent : son premier domaine, le sien d’abord s’il en a un de vérifié (voir inbox_status, tenant.domains). */
  domain?: string;
}

/** Les arguments de update_inbox. */
export interface UpdateInboxParams {
  /** La boîte à renommer (inb_…). */
  inbox_id: string;
  /** Le nouveau nom affiché dans « De : ». */
  display_name: string;
}

/** Les arguments de delete_inbox. */
export interface DeleteInboxParams {
  /** La boîte à supprimer (inb_…). */
  inbox_id: string;
  /** Doit valoir true : la suppression est irréversible. */
  confirm: boolean;
}

/** Les arguments de request_inbox_review. */
export interface RequestInboxReviewParams {
  /** La boîte suspendue (inb_…, voir inbox_status). */
  inbox_id: string;
  /** Ce que votre humain veut dire à l’administrateur, facultatif : une ligne, 300 caractères au plus. */
  note?: string;
}

/** Les arguments de add_domain. */
export interface AddDomainParams {
  /** Le nom de domaine, par exemple exemple.fr ou agents.exemple.fr. */
  domain: string;
}

/** Les arguments de verify_domain. */
export interface VerifyDomainParams {
  /** Le domaine à contrôler (voir list_domains). */
  domain: string;
}

/** Les arguments de domain_quality. */
export interface DomainQualityParams {
  /** Domaine enregistré dans cet espace (list_domains). */
  domain: string;
  /** Période en jours civils de Paris, aujourd’hui inclus. */
  days?: 7 | 30;
}

/** Les arguments de remove_domain. */
export interface RemoveDomainParams {
  /** Le domaine à retirer (voir list_domains). */
  domain: string;
  /** Doit valoir true : le retrait est irréversible. */
  confirm: boolean;
}

/** Les arguments de send_email. */
export interface SendEmailParams {
  /** Boîte d’envoi (inb_…, voir list_inboxes). */
  inbox_id: string;
  /** Adresse du destinataire. */
  to: string;
  /** Sujet (une ligne). */
  subject: string;
  /** Texte brut du message (obligatoire). Écrivez {{unsubscribe_url}} pour placer vous-même le lien de désinscription ; sinon Subagent ajoute une mention en pied, tant que le correspondant n’a pas écrit dans le fil. Aucun autre {{champ}} n’est accepté : remplacez-les avant. */
  text: string;
  /** Nom du destinataire, facultatif. */
  to_name?: string;
  /** Envoi de test, à soi-même seulement (l’e-mail de l’humain de l’espace ou une autre boîte de l’espace) : pas de règle de doublon, et son lien de désinscription ne désinscrit personne. */
  test?: boolean;
  /** Adresse principale ou alias autorisé de la boîte (list_inboxes). */
  from_address?: string;
  /** Version HTML facultative, même contenu que text. */
  html?: string;
  /** Adresse de réponse, si elle diffère de la boîte. */
  reply_to?: string;
  /** Données libres de l’agent (8 000 caractères au plus), rendues telles quelles dans les lectures et les webhooks. */
  metadata?: Record<string, unknown>;
  /** true : le message reste brouillon jusqu’à ce qu’un humain le valide (approve_message). Certains espaces l’imposent toujours. */
  requires_approval?: boolean;
  /** Pas avant cette date (ISO 8601, ou heure de Paris sans fuseau). Le créneau (sauf pour une réponse dans une conversation) et les quotas s’appliquent ensuite. */
  send_after?: string;
  /** Clé unique de cet envoi (1 à 255 caractères). Rejouer la même clé avec le même contenu rend le message déjà créé ; avec un contenu différent, refus explicite. Recommandée pour tout réessai. */
  idempotency_key?: string;
}

/** Les arguments de list_threads. */
export interface ListThreadsParams {
  /** Une seule boîte (inb_…). */
  inbox_id?: string;
  /** Un seul statut. */
  status?: "open" | "replied" | "bounced" | "unsubscribed" | "closed";
  /** true : seulement les fils dont le dernier message est un e-mail reçu auquel rien n’est encore écrit en retour (une réponse, ou un premier e-mail). */
  unanswered?: boolean;
  /** true : archives ; false : conversations non archivées. */
  archived?: boolean;
  /** true : messages reçus non lus ; false : lus. */
  unread?: boolean;
  /** Tag exact. */
  label?: string;
  folder?: "received" | "sent" | "drafts";
  /** Fils actifs depuis cette date. */
  since?: string;
  /** Recherche : une partie de l’adresse du correspondant, de son nom ou du sujet. */
  query?: string;
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
  /** Nombre d’éléments rendus (20 par défaut). */
  limit?: number;
}

/** Les arguments de classify_thread. */
export interface ClassifyThreadParams {
  /** Conversation à classer. */
  thread_id: string;
  labels?: string[];
  /** Archiver ou restaurer. */
  archived?: boolean;
  /** Marquer comme lu ou non lu. */
  read?: boolean;
}

/** Les arguments de inspect_domain. */
export interface InspectDomainParams {
  /** Nom de domaine sans adresse mail ni URL. */
  domain: string;
}

/** Les arguments de list_contacts. */
export interface ListContactsParams {
  /** Recherche dans l’adresse, le nom et les champs. */
  query?: string;
  /** Tag exact. */
  label?: string;
  /** Limiter à une audience de l’espace. */
  audience_id?: string;
  /** subscribed : aucun blocage connu (pas une preuve de consentement). unsubscribed : désinscription. blocked : autre blocage effectif. */
  subscription?: "subscribed" | "unsubscribed" | "blocked";
  offset?: number;
  limit?: number;
}

/** Les arguments de get_contact. */
export interface GetContactParams {
  /** Adresse exacte du contact. */
  email: string;
}

/** Les arguments de save_contact. */
export interface SaveContactParams {
  /** Adresse unique : crée la fiche si elle n’existe pas. */
  email: string;
  /** Nom. Absent : conservé ; vide : effacé. */
  name?: string;
  /** Remplace les champs globaux si fourni ; les champs propres aux audiences restent inchangés. */
  fields?: Record<string, unknown>;
  /** Remplace les tags globaux si fourni. */
  labels?: string[];
}

/** Les arguments de set_contact_audiences. */
export interface SetContactAudiencesParams {
  /** Adresse exacte de la fiche existante. */
  email: string;
  audience_ids: string[];
}

/** Les arguments de save_campaign_template. */
export interface SaveCampaignTemplateParams {
  /** Nom. */
  name: string;
  /** Objet. */
  subject: string;
  /** Texte. */
  text: string;
  /** Identifiant du modèle existant. */
  template_id?: string;
  /** HTML facultatif. */
  html?: string;
}

/** Les arguments de save_audience. */
export interface SaveAudienceParams {
  /** Nom de l’audience. */
  name: string;
  /** Audience à renommer, facultative. */
  audience_id?: string;
}

/** Les arguments de get_audience. */
export interface GetAudienceParams {
  /** Audience. */
  audience_id: string;
  offset?: number;
}

/** Les arguments de import_contacts. */
export interface ImportContactsParams {
  /** Audience de destination. */
  audience_id: string;
  contacts: Record<string, unknown>[];
}

/** Les arguments de remove_audience_contact. */
export interface RemoveAudienceContactParams {
  /** Audience. */
  audience_id: string;
  /** Adresse exacte. */
  email: string;
}

/** Les arguments de list_campaigns. */
export interface ListCampaignsParams {
  offset?: number;
  /** Afficher les archives. */
  archived?: boolean;
}

/** Les arguments de save_campaign. */
export interface SaveCampaignParams {
  /** Nom. */
  name: string;
  /** Boîte expéditrice. */
  inbox_id: string;
  steps: Record<string, unknown>[];
  /** Brouillon à modifier, facultatif. */
  campaign_id?: string;
  /** Adresse principale ou alias de cette boîte. */
  from_address?: string;
  /** Audience. */
  audience_id?: string;
  /** Adresse de réponse facultative. */
  reply_to?: string;
}

/** Les arguments de get_campaign. */
export interface GetCampaignParams {
  /** Campagne. */
  campaign_id: string;
  offset?: number;
}

/** Les arguments de preview_campaign. */
export interface PreviewCampaignParams {
  /** Campagne. */
  campaign_id: string;
  offset?: number;
}

/** Les arguments de campaign_action. */
export interface CampaignActionParams {
  /** Campagne. */
  campaign_id: string;
  action: "start" | "pause" | "resume" | "stop" | "archive" | "restore" | "duplicate";
  /** Premier départ au plus tôt, ensuite le créneau s’applique. */
  starts_at?: string;
  /** Lancement relu et confirmé. */
  confirm?: boolean;
  /** Empreinte rendue par preview_campaign, obligatoire pour start. */
  revision?: string;
}

/** Les arguments de campaign_metrics. */
export interface CampaignMetricsParams {
  /** Campagne. */
  campaign_id: string;
  offset?: number;
}

/** Les arguments de campaign_history. */
export interface CampaignHistoryParams {
  /** Campagne. */
  campaign_id: string;
  offset?: number;
}

/** Les arguments de get_thread. */
export interface GetThreadParams {
  /** Le fil (thr_…). */
  thread_id: string;
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
}

/** Les arguments de reply_to_thread. */
export interface ReplyToThreadParams {
  /** Le fil (thr_…, voir list_threads). */
  thread_id: string;
  /** Texte brut du message (obligatoire). Écrivez {{unsubscribe_url}} pour placer vous-même le lien de désinscription ; sinon Subagent ajoute une mention en pied, tant que le correspondant n’a pas écrit dans le fil. Aucun autre {{champ}} n’est accepté : remplacez-les avant. */
  text: string;
  /** Sujet, facultatif : « Re: » + sujet du fil par défaut. */
  subject?: string;
  /** Adresses en copie : seulement si le correspondant a déjà écrit dans le fil, vers quelqu’un qui y a lui aussi écrit ou une adresse de l’espace. */
  cc?: string[];
  /** Adresse principale ou alias autorisé de la boîte (list_inboxes). */
  from_address?: string;
  /** Version HTML facultative, même contenu que text. */
  html?: string;
  /** Adresse de réponse, si elle diffère de la boîte. */
  reply_to?: string;
  /** Données libres de l’agent (8 000 caractères au plus), rendues telles quelles dans les lectures et les webhooks. */
  metadata?: Record<string, unknown>;
  /** true : le message reste brouillon jusqu’à ce qu’un humain le valide (approve_message). Certains espaces l’imposent toujours. */
  requires_approval?: boolean;
  /** Pas avant cette date (ISO 8601, ou heure de Paris sans fuseau). Le créneau (sauf pour une réponse dans une conversation) et les quotas s’appliquent ensuite. */
  send_after?: string;
  /** Clé unique de cet envoi (1 à 255 caractères). Rejouer la même clé avec le même contenu rend le message déjà créé ; avec un contenu différent, refus explicite. Recommandée pour tout réessai. */
  idempotency_key?: string;
}

/** Les arguments de close_thread. */
export interface CloseThreadParams {
  /** Le fil à clore (thr_…). */
  thread_id: string;
}

/** Les arguments de get_message. */
export interface GetMessageParams {
  /** Le message (msg_…). */
  message_id: string;
}

/** Les arguments de list_drafts. */
export interface ListDraftsParams {
  /** Une seule boîte (inb_…). */
  inbox_id?: string;
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
  /** Nombre d’éléments rendus (20 par défaut). */
  limit?: number;
}

/** Les arguments de update_draft. */
export interface UpdateDraftParams {
  /** Le brouillon (msg_…, voir list_drafts). */
  message_id: string;
  /** Nouveau sujet. */
  subject?: string;
  /** Nouveau texte. */
  text?: string;
  /** Nouveau HTML (texte vide : retire la version HTML). */
  html?: string;
}

/** Les arguments de approve_message. */
export interface ApproveMessageParams {
  /** Le brouillon (msg_…, voir list_drafts). */
  message_id: string;
  /** La version du brouillon tel qu’il a été lu (champ revision de list_drafts). S’il a changé depuis, la validation est refusée (draft_changed). */
  revision?: string;
}

/** Les arguments de cancel_message. */
export interface CancelMessageParams {
  /** Le message (msg_…). */
  message_id: string;
  /** Pourquoi, pour le journal. */
  reason?: string;
}

/** Les arguments de attach_files. */
export interface AttachFilesParams {
  /** Le brouillon (msg_…). */
  message_id: string;
}

/** Les arguments de remove_attachment. */
export interface RemoveAttachmentParams {
  /** La pièce (att_…). */
  attachment_id: string;
}

/** Les arguments de get_attachment. */
export interface GetAttachmentParams {
  /** La pièce (att_…). */
  attachment_id: string;
}

/** Les arguments de add_suppression. */
export interface AddSuppressionParams {
  /** Une adresse (marie@example.com) ou un domaine entier (@example.com). */
  address: string;
  /** Pourquoi, pour le journal. */
  note?: string;
}

/** Les arguments de remove_suppression. */
export interface RemoveSuppressionParams {
  /** Une adresse (marie@example.com) ou un domaine entier (@example.com). */
  address: string;
}

/** Les arguments de list_suppressions. */
export interface ListSuppressionsParams {
  /** Une partie d’adresse ou de domaine ; une adresse complète pour savoir si elle est morte. */
  query?: string;
  /** Curseur de la page suivante : la valeur next_cursor de l’appel précédent. */
  cursor?: string;
  /** Nombre d’éléments rendus (20 par défaut). */
  limit?: number;
}

/** Les arguments de update_settings. */
export interface UpdateSettingsParams {
  /** Nom de l’espace. */
  name?: string;
  /** Adresse postale de l’expéditeur, sur une ligne, écrite en pied des premiers messages. */
  postal_address?: string;
  /** Plages du lundi au vendredi. */
  weekdays?: string;
  /** Plages du samedi, ou closed. */
  saturday?: string;
  /** Plages du dimanche, ou closed. */
  sunday?: string;
  /** true : rien ne part les jours fériés français. */
  skip_holidays?: boolean;
  /** Jours sans envoi (AAAA-MM-JJ) ; la liste remplace la précédente. */
  no_send_days?: string[];
  /** true : tout envoi reste brouillon jusqu’à sa validation. */
  require_approval?: boolean;
  /** Minutes au moins entre deux envois d’une boîte. */
  spacing_minutes?: number;
  /** Jours sans second premier message au même destinataire. */
  dedup_days?: number;
}

/** Les arguments de create_key. */
export interface CreateKeyParams {
  /** Nom de l’agent, par exemple « agent-devis ». */
  name: string;
  /** Absent : send et read. */
  permissions?: ("send" | "read" | "manage_inboxes")[];
  /** Les seules boîtes ouvertes à la clé. Absent : toutes, présentes et à venir. */
  inbox_ids?: string[];
  /** Plafond de messages créés par jour. Absent : aucun. */
  daily_cap?: number;
}

/** Les arguments de revoke_key. */
export interface RevokeKeyParams {
  /** L’accès à retirer (key_…, voir list_keys). */
  key_id: string;
  /** Doit valoir true : la révocation est sans retour. */
  confirm: boolean;
}

/** Les arguments de set_webhook. */
export interface SetWebhookParams {
  /** L’adresse https qui recevra les événements. */
  url: string;
}

/** Les arguments de close_space. */
export interface CloseSpaceParams {
  /** Le code à 6 chiffres que l’humain de l’espace a reçu par e-mail et vous donne. Absent : le code est envoyé, rien n’est confirmé. */
  confirmation_code?: string;
  /** true : annule la clôture confirmée, et tout code en attente. */
  cancel?: boolean;
}

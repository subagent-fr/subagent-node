// Les erreurs du SDK. Généré depuis le registre d'opérations du serveur : ne le modifiez pas.
//
// Deux cas, et deux seulement :
// - SubagentError : le serveur a répondu par un refus. Il porte un `code` stable, un `message`
//   en français et, quand c'est possible, une piste (`hint`) qui dit quoi faire. Un refus n'est
//   pas une panne : la piste se suit, elle ne se contourne pas.
// - SubagentConnectionError : pas de réponse exploitable du serveur (réseau, délai dépassé,
//   mandataire). Rien ne dit si l'appel a abouti.

/** Les codes que le serveur peut rendre, avec leur statut HTTP. */
export const CODES = {
  access_changed: 409,
  address_taken: 409,
  already_verified: 409,
  attachment_limit: 409,
  attachment_refused: 422,
  attachments_not_allowed: 409,
  audience_scope: 403,
  billing_unavailable: 503,
  campaign_changed: 409,
  campaign_not_editable: 409,
  campaign_not_ready: 422,
  campaign_transition: 409,
  cc_not_allowed: 409,
  code_expired: 409,
  code_limit: 429,
  code_not_sent: 502,
  code_too_soon: 429,
  contact_scope: 403,
  dns_unavailable: 503,
  domain_exists: 409,
  domain_in_use: 409,
  domain_limit: 409,
  domain_not_allowed: 422,
  domain_not_verified: 409,
  domain_suspended: 409,
  domain_taken: 409,
  draft_changed: 409,
  duplicate_recipient: 409,
  encryption_unavailable: 503,
  forbidden: 403,
  human_change_limit: 409,
  human_email_not_allowed: 422,
  idempotency_conflict: 409,
  inbox_creation_limit: 429,
  inbox_limit: 409,
  inbox_not_suspended: 409,
  inbox_suspended: 409,
  internal: 500,
  invalid_argument: 400,
  invalid_code: 422,
  invitation_required: 403,
  key_daily_cap: 429,
  key_limit: 409,
  key_name_taken: 409,
  no_human: 409,
  no_pending_code: 409,
  no_sending_domain: 409,
  no_subscription: 409,
  not_cancellable: 409,
  not_draft: 409,
  not_found: 404,
  not_signed_up: 409,
  origin_refused: 403,
  own_access: 409,
  own_domain_required: 422,
  payload_too_large: 413,
  payment_required: 402,
  provisioning_failed: 502,
  public_mail_domain: 422,
  queue_full: 429,
  rate_limited: 429,
  recipient_suppressed: 422,
  reserved_username: 422,
  secret_in_message: 422,
  signup_rate_limited: 429,
  signups_closed: 403,
  space_managed: 409,
  space_rate_limited: 429,
  space_unverified: 403,
  suppression_protected: 409,
  test_recipient_not_allowed: 422,
  thread_busy: 409,
  thread_not_closable: 409,
  too_many_attempts: 429,
  trial_limit: 429,
  unauthorized: 401,
  unknown_operation: 404,
  unresolved_placeholder: 422,
  upload_busy: 503,
  upload_timeout: 408,
  username_taken: 409,
  webhook_too_soon: 429,
  webhooks_unavailable: 503,
  workspace_changing: 409,
} as const;

/** Un code connu de ce SDK. Le serveur peut en ajouter : `SubagentError.code` reste un `string`. */
export type ErrorCode = keyof typeof CODES;

/** Un refus du serveur : `code`, `message`, `hint`, et le statut HTTP (`status`). */
export class SubagentError extends Error {
  readonly status: number;
  readonly code: ErrorCode | (string & {});
  readonly hint: string | undefined;

  constructor(refus: { status: number; code: string; message: string; hint?: string }) {
    super(refus.message);
    this.name = "SubagentError";
    this.status = refus.status;
    this.code = refus.code;
    this.hint = refus.hint;
  }

  /** `code : message Piste : hint` */
  override toString(): string {
    const texte = `${this.code} : ${this.message}`;
    return this.hint ? `${texte} Piste : ${this.hint}` : texte;
  }
}

/** Pas de réponse exploitable du serveur. `status` : le statut HTTP reçu, s'il y en a un. */
export class SubagentConnectionError extends Error {
  readonly status: number | undefined;

  constructor(message: string, options: { status?: number; cause?: unknown } = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.name = "SubagentConnectionError";
    this.status = options.status;
  }
}

// Les types, contrôlés par le compilateur : ce que chaque méthode accepte, rend et refuse.
//
// Généré depuis le registre d'opérations du serveur (clients/generer.py) : ne le modifiez pas.

import {
  Subagent,
  SubagentError,
  type Inbox,
  type SignUpResult,
  type VerifyResult,
  type AttachHumanResult,
  type OpenWorkspaceResult,
  type InboxStatusResult,
  type WorkspaceSnapshotResult,
  type ActivityReportResult,
  type ListEventsResult,
  type BillingStatusResult,
  type SubscribeResult,
  type CancelSubscriptionResult,
  type ListInboxesResult,
  type DeleteInboxResult,
  type RequestInboxReviewResult,
  type DnsRecord,
  type Domain,
  type ListDomainsResult,
  type DomainQualityResult,
  type RemoveDomainResult,
  type Message,
  type Thread,
  type SendEmailResult,
  type ListThreadsResult,
  type ClassifyThreadResult,
  type InspectDomainResult,
  type Audience,
  type Contact,
  type ListContactsResult,
  type GetContactResult,
  type ListAudiencesResult,
  type ListCampaignTemplatesResult,
  type SaveCampaignTemplateResult,
  type SaveAudienceResult,
  type GetAudienceResult,
  type ImportContactsResult,
  type RemoveAudienceContactResult,
  type ListCampaignsResult,
  type SaveCampaignResult,
  type GetCampaignResult,
  type PreviewCampaignResult,
  type CampaignMetricsResult,
  type CampaignHistoryResult,
  type GetThreadResult,
  type CloseThreadResult,
  type GetMessageResult,
  type ListDraftsResult,
  type ApproveMessageResult,
  type AttachFilesResult,
  type RemoveAttachmentResult,
  type GetAttachmentResult,
  type AddSuppressionResult,
  type RemoveSuppressionResult,
  type Suppression,
  type ListSuppressionsResult,
  type GetSettingsResult,
  type Key,
  type ListKeysResult,
  type CreateKeyResult,
  type RevokeKeyResult,
  type SetWebhookResult,
  type RemoveWebhookResult,
  type CloseSpaceResult,
  type NavigateWorkspaceResult,
  type WorkspaceEventsResult,
  type SaveContactResult,
  type SetContactAudiencesResult,
  type CampaignActionResult,
  type ReplyToThreadResult,
  type UpdateSettingsResult,
  type SignUpParams,
  type VerifyParams,
  type AttachHumanParams,
  type OpenWorkspaceParams,
  type NavigateWorkspaceParams,
  type WorkspaceEventsParams,
  type InboxStatusParams,
  type WorkspaceSnapshotParams,
  type ActivityReportParams,
  type ListEventsParams,
  type SubscribeParams,
  type ListInboxesParams,
  type CreateInboxParams,
  type UpdateInboxParams,
  type DeleteInboxParams,
  type RequestInboxReviewParams,
  type AddDomainParams,
  type VerifyDomainParams,
  type DomainQualityParams,
  type RemoveDomainParams,
  type SendEmailParams,
  type ListThreadsParams,
  type ClassifyThreadParams,
  type InspectDomainParams,
  type ListContactsParams,
  type GetContactParams,
  type SaveContactParams,
  type SetContactAudiencesParams,
  type SaveCampaignTemplateParams,
  type SaveAudienceParams,
  type GetAudienceParams,
  type ImportContactsParams,
  type RemoveAudienceContactParams,
  type ListCampaignsParams,
  type SaveCampaignParams,
  type GetCampaignParams,
  type PreviewCampaignParams,
  type CampaignActionParams,
  type CampaignMetricsParams,
  type CampaignHistoryParams,
  type GetThreadParams,
  type ReplyToThreadParams,
  type CloseThreadParams,
  type GetMessageParams,
  type ListDraftsParams,
  type UpdateDraftParams,
  type ApproveMessageParams,
  type CancelMessageParams,
  type AttachFilesParams,
  type RemoveAttachmentParams,
  type GetAttachmentParams,
  type AddSuppressionParams,
  type RemoveSuppressionParams,
  type ListSuppressionsParams,
  type UpdateSettingsParams,
  type CreateKeyParams,
  type RevokeKeyParams,
  type SetWebhookParams,
  type CloseSpaceParams,
} from "../src/index.js";

const client = new Subagent({ apiKey: "sak_…" });

/** Jamais exécuté : ce fichier n'est que compilé (`npm run typecheck`). */
export async function chaqueMethode(): Promise<void> {
  const r0: SignUpResult = await client.signUp({
    username: "atelier-exemple",
    human_email: "marie@exemple.fr",
    agent_name: "Atelier Exemple",
  });
  void r0;
  const r1: VerifyResult = await client.verify({
    otp_code: "482913",
  });
  void r1;
  const r2: AttachHumanResult = await client.attachHuman({
    human_email: "marie@exemple.fr",
  });
  void r2;
  const r3: OpenWorkspaceResult = await client.openWorkspace({
    page: "audiences",
    arguments: {},
  });
  void r3;
  const r4: NavigateWorkspaceResult = await client.navigateWorkspace({
    instance_id: "8abf26e0-f58a-4a49-8cb2-90858b2df812",
    page: "audiences",
    arguments: {},
  });
  void r4;
  const r5: WorkspaceEventsResult = await client.workspaceEvents({
    instance_id: "8abf26e0-f58a-4a49-8cb2-90858b2df812",
    after_sequence: 0,
    ack_sequence: 0,
    close: false,
    local_navigation: false,
  });
  void r5;
  const r6: InboxStatusResult = await client.inboxStatus({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
  });
  void r6;
  const r7: WorkspaceSnapshotResult = await client.workspaceSnapshot({
    known_revision: "r-2026-10-14-1",
  });
  void r7;
  const r8: ActivityReportResult = await client.activityReport({
    period: "week",
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
  });
  void r8;
  const r9: ListEventsResult = await client.listEvents({
    day: "2026-10-14",
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    contact: "nadia.morel@exemple.com",
    domain: "agents.exemple.fr",
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
    limit: 20,
  });
  void r9;
  const r10: BillingStatusResult = await client.billingStatus();
  void r10;
  const r11: SubscribeResult = await client.subscribe({
    plan: "mail-19",
  });
  void r11;
  const r12: CancelSubscriptionResult = await client.cancelSubscription();
  void r12;
  const r13: ListInboxesResult = await client.listInboxes({
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
    limit: 20,
  });
  void r13;
  const r14: Inbox = await client.createInbox({
    username: "atelier-exemple",
    display_name: "Marie d’Atelier Exemple",
    domain: "agents.exemple.fr",
  });
  void r14;
  const r15: Inbox = await client.updateInbox({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    display_name: "Marie d’Atelier Exemple",
  });
  void r15;
  const r16: DeleteInboxResult = await client.deleteInbox({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    confirm: true,
  });
  void r16;
  const r17: RequestInboxReviewResult = await client.requestInboxReview({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    note: "A demandé à ne plus être contactée.",
  });
  void r17;
  const r18: Domain = await client.addDomain({
    domain: "agents.exemple.fr",
  });
  void r18;
  const r19: Domain = await client.verifyDomain({
    domain: "agents.exemple.fr",
  });
  void r19;
  const r20: ListDomainsResult = await client.listDomains();
  void r20;
  const r21: DomainQualityResult = await client.domainQuality({
    domain: "agents.exemple.fr",
    days: 30,
  });
  void r21;
  const r22: RemoveDomainResult = await client.removeDomain({
    domain: "agents.exemple.fr",
    confirm: true,
  });
  void r22;
  const r23: SendEmailResult = await client.sendEmail({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    to: "nadia.morel@exemple.com",
    subject: "Rendez-vous de jeudi",
    text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
    to_name: "Nadia Morel",
    test: false,
    from_address: "marie@exemple.fr",
    html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
    reply_to: "marie@exemple.fr",
    metadata: {"dossier": "rdv-jeudi"},
    requires_approval: true,
    send_after: "2026-10-13T09:00:00+02:00",
    idempotency_key: "rdv-jeudi-nadia-morel",
  });
  void r23;
  const r24: ListThreadsResult = await client.listThreads({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    status: "replied",
    unanswered: true,
    archived: false,
    unread: true,
    label: "devis",
    folder: "received",
    since: "2026-10-12T00:00:00+02:00",
    query: "exemple.com",
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
    limit: 20,
  });
  void r24;
  const r25: ClassifyThreadResult = await client.classifyThread({
    thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
    labels: ["devis"],
    archived: false,
    read: true,
  });
  void r25;
  const r26: InspectDomainResult = await client.inspectDomain({
    domain: "agents.exemple.fr",
  });
  void r26;
  const r27: ListContactsResult = await client.listContacts({
    query: "exemple.com",
    label: "devis",
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    subscription: "subscribed",
    offset: 0,
    limit: 20,
  });
  void r27;
  const r28: GetContactResult = await client.getContact({
    email: "nadia.morel@exemple.com",
  });
  void r28;
  const r29: SaveContactResult = await client.saveContact({
    email: "nadia.morel@exemple.com",
    name: "Atelier Exemple",
    fields: {"prenom": "Nadia", "societe": "Atelier Morel"},
    labels: ["devis"],
  });
  void r29;
  const r30: SetContactAudiencesResult = await client.setContactAudiences({
    email: "nadia.morel@exemple.com",
    audience_ids: ["aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26"],
  });
  void r30;
  const r31: ListAudiencesResult = await client.listAudiences();
  void r31;
  const r32: ListCampaignTemplatesResult = await client.listCampaignTemplates();
  void r32;
  const r33: SaveCampaignTemplateResult = await client.saveCampaignTemplate({
    name: "Atelier Exemple",
    subject: "Rendez-vous de jeudi",
    text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
    template_id: "5d1c8e2a-7b3f-4e9a-b0c6-2f4d8a1e9c37",
    html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
  });
  void r33;
  const r34: SaveAudienceResult = await client.saveAudience({
    name: "Atelier Exemple",
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
  });
  void r34;
  const r35: GetAudienceResult = await client.getAudience({
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    offset: 0,
  });
  void r35;
  const r36: ImportContactsResult = await client.importContacts({
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    contacts: [{"email": "marc.lefevre@exemple.com", "name": "Marc Lefèvre", "fields": {"prenom": "Marc"}}],
  });
  void r36;
  const r37: RemoveAudienceContactResult = await client.removeAudienceContact({
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    email: "nadia.morel@exemple.com",
  });
  void r37;
  const r38: ListCampaignsResult = await client.listCampaigns({
    offset: 0,
    archived: false,
  });
  void r38;
  const r39: SaveCampaignResult = await client.saveCampaign({
    name: "Atelier Exemple",
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    steps: [{"variants": [{"subject": "Vos chantiers de la rentrée", "text": "Bonjour {{prenom}},\n\nUn mot sur vos chantiers.\n\n{{unsubscribe_url}}"}]}],
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    from_address: "marie@exemple.fr",
    audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
    reply_to: "marie@exemple.fr",
  });
  void r39;
  const r40: GetCampaignResult = await client.getCampaign({
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    offset: 0,
  });
  void r40;
  const r41: PreviewCampaignResult = await client.previewCampaign({
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    offset: 0,
  });
  void r41;
  const r42: CampaignActionResult = await client.campaignAction({
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    action: "pause",
    starts_at: "2026-10-20T09:00:00+02:00",
    confirm: true,
    revision: "5d41402abc4b2a76",
  });
  void r42;
  const r43: CampaignMetricsResult = await client.campaignMetrics({
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    offset: 0,
  });
  void r43;
  const r44: CampaignHistoryResult = await client.campaignHistory({
    campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
    offset: 0,
  });
  void r44;
  const r45: GetThreadResult = await client.getThread({
    thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
  });
  void r45;
  const r46: ReplyToThreadResult = await client.replyToThread({
    thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
    text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
    subject: "Rendez-vous de jeudi",
    cc: ["bureau.etudes@exemple.com"],
    from_address: "marie@exemple.fr",
    html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
    reply_to: "marie@exemple.fr",
    metadata: {"dossier": "rdv-jeudi"},
    requires_approval: true,
    send_after: "2026-10-13T09:00:00+02:00",
    idempotency_key: "rdv-jeudi-nadia-morel",
  });
  void r46;
  const r47: CloseThreadResult = await client.closeThread({
    thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
  });
  void r47;
  const r48: GetMessageResult = await client.getMessage({
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
  });
  void r48;
  const r49: ListDraftsResult = await client.listDrafts({
    inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
    limit: 20,
  });
  void r49;
  const r50: Message = await client.updateDraft({
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
    subject: "Rendez-vous de jeudi",
    text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
    html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
  });
  void r50;
  const r51: ApproveMessageResult = await client.approveMessage({
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
    revision: "5d41402abc4b2a76",
  });
  void r51;
  const r52: Message = await client.cancelMessage({
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
    reason: "Rendez-vous annulé.",
  });
  void r52;
  const r53: AttachFilesResult = await client.attachFiles({
    message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
  });
  void r53;
  const r54: RemoveAttachmentResult = await client.removeAttachment({
    attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
  });
  void r54;
  const r55: GetAttachmentResult = await client.getAttachment({
    attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
  });
  void r55;
  const r56: AddSuppressionResult = await client.addSuppression({
    address: "nadia.morel@exemple.com",
    note: "A demandé à ne plus être contactée.",
  });
  void r56;
  const r57: RemoveSuppressionResult = await client.removeSuppression({
    address: "nadia.morel@exemple.com",
  });
  void r57;
  const r58: ListSuppressionsResult = await client.listSuppressions({
    query: "exemple.com",
    cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
    limit: 20,
  });
  void r58;
  const r59: GetSettingsResult = await client.getSettings();
  void r59;
  const r60: UpdateSettingsResult = await client.updateSettings({
    name: "Atelier Exemple",
    postal_address: "12 rue des Lilas, 69007 Lyon",
    weekdays: "8-12,14-18",
    saturday: "9-12",
    sunday: "closed",
    skip_holidays: true,
    no_send_days: ["2026-12-24"],
    require_approval: true,
    spacing_minutes: 20,
    dedup_days: 60,
  });
  void r60;
  const r61: ListKeysResult = await client.listKeys();
  void r61;
  const r62: CreateKeyResult = await client.createKey({
    name: "Atelier Exemple",
    permissions: ["send", "read"],
    inbox_ids: ["inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95"],
    daily_cap: 50,
  });
  void r62;
  const r63: RevokeKeyResult = await client.revokeKey({
    key_id: "key_5a0d8e3c9b714f26a1e47c08b3d95f62",
    confirm: true,
  });
  void r63;
  const r64: SetWebhookResult = await client.setWebhook({
    url: "https://exemple.fr/hooks/subagent",
  });
  void r64;
  const r65: RemoveWebhookResult = await client.removeWebhook();
  void r65;
  const r66: CloseSpaceResult = await client.closeSpace({
    confirmation_code: "482913",
    cancel: false,
  });
  void r66;
}

export async function ceQueLeCompilateurRefuse(): Promise<void> {
  // @ts-expect-error : username est obligatoire
  await client.signUp({});
  // @ts-expect-error : paramètre inconnu de sign_up
  await client.signUp({ username: "atelier-exemple", parametre_inconnu: true });
  // @ts-expect-error : otp_code est obligatoire
  await client.verify({});
  // @ts-expect-error : paramètre inconnu de verify
  await client.verify({ otp_code: "482913", parametre_inconnu: true });
  // @ts-expect-error : human_email est obligatoire
  await client.attachHuman({});
  // @ts-expect-error : paramètre inconnu de attach_human
  await client.attachHuman({ human_email: "marie@exemple.fr", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de open_workspace
  await client.openWorkspace({ parametre_inconnu: true });
  // @ts-expect-error : page n’accepte que jour, valider, fils, campagnes, audiences, contacts, boites, domaines, blocages, espace, performances
  await client.openWorkspace({ page: "valeur_inconnue" });
  // @ts-expect-error : instance_id est obligatoire
  await client.navigateWorkspace({});
  // @ts-expect-error : paramètre inconnu de navigate_workspace
  await client.navigateWorkspace({ instance_id: "8abf26e0-f58a-4a49-8cb2-90858b2df812", page: "audiences", parametre_inconnu: true });
  // @ts-expect-error : page n’accepte que jour, valider, fils, campagnes, audiences, contacts, boites, domaines, blocages, espace, performances
  await client.navigateWorkspace({ instance_id: "8abf26e0-f58a-4a49-8cb2-90858b2df812", page: "valeur_inconnue" });
  // @ts-expect-error : instance_id est obligatoire
  await client.workspaceEvents({});
  // @ts-expect-error : paramètre inconnu de workspace_events
  await client.workspaceEvents({ instance_id: "8abf26e0-f58a-4a49-8cb2-90858b2df812", after_sequence: 0, parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de inbox_status
  await client.inboxStatus({ parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de workspace_snapshot
  await client.workspaceSnapshot({ parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de activity_report
  await client.activityReport({ parametre_inconnu: true });
  // @ts-expect-error : period n’accepte que today, week
  await client.activityReport({ period: "valeur_inconnue" });
  // @ts-expect-error : paramètre inconnu de list_events
  await client.listEvents({ parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de subscribe
  await client.subscribe({ parametre_inconnu: true });
  // @ts-expect-error : plan n’accepte que mail-9, mail-19, mail-49
  await client.subscribe({ plan: "valeur_inconnue" });
  // @ts-expect-error : paramètre inconnu de list_inboxes
  await client.listInboxes({ parametre_inconnu: true });
  // @ts-expect-error : username est obligatoire
  await client.createInbox({});
  // @ts-expect-error : paramètre inconnu de create_inbox
  await client.createInbox({ username: "atelier-exemple", display_name: "Marie d’Atelier Exemple", parametre_inconnu: true });
  // @ts-expect-error : inbox_id est obligatoire
  await client.updateInbox({});
  // @ts-expect-error : paramètre inconnu de update_inbox
  await client.updateInbox({ inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95", display_name: "Marie d’Atelier Exemple", parametre_inconnu: true });
  // @ts-expect-error : inbox_id est obligatoire
  await client.deleteInbox({});
  // @ts-expect-error : paramètre inconnu de delete_inbox
  await client.deleteInbox({ inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95", confirm: true, parametre_inconnu: true });
  // @ts-expect-error : inbox_id est obligatoire
  await client.requestInboxReview({});
  // @ts-expect-error : paramètre inconnu de request_inbox_review
  await client.requestInboxReview({ inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95", parametre_inconnu: true });
  // @ts-expect-error : domain est obligatoire
  await client.addDomain({});
  // @ts-expect-error : paramètre inconnu de add_domain
  await client.addDomain({ domain: "agents.exemple.fr", parametre_inconnu: true });
  // @ts-expect-error : domain est obligatoire
  await client.verifyDomain({});
  // @ts-expect-error : paramètre inconnu de verify_domain
  await client.verifyDomain({ domain: "agents.exemple.fr", parametre_inconnu: true });
  // @ts-expect-error : domain est obligatoire
  await client.domainQuality({});
  // @ts-expect-error : paramètre inconnu de domain_quality
  await client.domainQuality({ domain: "agents.exemple.fr", parametre_inconnu: true });
  // @ts-expect-error : days n’accepte que 7, 30
  await client.domainQuality({ domain: "agents.exemple.fr", days: "valeur_inconnue" });
  // @ts-expect-error : domain est obligatoire
  await client.removeDomain({});
  // @ts-expect-error : paramètre inconnu de remove_domain
  await client.removeDomain({ domain: "agents.exemple.fr", confirm: true, parametre_inconnu: true });
  // @ts-expect-error : inbox_id est obligatoire
  await client.sendEmail({});
  // @ts-expect-error : paramètre inconnu de send_email
  await client.sendEmail({ inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95", to: "nadia.morel@exemple.com", subject: "Rendez-vous de jeudi", text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de list_threads
  await client.listThreads({ parametre_inconnu: true });
  // @ts-expect-error : status n’accepte que open, replied, bounced, unsubscribed, closed
  await client.listThreads({ status: "valeur_inconnue" });
  // @ts-expect-error : folder n’accepte que received, sent, drafts
  await client.listThreads({ folder: "valeur_inconnue" });
  // @ts-expect-error : thread_id est obligatoire
  await client.classifyThread({});
  // @ts-expect-error : paramètre inconnu de classify_thread
  await client.classifyThread({ thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814", parametre_inconnu: true });
  // @ts-expect-error : domain est obligatoire
  await client.inspectDomain({});
  // @ts-expect-error : paramètre inconnu de inspect_domain
  await client.inspectDomain({ domain: "agents.exemple.fr", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de list_contacts
  await client.listContacts({ parametre_inconnu: true });
  // @ts-expect-error : subscription n’accepte que subscribed, unsubscribed, blocked
  await client.listContacts({ subscription: "valeur_inconnue" });
  // @ts-expect-error : email est obligatoire
  await client.getContact({});
  // @ts-expect-error : paramètre inconnu de get_contact
  await client.getContact({ email: "nadia.morel@exemple.com", parametre_inconnu: true });
  // @ts-expect-error : email est obligatoire
  await client.saveContact({});
  // @ts-expect-error : paramètre inconnu de save_contact
  await client.saveContact({ email: "nadia.morel@exemple.com", parametre_inconnu: true });
  // @ts-expect-error : email est obligatoire
  await client.setContactAudiences({});
  // @ts-expect-error : paramètre inconnu de set_contact_audiences
  await client.setContactAudiences({ email: "nadia.morel@exemple.com", audience_ids: ["aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26"], parametre_inconnu: true });
  // @ts-expect-error : name est obligatoire
  await client.saveCampaignTemplate({});
  // @ts-expect-error : paramètre inconnu de save_campaign_template
  await client.saveCampaignTemplate({ name: "Atelier Exemple", subject: "Rendez-vous de jeudi", text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie", parametre_inconnu: true });
  // @ts-expect-error : name est obligatoire
  await client.saveAudience({});
  // @ts-expect-error : paramètre inconnu de save_audience
  await client.saveAudience({ name: "Atelier Exemple", parametre_inconnu: true });
  // @ts-expect-error : audience_id est obligatoire
  await client.getAudience({});
  // @ts-expect-error : paramètre inconnu de get_audience
  await client.getAudience({ audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26", parametre_inconnu: true });
  // @ts-expect-error : audience_id est obligatoire
  await client.importContacts({});
  // @ts-expect-error : paramètre inconnu de import_contacts
  await client.importContacts({ audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26", contacts: [{"email": "marc.lefevre@exemple.com", "name": "Marc Lefèvre", "fields": {"prenom": "Marc"}}], parametre_inconnu: true });
  // @ts-expect-error : audience_id est obligatoire
  await client.removeAudienceContact({});
  // @ts-expect-error : paramètre inconnu de remove_audience_contact
  await client.removeAudienceContact({ audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26", email: "nadia.morel@exemple.com", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de list_campaigns
  await client.listCampaigns({ parametre_inconnu: true });
  // @ts-expect-error : name est obligatoire
  await client.saveCampaign({});
  // @ts-expect-error : paramètre inconnu de save_campaign
  await client.saveCampaign({ name: "Atelier Exemple", inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95", steps: [{"variants": [{"subject": "Vos chantiers de la rentrée", "text": "Bonjour {{prenom}},\n\nUn mot sur vos chantiers.\n\n{{unsubscribe_url}}"}]}], parametre_inconnu: true });
  // @ts-expect-error : campaign_id est obligatoire
  await client.getCampaign({});
  // @ts-expect-error : paramètre inconnu de get_campaign
  await client.getCampaign({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", parametre_inconnu: true });
  // @ts-expect-error : campaign_id est obligatoire
  await client.previewCampaign({});
  // @ts-expect-error : paramètre inconnu de preview_campaign
  await client.previewCampaign({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", parametre_inconnu: true });
  // @ts-expect-error : campaign_id est obligatoire
  await client.campaignAction({});
  // @ts-expect-error : paramètre inconnu de campaign_action
  await client.campaignAction({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", action: "pause", parametre_inconnu: true });
  // @ts-expect-error : action n’accepte que start, pause, resume, stop, archive, restore, duplicate
  await client.campaignAction({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", action: "valeur_inconnue" });
  // @ts-expect-error : campaign_id est obligatoire
  await client.campaignMetrics({});
  // @ts-expect-error : paramètre inconnu de campaign_metrics
  await client.campaignMetrics({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", parametre_inconnu: true });
  // @ts-expect-error : campaign_id est obligatoire
  await client.campaignHistory({});
  // @ts-expect-error : paramètre inconnu de campaign_history
  await client.campaignHistory({ campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3", parametre_inconnu: true });
  // @ts-expect-error : thread_id est obligatoire
  await client.getThread({});
  // @ts-expect-error : paramètre inconnu de get_thread
  await client.getThread({ thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814", parametre_inconnu: true });
  // @ts-expect-error : thread_id est obligatoire
  await client.replyToThread({});
  // @ts-expect-error : paramètre inconnu de reply_to_thread
  await client.replyToThread({ thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814", text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie", parametre_inconnu: true });
  // @ts-expect-error : thread_id est obligatoire
  await client.closeThread({});
  // @ts-expect-error : paramètre inconnu de close_thread
  await client.closeThread({ thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814", parametre_inconnu: true });
  // @ts-expect-error : message_id est obligatoire
  await client.getMessage({});
  // @ts-expect-error : paramètre inconnu de get_message
  await client.getMessage({ message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de list_drafts
  await client.listDrafts({ parametre_inconnu: true });
  // @ts-expect-error : message_id est obligatoire
  await client.updateDraft({});
  // @ts-expect-error : paramètre inconnu de update_draft
  await client.updateDraft({ message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48", parametre_inconnu: true });
  // @ts-expect-error : message_id est obligatoire
  await client.approveMessage({});
  // @ts-expect-error : paramètre inconnu de approve_message
  await client.approveMessage({ message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48", parametre_inconnu: true });
  // @ts-expect-error : message_id est obligatoire
  await client.cancelMessage({});
  // @ts-expect-error : paramètre inconnu de cancel_message
  await client.cancelMessage({ message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48", parametre_inconnu: true });
  // @ts-expect-error : message_id est obligatoire
  await client.attachFiles({});
  // @ts-expect-error : paramètre inconnu de attach_files
  await client.attachFiles({ message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48", parametre_inconnu: true });
  // @ts-expect-error : attachment_id est obligatoire
  await client.removeAttachment({});
  // @ts-expect-error : paramètre inconnu de remove_attachment
  await client.removeAttachment({ attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35", parametre_inconnu: true });
  // @ts-expect-error : attachment_id est obligatoire
  await client.getAttachment({});
  // @ts-expect-error : paramètre inconnu de get_attachment
  await client.getAttachment({ attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35", parametre_inconnu: true });
  // @ts-expect-error : address est obligatoire
  await client.addSuppression({});
  // @ts-expect-error : paramètre inconnu de add_suppression
  await client.addSuppression({ address: "nadia.morel@exemple.com", parametre_inconnu: true });
  // @ts-expect-error : address est obligatoire
  await client.removeSuppression({});
  // @ts-expect-error : paramètre inconnu de remove_suppression
  await client.removeSuppression({ address: "nadia.morel@exemple.com", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de list_suppressions
  await client.listSuppressions({ parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de update_settings
  await client.updateSettings({ parametre_inconnu: true });
  // @ts-expect-error : name est obligatoire
  await client.createKey({});
  // @ts-expect-error : paramètre inconnu de create_key
  await client.createKey({ name: "Atelier Exemple", parametre_inconnu: true });
  // @ts-expect-error : key_id est obligatoire
  await client.revokeKey({});
  // @ts-expect-error : paramètre inconnu de revoke_key
  await client.revokeKey({ key_id: "key_5a0d8e3c9b714f26a1e47c08b3d95f62", confirm: true, parametre_inconnu: true });
  // @ts-expect-error : url est obligatoire
  await client.setWebhook({});
  // @ts-expect-error : paramètre inconnu de set_webhook
  await client.setWebhook({ url: "https://exemple.fr/hooks/subagent", parametre_inconnu: true });
  // @ts-expect-error : paramètre inconnu de close_space
  await client.closeSpace({ parametre_inconnu: true });
}

export function unRefusEstType(erreur: unknown): string | undefined {
  if (erreur instanceof SubagentError) {
    const statut: number = erreur.status;
    const code: string = erreur.code;
    return `${statut} ${code} ${erreur.message} ${erreur.hint ?? ""}`;
  }
  return undefined;
}

export function unChampRenduEstFacultatif(boite: Inbox): string {
  // @ts-expect-error : `id` peut manquer, le serveur ne déclare aucun champ de sortie obligatoire
  const id: string = boite.id;
  return id;
}

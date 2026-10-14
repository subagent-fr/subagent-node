// Chaque opération du registre, appelée par sa méthode, contre le faux serveur.
//
// Généré depuis le registre d'opérations du serveur (clients/generer.py) : ne le modifiez pas.

import assert from "node:assert/strict";
import { after, before, describe, test } from "node:test";

import { Subagent } from "../dist/index.js";
import { CLE_HUMAIN, FauxServeur, OPERATIONS } from "./faux-serveur.mjs";

describe("chaque opération du registre (64)", () => {
  let serveur;
  let client;
  before(async () => {
    serveur = await new FauxServeur().demarrer();
    client = new Subagent({ apiKey: CLE_HUMAIN, baseUrl: serveur.url });
  });
  after(() => serveur.arreter());

  /** `minimal` : l'appel avec les seuls arguments obligatoires ; `complet` : avec tous. */
  async function controler(nom, minimal, complet) {
    const operation = OPERATIONS[nom];
    // Arguments obligatoires seuls : le résultat est l'exemple de l'opération, tel quel.
    serveur.verifie = operation.espace !== "non vérifié";
    let resultat = await minimal();
    assert.equal(serveur.derniere.operation, nom);
    assert.deepEqual(serveur.derniere.arguments, operation.obligatoires);
    assert.deepEqual(resultat, operation.exemple);
    // Tous les arguments : chacun arrive au serveur sous son nom, avec sa valeur.
    serveur.verifie = operation.espace !== "non vérifié";
    resultat = await complet();
    assert.deepEqual(serveur.derniere.arguments, operation.arguments);
    assert.deepEqual(Object.keys(resultat).sort(), Object.keys(operation.exemple).sort());
    assert.equal(serveur.derniere.entetes["idempotency-key"], operation.arguments.idempotency_key);
  }

  test("sign_up", () =>
    controler(
      "sign_up",
      () => client.signUp({
          username: "atelier-exemple",
        }),
      () => client.signUp({
          username: "atelier-exemple",
          human_email: "marie@exemple.fr",
          agent_name: "Atelier Exemple",
        }),
    ));

  test("verify", () =>
    controler(
      "verify",
      () => client.verify({
          otp_code: "482913",
        }),
      () => client.verify({
          otp_code: "482913",
        }),
    ));

  test("attach_human", () =>
    controler(
      "attach_human",
      () => client.attachHuman({
          human_email: "marie@exemple.fr",
        }),
      () => client.attachHuman({
          human_email: "marie@exemple.fr",
        }),
    ));

  test("inbox_status", () =>
    controler(
      "inbox_status",
      () => client.inboxStatus({}),
      () => client.inboxStatus({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
        }),
    ));

  test("workspace_snapshot", () =>
    controler(
      "workspace_snapshot",
      () => client.workspaceSnapshot({}),
      () => client.workspaceSnapshot({
          known_revision: "r-2026-10-14-1",
        }),
    ));

  test("activity_report", () =>
    controler(
      "activity_report",
      () => client.activityReport({}),
      () => client.activityReport({
          period: "week",
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
        }),
    ));

  test("list_events", () =>
    controler(
      "list_events",
      () => client.listEvents({}),
      () => client.listEvents({
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
        }),
    ));

  test("billing_status", () =>
    controler(
      "billing_status",
      () => client.billingStatus(),
      () => client.billingStatus(),
    ));

  test("subscribe", () =>
    controler(
      "subscribe",
      () => client.subscribe({}),
      () => client.subscribe({
          plan: "mail-19",
        }),
    ));

  test("cancel_subscription", () =>
    controler(
      "cancel_subscription",
      () => client.cancelSubscription(),
      () => client.cancelSubscription(),
    ));

  test("list_inboxes", () =>
    controler(
      "list_inboxes",
      () => client.listInboxes({}),
      () => client.listInboxes({
          cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
          limit: 20,
        }),
    ));

  test("create_inbox", () =>
    controler(
      "create_inbox",
      () => client.createInbox({
          username: "atelier-exemple",
          display_name: "Marie d’Atelier Exemple",
        }),
      () => client.createInbox({
          username: "atelier-exemple",
          display_name: "Marie d’Atelier Exemple",
          domain: "agents.exemple.fr",
        }),
    ));

  test("update_inbox", () =>
    controler(
      "update_inbox",
      () => client.updateInbox({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          display_name: "Marie d’Atelier Exemple",
        }),
      () => client.updateInbox({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          display_name: "Marie d’Atelier Exemple",
        }),
    ));

  test("delete_inbox", () =>
    controler(
      "delete_inbox",
      () => client.deleteInbox({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          confirm: true,
        }),
      () => client.deleteInbox({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          confirm: true,
        }),
    ));

  test("request_inbox_review", () =>
    controler(
      "request_inbox_review",
      () => client.requestInboxReview({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
        }),
      () => client.requestInboxReview({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          note: "A demandé à ne plus être contactée.",
        }),
    ));

  test("add_domain", () =>
    controler(
      "add_domain",
      () => client.addDomain({
          domain: "agents.exemple.fr",
        }),
      () => client.addDomain({
          domain: "agents.exemple.fr",
        }),
    ));

  test("verify_domain", () =>
    controler(
      "verify_domain",
      () => client.verifyDomain({
          domain: "agents.exemple.fr",
        }),
      () => client.verifyDomain({
          domain: "agents.exemple.fr",
        }),
    ));

  test("list_domains", () =>
    controler(
      "list_domains",
      () => client.listDomains(),
      () => client.listDomains(),
    ));

  test("domain_quality", () =>
    controler(
      "domain_quality",
      () => client.domainQuality({
          domain: "agents.exemple.fr",
        }),
      () => client.domainQuality({
          domain: "agents.exemple.fr",
          days: 30,
        }),
    ));

  test("remove_domain", () =>
    controler(
      "remove_domain",
      () => client.removeDomain({
          domain: "agents.exemple.fr",
          confirm: true,
        }),
      () => client.removeDomain({
          domain: "agents.exemple.fr",
          confirm: true,
        }),
    ));

  test("send_email", () =>
    controler(
      "send_email",
      () => client.sendEmail({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          to: "nadia.morel@exemple.com",
          subject: "Rendez-vous de jeudi",
          text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
        }),
      () => client.sendEmail({
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
        }),
    ));

  test("list_threads", () =>
    controler(
      "list_threads",
      () => client.listThreads({}),
      () => client.listThreads({
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
        }),
    ));

  test("classify_thread", () =>
    controler(
      "classify_thread",
      () => client.classifyThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
        }),
      () => client.classifyThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
          labels: ["devis"],
          archived: false,
          read: true,
        }),
    ));

  test("inspect_domain", () =>
    controler(
      "inspect_domain",
      () => client.inspectDomain({
          domain: "agents.exemple.fr",
        }),
      () => client.inspectDomain({
          domain: "agents.exemple.fr",
        }),
    ));

  test("list_contacts", () =>
    controler(
      "list_contacts",
      () => client.listContacts({}),
      () => client.listContacts({
          query: "exemple.com",
          label: "devis",
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          subscription: "subscribed",
          offset: 0,
          limit: 20,
        }),
    ));

  test("get_contact", () =>
    controler(
      "get_contact",
      () => client.getContact({
          email: "nadia.morel@exemple.com",
        }),
      () => client.getContact({
          email: "nadia.morel@exemple.com",
        }),
    ));

  test("save_contact", () =>
    controler(
      "save_contact",
      () => client.saveContact({
          email: "nadia.morel@exemple.com",
        }),
      () => client.saveContact({
          email: "nadia.morel@exemple.com",
          name: "Atelier Exemple",
          fields: {"prenom": "Nadia", "societe": "Atelier Morel"},
          labels: ["devis"],
        }),
    ));

  test("set_contact_audiences", () =>
    controler(
      "set_contact_audiences",
      () => client.setContactAudiences({
          email: "nadia.morel@exemple.com",
          audience_ids: ["aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26"],
        }),
      () => client.setContactAudiences({
          email: "nadia.morel@exemple.com",
          audience_ids: ["aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26"],
        }),
    ));

  test("list_audiences", () =>
    controler(
      "list_audiences",
      () => client.listAudiences(),
      () => client.listAudiences(),
    ));

  test("list_campaign_templates", () =>
    controler(
      "list_campaign_templates",
      () => client.listCampaignTemplates(),
      () => client.listCampaignTemplates(),
    ));

  test("save_campaign_template", () =>
    controler(
      "save_campaign_template",
      () => client.saveCampaignTemplate({
          name: "Atelier Exemple",
          subject: "Rendez-vous de jeudi",
          text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
        }),
      () => client.saveCampaignTemplate({
          name: "Atelier Exemple",
          subject: "Rendez-vous de jeudi",
          text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
          template_id: "5d1c8e2a-7b3f-4e9a-b0c6-2f4d8a1e9c37",
          html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
        }),
    ));

  test("save_audience", () =>
    controler(
      "save_audience",
      () => client.saveAudience({
          name: "Atelier Exemple",
        }),
      () => client.saveAudience({
          name: "Atelier Exemple",
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
        }),
    ));

  test("get_audience", () =>
    controler(
      "get_audience",
      () => client.getAudience({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
        }),
      () => client.getAudience({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          offset: 0,
        }),
    ));

  test("import_contacts", () =>
    controler(
      "import_contacts",
      () => client.importContacts({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          contacts: [{"email": "marc.lefevre@exemple.com", "name": "Marc Lefèvre", "fields": {"prenom": "Marc"}}],
        }),
      () => client.importContacts({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          contacts: [{"email": "marc.lefevre@exemple.com", "name": "Marc Lefèvre", "fields": {"prenom": "Marc"}}],
        }),
    ));

  test("remove_audience_contact", () =>
    controler(
      "remove_audience_contact",
      () => client.removeAudienceContact({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          email: "nadia.morel@exemple.com",
        }),
      () => client.removeAudienceContact({
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          email: "nadia.morel@exemple.com",
        }),
    ));

  test("list_campaigns", () =>
    controler(
      "list_campaigns",
      () => client.listCampaigns({}),
      () => client.listCampaigns({
          offset: 0,
          archived: false,
        }),
    ));

  test("save_campaign", () =>
    controler(
      "save_campaign",
      () => client.saveCampaign({
          name: "Atelier Exemple",
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          steps: [{"variants": [{"subject": "Vos chantiers de la rentrée", "text": "Bonjour {{prenom}},\n\nUn mot sur vos chantiers.\n\n{{unsubscribe_url}}"}]}],
        }),
      () => client.saveCampaign({
          name: "Atelier Exemple",
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          steps: [{"variants": [{"subject": "Vos chantiers de la rentrée", "text": "Bonjour {{prenom}},\n\nUn mot sur vos chantiers.\n\n{{unsubscribe_url}}"}]}],
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          from_address: "marie@exemple.fr",
          audience_id: "aud_3c8f1a5e9d2b47c6a0e4f81b7d5c9e26",
          reply_to: "marie@exemple.fr",
        }),
    ));

  test("get_campaign", () =>
    controler(
      "get_campaign",
      () => client.getCampaign({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
        }),
      () => client.getCampaign({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          offset: 0,
        }),
    ));

  test("preview_campaign", () =>
    controler(
      "preview_campaign",
      () => client.previewCampaign({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
        }),
      () => client.previewCampaign({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          offset: 0,
        }),
    ));

  test("campaign_action", () =>
    controler(
      "campaign_action",
      () => client.campaignAction({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          action: "pause",
        }),
      () => client.campaignAction({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          action: "pause",
          starts_at: "2026-10-20T09:00:00+02:00",
          confirm: true,
          revision: "5d41402abc4b2a76",
        }),
    ));

  test("campaign_metrics", () =>
    controler(
      "campaign_metrics",
      () => client.campaignMetrics({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
        }),
      () => client.campaignMetrics({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          offset: 0,
        }),
    ));

  test("campaign_history", () =>
    controler(
      "campaign_history",
      () => client.campaignHistory({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
        }),
      () => client.campaignHistory({
          campaign_id: "cmp_6b2d9e41c7a84f03b5e1d28a90c4f7e3",
          offset: 0,
        }),
    ));

  test("get_thread", () =>
    controler(
      "get_thread",
      () => client.getThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
        }),
      () => client.getThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
          cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
        }),
    ));

  test("reply_to_thread", () =>
    controler(
      "reply_to_thread",
      () => client.replyToThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
          text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
        }),
      () => client.replyToThread({
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
        }),
    ));

  test("close_thread", () =>
    controler(
      "close_thread",
      () => client.closeThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
        }),
      () => client.closeThread({
          thread_id: "thr_0e5a7c2b9f1d48e6a3c7b5d0e2f9a814",
        }),
    ));

  test("get_message", () =>
    controler(
      "get_message",
      () => client.getMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
      () => client.getMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
    ));

  test("list_drafts", () =>
    controler(
      "list_drafts",
      () => client.listDrafts({}),
      () => client.listDrafts({
          inbox_id: "inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95",
          cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
          limit: 20,
        }),
    ));

  test("update_draft", () =>
    controler(
      "update_draft",
      () => client.updateDraft({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
      () => client.updateDraft({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
          subject: "Rendez-vous de jeudi",
          text: "Bonjour Madame Morel,\n\nPouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?\n\nBien à vous,\nMarie",
          html: "<p>Bonjour Madame Morel,</p><p>Pouvons-nous déplacer notre rendez-vous de jeudi à vendredi, 10 h ?</p><p>Bien à vous,<br>Marie</p>",
        }),
    ));

  test("approve_message", () =>
    controler(
      "approve_message",
      () => client.approveMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
      () => client.approveMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
          revision: "5d41402abc4b2a76",
        }),
    ));

  test("cancel_message", () =>
    controler(
      "cancel_message",
      () => client.cancelMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
      () => client.cancelMessage({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
          reason: "Rendez-vous annulé.",
        }),
    ));

  test("attach_files", () =>
    controler(
      "attach_files",
      () => client.attachFiles({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
      () => client.attachFiles({
          message_id: "msg_7f2a91c4e8b34d0fa6c25e1b9d3f7a48",
        }),
    ));

  test("remove_attachment", () =>
    controler(
      "remove_attachment",
      () => client.removeAttachment({
          attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
        }),
      () => client.removeAttachment({
          attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
        }),
    ));

  test("get_attachment", () =>
    controler(
      "get_attachment",
      () => client.getAttachment({
          attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
        }),
      () => client.getAttachment({
          attachment_id: "att_5e1c9a7b3d2f40618c4e6a0b9d7f2c35",
        }),
    ));

  test("add_suppression", () =>
    controler(
      "add_suppression",
      () => client.addSuppression({
          address: "nadia.morel@exemple.com",
        }),
      () => client.addSuppression({
          address: "nadia.morel@exemple.com",
          note: "A demandé à ne plus être contactée.",
        }),
    ));

  test("remove_suppression", () =>
    controler(
      "remove_suppression",
      () => client.removeSuppression({
          address: "nadia.morel@exemple.com",
        }),
      () => client.removeSuppression({
          address: "nadia.morel@exemple.com",
        }),
    ));

  test("list_suppressions", () =>
    controler(
      "list_suppressions",
      () => client.listSuppressions({}),
      () => client.listSuppressions({
          query: "exemple.com",
          cursor: "eyJhIjoiMjAyNi0xMC0xMyJ9",
          limit: 20,
        }),
    ));

  test("get_settings", () =>
    controler(
      "get_settings",
      () => client.getSettings(),
      () => client.getSettings(),
    ));

  test("update_settings", () =>
    controler(
      "update_settings",
      () => client.updateSettings({}),
      () => client.updateSettings({
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
        }),
    ));

  test("list_keys", () =>
    controler(
      "list_keys",
      () => client.listKeys(),
      () => client.listKeys(),
    ));

  test("create_key", () =>
    controler(
      "create_key",
      () => client.createKey({
          name: "Atelier Exemple",
        }),
      () => client.createKey({
          name: "Atelier Exemple",
          permissions: ["send", "read"],
          inbox_ids: ["inb_3f9c2a7e5b1d4c8e9a0f6b2d7c4e1a95"],
          daily_cap: 50,
        }),
    ));

  test("revoke_key", () =>
    controler(
      "revoke_key",
      () => client.revokeKey({
          key_id: "key_5a0d8e3c9b714f26a1e47c08b3d95f62",
          confirm: true,
        }),
      () => client.revokeKey({
          key_id: "key_5a0d8e3c9b714f26a1e47c08b3d95f62",
          confirm: true,
        }),
    ));

  test("set_webhook", () =>
    controler(
      "set_webhook",
      () => client.setWebhook({
          url: "https://exemple.fr/hooks/subagent",
        }),
      () => client.setWebhook({
          url: "https://exemple.fr/hooks/subagent",
        }),
    ));

  test("remove_webhook", () =>
    controler(
      "remove_webhook",
      () => client.removeWebhook(),
      () => client.removeWebhook(),
    ));

  test("close_space", () =>
    controler(
      "close_space",
      () => client.closeSpace({}),
      () => client.closeSpace({
          confirmation_code: "482913",
          cancel: false,
        }),
    ));
});

import "server-only";

import { randomUUID } from "node:crypto";
import { getContent, saveContent } from "./cms";
import type { LeadItem, LeadStatus } from "./content-types";

export type LeadInput = Pick<
  LeadItem,
  "name" | "phone" | "business" | "service" | "message" | "pageUrl"
>;

export async function saveLead(input: LeadInput) {
  const content = await getContent();
  const lead: LeadItem = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };

  const success = await saveContent({
    ...content,
    leads: [lead, ...content.leads].slice(0, 500),
  });

  return success ? lead : null;
}

export async function deleteLead(id: string) {
  const content = await getContent();
  const nextLeads = content.leads.filter((lead) => lead.id !== id);

  if (nextLeads.length === content.leads.length) {
    return false;
  }

  return saveContent({
    ...content,
    leads: nextLeads,
  });
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const content = await getContent();
  let updated = false;

  const nextLeads = content.leads.map((lead) => {
    if (lead.id !== id) {
      return lead;
    }

    updated = true;
    return {
      ...lead,
      status,
    };
  });

  if (!updated) {
    return false;
  }

  return saveContent({
    ...content,
    leads: nextLeads,
  });
}

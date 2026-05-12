import "server-only";

import { randomUUID } from "node:crypto";
import { getContent, saveContent } from "./cms";
import type { LeadItem } from "./content-types";

export type LeadInput = Pick<
  LeadItem,
  "name" | "phone" | "business" | "service" | "message" | "pageUrl"
>;

export async function saveLead(input: LeadInput) {
  const content = await getContent();
  const lead: LeadItem = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
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

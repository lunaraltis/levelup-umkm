import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  business: 120,
  service: 80,
  message: 1000,
  pageUrl: 300,
};

function readString(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const lead = {
      name: readString(body.name, MAX_LENGTHS.name),
      phone: readString(body.phone, MAX_LENGTHS.phone),
      business: readString(body.business, MAX_LENGTHS.business),
      service: readString(body.service, MAX_LENGTHS.service),
      message: readString(body.message, MAX_LENGTHS.message),
      pageUrl: readString(body.pageUrl, MAX_LENGTHS.pageUrl),
    };

    if (!lead.name || !lead.phone || !lead.service) {
      return NextResponse.json(
        { success: false, message: "Nama, WhatsApp, dan layanan wajib diisi." },
        { status: 400 },
      );
    }

    const savedLead = await saveLead(lead);

    if (!savedLead) {
      return NextResponse.json(
        { success: false, message: "Lead gagal disimpan." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead berhasil disimpan.",
      leadId: savedLead.id,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Payload lead tidak valid." },
      { status: 400 },
    );
  }
}

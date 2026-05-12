import { NextResponse } from "next/server";
import {
  createAdminSession,
  isAdminAuthConfigured,
  validateAdminPassword,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { success: false, message: "Konfigurasi admin belum lengkap." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { password?: unknown };
    const password = typeof body.password === "string" ? body.password : "";

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password admin wajib diisi." },
        { status: 400 },
      );
    }

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Password admin salah." },
        { status: 401 },
      );
    }

    await createAdminSession();

    return NextResponse.json({ success: true, message: "Login berhasil." });
  } catch {
    return NextResponse.json(
      { success: false, message: "Payload login tidak valid." },
      { status: 400 },
    );
  }
}

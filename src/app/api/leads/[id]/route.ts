import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteLead } from "@/lib/leads";

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Akses admin diperlukan." },
      { status: 401 },
    );
  }

  const id = new URL(request.url).pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { success: false, message: "ID lead tidak valid." },
      { status: 400 },
    );
  }

  const success = await deleteLead(id);

  if (!success) {
    return NextResponse.json(
      { success: false, message: "Lead tidak ditemukan." },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, message: "Lead berhasil dihapus." });
}

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContent, saveContent } from "@/lib/cms";
import type { ContentData } from "@/lib/content-types";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Akses admin diperlukan." },
      { status: 401 },
    );
  }

  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { success: false, message: "Akses admin diperlukan." },
      { status: 401 },
    );
  }

  try {
    const data = (await request.json()) as Partial<ContentData>;
    const currentContent = await getContent();
    const success = await saveContent({
      ...currentContent,
      ...data,
      leads: currentContent.leads,
    });
    
    if (success) {
      revalidatePath("/");
      return NextResponse.json({ success: true, message: "Konten berhasil disimpan!" });
    } else {
      return NextResponse.json(
        { success: false, message: "Gagal menyimpan konten." },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Format data tidak valid." },
      { status: 400 },
    );
  }
}

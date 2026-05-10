import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/cms';

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const success = await saveContent(data);
    
    if (success) {
      return NextResponse.json({ success: true, message: 'Konten berhasil disimpan!' });
    } else {
      return NextResponse.json({ success: false, message: 'Gagal menyimpan konten ke file.' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Format data tidak valid.' }, { status: 400 });
  }
}

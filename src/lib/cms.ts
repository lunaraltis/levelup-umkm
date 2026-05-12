import { createClient } from "@supabase/supabase-js";
import fallbackData from "../data/content.json";
import type { ContentData } from "./content-types";

// Kredensial ini HANYA berjalan di server (sangat aman)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

// Inisialisasi klien Supabase (hanya jika URL & Key tersedia)
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

function normalizeContent(data: Partial<ContentData>): ContentData {
  return {
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
    pricing: Array.isArray(data.pricing) ? data.pricing : [],
    leads: Array.isArray(data.leads) ? data.leads : [],
  };
}

export async function getContent(): Promise<ContentData> {
  // Jika belum ada kredensial, gunakan data lokal (sebagai cadangan/fallback)
  if (!supabase) {
    console.warn("Supabase belum dikonfigurasi. Menggunakan data lokal.");
    return normalizeContent(fallbackData as Partial<ContentData>);
  }

  try {
    const { data, error } = await supabase
      .from("cms_content")
      .select("content")
      .eq("id", 1)
      .single();

    if (error || !data) {
      console.warn("Data tidak ditemukan di Supabase, menggunakan data lokal.");
      return normalizeContent(fallbackData as Partial<ContentData>);
    }

    return normalizeContent(data.content as Partial<ContentData>);
  } catch (error) {
    console.error("Gagal membaca dari Supabase:", error);
    return normalizeContent(fallbackData as Partial<ContentData>);
  }
}

export async function saveContent(data: ContentData): Promise<boolean> {
  if (!supabase) {
    console.error("Gagal menyimpan: Supabase belum dikonfigurasi.");
    return false;
  }

  try {
    // Upsert akan melakukan Insert jika id 1 belum ada, atau Update jika sudah ada
    const { error } = await supabase
      .from("cms_content")
      .upsert({ id: 1, content: data });

    if (error) {
      console.error("Supabase Error:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Gagal menyimpan ke Supabase:", error);
    return false;
  }
}

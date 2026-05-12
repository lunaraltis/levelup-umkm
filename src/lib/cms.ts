import { createClient } from "@supabase/supabase-js";
import fallbackData from "../data/content.json";
import type {
  ContactSettings,
  ContentData,
  HeroContent,
  PortfolioItem,
  TrustContent,
} from "./content-types";

// Kredensial ini HANYA berjalan di server (sangat aman)
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

// Inisialisasi klien Supabase (hanya jika URL & Key tersedia)
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const defaultContact: ContactSettings = {
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  email: "halo@levelup-umkm.web.id",
  location: "Jakarta, Indonesia",
  businessHours: "Senin - Jumat, 09:00 - 18:00 WIB",
  ctaTitle: "Siap naik kelas",
  ctaHighlight: "bersama kami?",
  ctaDescription:
    "Konsultasikan kebutuhan digitalisasi bisnis Anda secara gratis. Tim kami siap membantu kapan saja.",
  formTitle: "Kirim Pesan",
  formDescription: "Isi formulir di bawah ini dan kami akan segera melayani Anda via WhatsApp.",
};

const defaultHero: HeroContent = {
  badge: "Platform Digitalisasi UMKM No. 1",
  title: "Digitalisasi. Otomatisasi.",
  highlight: "Naik Kelas.",
  description:
    "Ubah toko konvensional Anda menjadi bisnis digital yang profesional. Website, toko online, dan manajemen sosial media dalam satu paket.",
  primaryCtaLabel: "Lihat Harga Paket",
  secondaryCtaLabel: "Pelajari Lebih Lanjut",
  trustedText: "Dipercaya oleh ratusan pelaku UMKM di seluruh Indonesia",
  brands: [
    "Kopi Senja",
    "Rasa Nusantara",
    "Dian Fashion",
    "Batik Madura",
    "Snack Box ID",
    "Toko Hijau",
    "Warung Digital",
    "Dapur Bunda",
    "Tenun Nusantara",
    "Keramik Jaya",
  ],
};

const defaultPortfolio: PortfolioItem[] = [
  {
    title: "Artisan Coffee E-Commerce",
    category: "Toko Online Spesialis",
    image: "/images/portfolio-1.png",
    color: "#f3e8ff",
    accent: "#9333ea",
  },
  {
    title: "Luxury Fashion Boutique",
    category: "Brand Premium",
    image: "/images/portfolio-2.png",
    color: "#dcfce7",
    accent: "#16a34a",
  },
  {
    title: "Modern Food & Catering",
    category: "Layanan Makanan",
    image: "/images/portfolio-3.png",
    color: "#ffedd5",
    accent: "#ea580c",
  },
];

const defaultTrust: TrustContent = {
  eyebrow: "Aman untuk UMKM yang baru mulai",
  title: "Bukan cuma dibuatkan website,",
  highlight: "bisnis Anda ikut dipandu.",
  description:
    "Kami bantu dari strategi awal sampai website siap dipakai, supaya pemilik bisnis tidak perlu menebak sendiri langkah teknisnya.",
  items: [
    {
      title: "Briefing jelas sebelum mulai",
      description: "Kebutuhan bisnis, produk, target pembeli, dan gaya brand dirapikan dulu sebelum masuk desain.",
    },
    {
      title: "Progress bisa dipantau",
      description: "Setiap tahap pengerjaan dibuat transparan, dari struktur halaman sampai revisi akhir.",
    },
    {
      title: "Training setelah live",
      description: "Anda akan dibantu memahami cara memakai website, membaca data, dan menerima lead dari calon pembeli.",
    },
  ],
  guarantees: [
    "Konsultasi awal gratis",
    "Revisi desain sesuai paket",
    "Support WhatsApp setelah website live",
  ],
};

function normalizeContent(data: Partial<ContentData>): ContentData {
  return {
    hero: {
      ...defaultHero,
      ...(data.hero ?? {}),
      brands: Array.isArray(data.hero?.brands) ? data.hero.brands : defaultHero.brands,
    },
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
    portfolio: Array.isArray(data.portfolio) ? data.portfolio : defaultPortfolio,
    trust: {
      ...defaultTrust,
      ...(data.trust ?? {}),
      items: Array.isArray(data.trust?.items) ? data.trust.items : defaultTrust.items,
      guarantees: Array.isArray(data.trust?.guarantees)
        ? data.trust.guarantees
        : defaultTrust.guarantees,
    },
    pricing: Array.isArray(data.pricing) ? data.pricing : [],
    leads: Array.isArray(data.leads)
      ? data.leads.map((lead) => ({ ...lead, status: lead.status ?? "new" }))
      : [],
    contact: {
      ...defaultContact,
      ...(data.contact ?? {}),
    },
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

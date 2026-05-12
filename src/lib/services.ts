import { absoluteUrl } from "./site";

export type ServicePage = {
  slug: string;
  name: string;
  shortName: string;
  headline: string;
  description: string;
  intro: string;
  idealFor: string[];
  deliverables: string[];
  outcomes: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const servicePages: ServicePage[] = [
  {
    slug: "website-umkm",
    name: "Jasa Website UMKM",
    shortName: "Website UMKM",
    headline: "Website bisnis profesional untuk UMKM yang ingin terlihat lebih meyakinkan.",
    description:
      "Pembuatan website UMKM yang cepat, mobile-friendly, mudah dihubungi lewat WhatsApp, dan siap dipakai untuk promosi maupun closing.",
    intro:
      "Halaman ini cocok untuk bisnis yang belum butuh fitur checkout penuh, tetapi sudah butuh website yang rapi, cepat, dan enak dibagikan ke calon pelanggan.",
    idealFor: [
      "UMKM jasa yang ingin terlihat lebih profesional",
      "Brand lokal yang ingin punya profil bisnis resmi",
      "Bisnis yang selama ini hanya mengandalkan Instagram atau WhatsApp",
    ],
    deliverables: [
      "Landing page atau company profile yang mobile-friendly",
      "Tombol WhatsApp, CTA konsultasi, dan form lead",
      "Struktur konten yang siap dipakai untuk promosi iklan dan pencarian Google",
      "Setup domain, hosting, SSL, dan dasar SEO teknis",
    ],
    outcomes: [
      "Bisnis lebih meyakinkan saat dikirim ke calon pelanggan",
      "Closing lebih mudah karena informasi inti tidak tercecer di chat",
      "Website siap dipakai untuk kampanye promosi dan pengumpulan lead",
    ],
    faqs: [
      {
        question: "Apakah website jenis ini cocok untuk bisnis yang baru mulai?",
        answer: "Cocok. Ini justru pilihan paling efisien untuk UMKM yang ingin terlihat rapi tanpa langsung masuk ke sistem toko online penuh.",
      },
      {
        question: "Apakah saya bisa mengubah isi website setelah live?",
        answer: "Bisa. Website sudah dilengkapi area konten yang bisa disesuaikan dan tetap bisa dibantu tim bila Anda ingin revisi besar.",
      },
    ],
  },
  {
    slug: "toko-online",
    name: "Jasa Toko Online UMKM",
    shortName: "Toko Online",
    headline: "Toko online yang membantu UMKM menerima pesanan lebih rapi dan lebih siap berkembang.",
    description:
      "Solusi pembuatan toko online UMKM dengan katalog produk, alur pemesanan yang jelas, dan fondasi yang siap dipakai untuk promosi digital.",
    intro:
      "Halaman ini cocok untuk bisnis produk yang sudah mulai rutin menerima order dan butuh sistem yang lebih serius daripada sekadar chat manual.",
    idealFor: [
      "UMKM produk yang ingin menampilkan katalog lebih rapi",
      "Bisnis makanan, fashion, kerajinan, dan retail lokal",
      "Owner yang ingin memisahkan proses promosi dan proses order",
    ],
    deliverables: [
      "Halaman katalog produk dan struktur toko online yang mudah dipahami pembeli",
      "Integrasi CTA checkout, WhatsApp, atau alur order sesuai kebutuhan bisnis",
      "Tampilan produk yang lebih rapi untuk kebutuhan iklan dan promosi",
      "Setup teknis dasar agar website cepat, aman, dan siap dipakai harian",
    ],
    outcomes: [
      "Order masuk lebih terstruktur dan tidak tercecer di chat",
      "Produk lebih mudah dipresentasikan ke calon pembeli",
      "Bisnis punya fondasi yang lebih siap untuk scale promosi",
    ],
    faqs: [
      {
        question: "Apakah harus langsung memakai payment gateway?",
        answer: "Tidak harus. Alur order bisa disesuaikan dulu dengan proses bisnis Anda, lalu ditingkatkan bertahap saat volume transaksi sudah cocok.",
      },
      {
        question: "Kalau produk saya banyak, apa tetap bisa dipakai?",
        answer: "Bisa. Struktur katalog bisa dirancang sejak awal supaya tetap enak dipakai saat jumlah produk bertambah.",
      },
    ],
  },
  {
    slug: "kelola-sosmed",
    name: "Jasa Kelola Sosmed UMKM",
    shortName: "Kelola Sosmed",
    headline: "Kelola sosial media UMKM dengan arah konten yang lebih rapi dan lebih dekat ke penjualan.",
    description:
      "Layanan kelola sosial media UMKM untuk membantu bisnis tampil konsisten, punya arah konten, dan lebih siap mengubah audiens menjadi calon pembeli.",
    intro:
      "Halaman ini cocok untuk bisnis yang sudah aktif posting, tetapi hasilnya belum konsisten karena strategi, visual, dan ritme kontennya belum tertata.",
    idealFor: [
      "UMKM yang ingin kontennya lebih konsisten",
      "Owner yang tidak punya waktu mengurus caption, ide, dan desain rutin",
      "Brand lokal yang ingin menaikkan persepsi kualitas di Instagram atau TikTok",
    ],
    deliverables: [
      "Arah konten dan pilar posting yang sesuai karakter bisnis",
      "Desain feed, caption, dan ritme publikasi yang lebih konsisten",
      "CTA yang lebih jelas untuk mengarahkan audiens ke WhatsApp atau website",
      "Pendampingan agar sosial media bukan sekadar ramai, tapi lebih dekat ke closing",
    ],
    outcomes: [
      "Brand terlihat lebih aktif dan lebih profesional",
      "Konten lebih terarah ke target pelanggan yang tepat",
      "Sosial media lebih berguna sebagai mesin trust dan lead",
    ],
    faqs: [
      {
        question: "Apakah layanan ini harus dibarengi dengan website?",
        answer: "Tidak harus, tetapi hasilnya biasanya lebih kuat kalau sosial media punya landing page tujuan yang jelas seperti website bisnis atau toko online.",
      },
      {
        question: "Apakah bisa untuk bisnis lokal yang audiensnya masih kecil?",
        answer: "Bisa. Justru bisnis lokal sering paling terbantu saat kontennya mulai dibangun dengan struktur dan tujuan yang jelas.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}

export function getServiceMetadata(service: ServicePage) {
  return {
    title: `${service.name} | Level Up UMKM`,
    description: service.description,
    alternates: {
      canonical: `/layanan/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Level Up UMKM`,
      description: service.description,
      url: absoluteUrl(`/layanan/${service.slug}`),
      type: "article" as const,
      images: [
        {
          url: absoluteUrl("/images/hero-slide-1.png"),
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

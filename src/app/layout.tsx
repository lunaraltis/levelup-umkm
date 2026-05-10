import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"]
});

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Level Up UMKM | Digitalisasi Bisnis Anda Naik Kelas",
  description: "Platform No.1 untuk mengubah toko konvensional UMKM Anda menjadi bisnis digital profesional. Buat website, toko online otomatis, dan manajemen sosmed.",
  keywords: ["UMKM", "Digitalisasi UMKM", "Bikin Website Murah", "Toko Online UMKM", "Jasa Pembuatan Website"],
  openGraph: {
    title: "Level Up UMKM | Digitalisasi Bisnis Anda Naik Kelas",
    description: "Ubah toko konvensional Anda menjadi bisnis digital yang profesional. Website, toko online, dan manajemen sosial media — semuanya dalam satu paket.",
    url: "https://levelupumkm.id",
    siteName: "Level Up UMKM",
    images: [
      {
        url: "/images/hero-slide-1.png", // Akan menjadi thumbnail saat dishare
        width: 1200,
        height: 630,
        alt: "Level Up UMKM Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Level Up UMKM | Digitalisasi Bisnis",
    description: "Bawa toko UMKM Anda ke level berikutnya dengan paket website lengkap.",
    images: ["/images/hero-slide-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}

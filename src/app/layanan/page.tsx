import type { Metadata } from "next";
import ServicesOverviewPage from "@/components/ServicesOverviewPage";
import { getContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Layanan Digitalisasi UMKM | Level Up UMKM",
  description:
    "Lihat layanan Level Up UMKM untuk pembuatan website UMKM, toko online, dan pengelolaan sosial media yang lebih siap dipakai untuk promosi dan closing.",
  alternates: {
    canonical: "/layanan",
  },
};

export default async function ServicesIndexPage() {
  const content = await getContent();

  return <ServicesOverviewPage services={content.services} />;
}

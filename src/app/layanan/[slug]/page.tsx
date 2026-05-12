import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/ServiceDetailView";
import { getContent } from "@/lib/cms";
import { findServicePage, getServiceMetadata } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const content = await getContent();

  return content.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const service = findServicePage(content.services, slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Level Up UMKM",
    };
  }

  return getServiceMetadata(service);
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const content = await getContent();
  const service = findServicePage(content.services, slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailView service={service} />;
}

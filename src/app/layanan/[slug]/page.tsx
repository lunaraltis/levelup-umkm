import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServiceMetadata, getServicePage, servicePages } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: "Layanan Tidak Ditemukan | Level Up UMKM",
    };
  }

  return getServiceMetadata(service);
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", backgroundColor: "white" }}>
        <section className="section" style={{ paddingBottom: "3rem" }}>
          <div className="container">
            <Link
              href="/layanan"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--color-text-muted)",
                marginBottom: "1.5rem",
                fontWeight: 500,
              }}
            >
              <ChevronLeft size={18} />
              Kembali ke daftar layanan
            </Link>

            <div className="grid grid-cols-2" style={{ gap: "3rem", alignItems: "start" }}>
              <div>
                <span
                  className="pill"
                  style={{
                    backgroundColor: "#111111",
                    color: "white",
                    border: "none",
                    marginBottom: "1rem",
                  }}
                >
                  {service.shortName}
                </span>
                <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", marginBottom: "1rem" }}>
                  {service.headline}
                </h1>
                <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                  {service.intro}
                </p>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/#contact" className="btn btn-primary">
                    Konsultasi Gratis
                  </Link>
                  <Link href="/#pricing" className="btn btn-outline">
                    Lihat Paket Harga
                  </Link>
                </div>
              </div>

              <div
                style={{
                  padding: "2rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background:
                    "linear-gradient(180deg, rgba(212,175,55,0.12) 0%, rgba(255,255,255,1) 100%)",
                }}
              >
                <h2 style={{ fontSize: "1.375rem", marginBottom: "1rem" }}>Layanan ini cocok untuk</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {service.idealFor.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt" style={{ paddingTop: "3rem" }}>
          <div className="container">
            <div className="grid grid-cols-2" style={{ gap: "2rem", alignItems: "start" }}>
              <div
                style={{
                  padding: "2rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "white",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Yang akan disiapkan</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {service.deliverables.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  padding: "2rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "white",
                }}
              >
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Hasil yang biasanya dicari owner</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {service.outcomes.map((item) => (
                    <div key={item} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "3rem" }}>
          <div className="container">
            <div style={{ maxWidth: "860px" }}>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1.5rem" }}>
                Pertanyaan yang sering muncul tentang {service.shortName.toLowerCase()}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    style={{
                      padding: "1.5rem",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>{faq.question}</h3>
                    <p style={{ margin: 0, color: "var(--color-text-muted)", lineHeight: 1.75 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

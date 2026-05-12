import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicePages } from "@/lib/services";

export const metadata: Metadata = {
  title: "Layanan Digitalisasi UMKM | Level Up UMKM",
  description:
    "Lihat layanan Level Up UMKM untuk pembuatan website UMKM, toko online, dan pengelolaan sosial media yang lebih siap dipakai untuk promosi dan closing.",
  alternates: {
    canonical: "/layanan",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", backgroundColor: "white" }}>
        <section className="section">
          <div className="container">
            <div style={{ maxWidth: "760px", marginBottom: "3rem" }}>
              <span
                className="pill"
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#92400e",
                  border: "none",
                  marginBottom: "1rem",
                }}
              >
                Halaman Layanan
              </span>
              <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 4rem)", marginBottom: "1rem" }}>
                Pilih layanan yang paling cocok untuk tahap bisnis Anda sekarang.
              </h1>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.8 }}>
                Setiap layanan dibuat untuk kebutuhan yang berbeda. Ada yang fokus pada kredibilitas bisnis, ada yang fokus pada alur order, dan ada yang fokus pada konsistensi promosi.
              </p>
            </div>

            <div className="grid grid-cols-3" style={{ alignItems: "stretch", gap: "1.5rem" }}>
              {servicePages.map((service) => (
                <article
                  key={service.slug}
                  style={{
                    padding: "2rem",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "#fafafa",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                  }}
                >
                  <span style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: "0.75rem" }}>
                    {service.shortName}
                  </span>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{service.name}</h2>
                  <p style={{ color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                    {service.description}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem", flex: 1 }}>
                    {service.outcomes.map((item) => (
                      <div key={item} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                        <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                        <span style={{ fontSize: "0.9375rem" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/layanan/${service.slug}`} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                    Lihat Detail <ArrowRight size={18} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

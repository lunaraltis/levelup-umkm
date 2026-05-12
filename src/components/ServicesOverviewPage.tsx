"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { ServicePage } from "@/lib/content-types";

export default function ServicesOverviewPage({ services }: { services: ServicePage[] }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", backgroundColor: "white" }}>
        <section className="services-hero section">
          <div className="container">
            <div className="grid grid-cols-2 services-hero-grid">
              <AnimateOnScroll direction="right" duration={1.1}>
                <div className="services-hero-content">
                  <span className="pill services-eyebrow">
                    <Sparkles size={14} />
                    Jalur layanan yang lebih jelas
                  </span>
                  <h1 className="services-hero-title">
                    Pilih layanan yang paling cocok untuk tahap bisnis Anda sekarang.
                  </h1>
                  <p className="services-hero-copy">
                    Kami pecah layanan berdasarkan kebutuhan nyata UMKM: ada yang butuh terlihat lebih profesional, ada yang butuh alur order lebih rapi, dan ada yang butuh promosi lebih konsisten.
                  </p>
                  <div className="services-hero-actions">
                    <Link href="/#pricing" className="btn btn-accent">
                      Lihat Paket Harga
                    </Link>
                    <Link href="/#contact" className="btn services-hero-outline-btn">
                      Konsultasi Gratis
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="left" delay={0.15} duration={1.1}>
                <div className="services-hero-panel">
                  <div className="services-panel-grid">
                    {[
                      ["01", "Website untuk trust dan presentasi"],
                      ["02", "Toko online untuk alur order yang lebih rapi"],
                      ["03", "Kelola sosmed untuk ritme promosi yang lebih konsisten"],
                    ].map(([step, text]) => (
                      <div key={step} className="services-panel-row">
                        <span className="services-panel-step">{step}</span>
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <div className="grid grid-cols-3" style={{ alignItems: "stretch", gap: "1.5rem" }}>
              {services.map((service, index) => (
                <AnimateOnScroll key={service.slug} delay={index * 0.12} direction="up" duration={1}>
                  <article
                    className="service-card"
                    style={
                      {
                        "--service-accent": service.accent,
                        "--service-accent-soft": service.accentSoft,
                      } as CSSProperties
                    }
                  >
                    <div className="service-card-topline" />
                    <div className="service-card-badge">{service.badge}</div>
                    <h2>{service.name}</h2>
                    <p className="service-card-copy">{service.description}</p>

                    <div className="service-card-stat">
                      <span>{service.statLabel}</span>
                      <strong>{service.statValue}</strong>
                    </div>

                    <div className="service-card-list">
                      {service.outcomes.map((item) => (
                        <div key={item} className="service-card-item">
                          <CheckCircle2 size={18} color={service.accent} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={`/layanan/${service.slug}`} className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                      Lihat Detail <ArrowRight size={18} />
                    </Link>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <AnimateOnScroll style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 2.5rem" }}>
              <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", marginBottom: "1rem" }}>
                Semua layanan dirancang supaya lebih dekat ke hasil bisnis, bukan sekadar terlihat bagus.
              </h2>
              <p style={{ color: "var(--color-text-muted)", fontSize: "1.0625rem", lineHeight: 1.8 }}>
                Kami membangun struktur yang membantu owner lebih mudah presentasi, lebih mudah promosi, dan lebih cepat menindaklanjuti calon pelanggan.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-3" style={{ gap: "1.25rem" }}>
              {[
                {
                  title: "Arah yang lebih jelas",
                  description: "Setiap layanan punya fungsi yang spesifik, jadi owner tidak membeli hal yang sebenarnya belum dibutuhkan.",
                },
                {
                  title: "Tampilan tetap premium",
                  description: "Desain disusun tetap konsisten dengan karakter brand hitam-emas yang sudah dipakai website utama.",
                },
                {
                  title: "Mudah dipakai untuk iklan",
                  description: "Halaman layanan ini juga siap dijadikan landing page untuk kebutuhan campaign dan SEO.",
                },
              ].map((item, index) => (
                <AnimateOnScroll key={item.title} delay={index * 0.1} direction="up">
                  <div className="services-value-card">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .services-hero {
          background:
            radial-gradient(circle at top right, rgba(212, 175, 55, 0.22), transparent 34%),
            linear-gradient(180deg, #111111 0%, #171717 100%);
          overflow: hidden;
        }

        .services-hero-grid {
          gap: 2rem;
          align-items: center;
        }

        .services-hero-content {
          max-width: 760px;
        }

        .services-eyebrow {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.12);
          margin-bottom: 1rem;
        }

        .services-hero-title {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          color: white;
          margin-bottom: 1rem;
          line-height: 1.04;
        }

        .services-hero-copy {
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.125rem;
          line-height: 1.85;
          margin-bottom: 2rem;
          max-width: 680px;
        }

        .services-hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .services-hero-outline-btn {
          color: white;
          border-color: rgba(255, 255, 255, 0.7);
          background-color: transparent;
          border-style: solid;
          border-width: 1.5px;
        }

        .services-hero-outline-btn:hover {
          color: white;
          border-color: white;
          background-color: rgba(255, 255, 255, 0.08);
        }

        .services-hero-panel {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px -18px rgba(0, 0, 0, 0.4);
          max-width: 440px;
          margin-left: auto;
        }

        .services-panel-grid {
          display: grid;
          gap: 1rem;
        }

        .services-panel-row {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr);
          gap: 1rem;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .services-panel-row:last-child {
          border-bottom: none;
        }

        .services-panel-step {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(212, 175, 55, 0.15);
          color: var(--color-accent);
          font-weight: 800;
          font-size: 0.875rem;
        }

        .services-panel-row p {
          color: white;
          margin: 0;
          line-height: 1.65;
          font-size: 1rem;
        }

        .service-card {
          position: relative;
          padding: 2rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
          background:
            linear-gradient(180deg, var(--service-accent-soft), rgba(255, 255, 255, 0) 36%),
            white;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: transparent;
        }

        .service-card-topline {
          width: 100%;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--service-accent), transparent);
          margin-bottom: 1.25rem;
        }

        .service-card-badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          background: white;
          color: var(--service-accent);
          border: 1px solid rgba(0, 0, 0, 0.06);
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .service-card h2 {
          font-size: 1.55rem;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .service-card-copy {
          color: var(--color-text-muted);
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .service-card-stat {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.9rem 1rem;
          border-radius: var(--radius-lg);
          background: rgba(17, 17, 17, 0.03);
          margin-bottom: 1.25rem;
        }

        .service-card-stat span {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .service-card-stat strong {
          font-size: 0.95rem;
          color: var(--color-brand);
        }

        .service-card-list {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .service-card-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.95rem;
          line-height: 1.65;
        }

        .services-value-card {
          padding: 1.75rem;
          border-radius: var(--radius-xl);
          background: white;
          border: 1px solid var(--color-border);
          min-height: 100%;
        }

        .services-value-card h3 {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
        }

        .services-value-card p {
          color: var(--color-text-muted);
          line-height: 1.75;
          margin: 0;
        }

        @media (max-width: 768px) {
          .services-hero {
            background:
              radial-gradient(circle at top right, rgba(212, 175, 55, 0.22), transparent 40%),
              linear-gradient(180deg, #111111 0%, #171717 100%);
          }

          .services-hero-grid {
            align-items: start;
          }

          .services-hero-copy {
            font-size: 1rem;
          }

          .services-hero-actions {
            gap: 0.875rem;
          }

          .services-hero-panel {
            max-width: none;
            margin-left: 0;
          }

          .service-card-stat {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

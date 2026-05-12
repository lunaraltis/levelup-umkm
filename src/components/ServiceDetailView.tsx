"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import type { ServicePage } from "@/lib/content-types";

export default function ServiceDetailView({ service }: { service: ServicePage }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "7rem", backgroundColor: "white" }}>
        <section
          className="service-detail-hero section"
          style={
            {
              "--service-accent": service.accent,
              "--service-accent-soft": service.accentSoft,
            } as CSSProperties
          }
        >
          <div className="container">
            <AnimateOnScroll direction="none" duration={0.95}>
              <Link href="/layanan" className="service-back-link">
                <ChevronLeft size={18} />
                Kembali ke daftar layanan
              </Link>
            </AnimateOnScroll>

            <div className="grid grid-cols-2 service-detail-hero-grid">
              <AnimateOnScroll direction="right" duration={1.05}>
                <div className="service-detail-copy">
                  <span className="pill service-detail-pill">
                    <Sparkles size={14} />
                    {service.badge}
                  </span>
                  <h1 className="service-detail-title">{service.headline}</h1>
                  <p className="service-detail-intro">{service.intro}</p>

                  <div className="service-detail-actions">
                    <Link href="/#contact" className="btn btn-accent">
                      Konsultasi Gratis
                    </Link>
                    <Link href="/#pricing" className="btn btn-white">
                      Lihat Paket Harga <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="left" delay={0.12} duration={1.05}>
                <div className="service-visual-shell">
                  <div className="service-visual-badge">Dirancang untuk UMKM yang ingin naik kelas</div>
                  <div className="service-visual-card">
                    <h2>Layanan ini cocok untuk</h2>
                    <p className="service-visual-summary">
                      Fokus layanan ini adalah membantu bisnis punya fondasi yang lebih rapi, lebih meyakinkan, dan lebih siap dipakai untuk promosi maupun follow-up calon pelanggan.
                    </p>
                    <div className="service-visual-list">
                      {service.idealFor.map((item) => (
                        <div key={item} className="service-check-item">
                          <CheckCircle2 size={18} color={service.accent} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <section className="section section-alt" style={{ paddingTop: "2rem" }}>
          <div className="container">
            <div className="grid grid-cols-2" style={{ gap: "1.5rem", alignItems: "stretch" }}>
              <AnimateOnScroll direction="up">
                <div className="service-content-card">
                  <div className="service-content-topline" />
                  <h2>Yang akan disiapkan</h2>
                  <div className="service-content-list">
                    {service.deliverables.map((item) => (
                      <div key={item} className="service-check-item">
                        <CheckCircle2 size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll direction="up" delay={0.12}>
                <div className="service-content-card">
                  <div className="service-content-topline service-content-topline-secondary" />
                  <h2>Hasil yang biasanya dicari owner</h2>
                  <div className="service-content-list">
                    {service.outcomes.map((item) => (
                      <div key={item} className="service-check-item">
                        <CheckCircle2 size={18} color={service.accent} style={{ flexShrink: 0, marginTop: "0.125rem" }} />
                        <span>{item}</span>
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
            <AnimateOnScroll style={{ marginBottom: "2rem", maxWidth: "760px" }}>
              <span className="service-section-label">Pertanyaan yang sering muncul</span>
              <h2 style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", marginBottom: "0.75rem" }}>
                Beberapa hal yang biasanya ditanyakan sebelum mulai {service.shortName.toLowerCase()}.
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: 1.8 }}>
                Supaya calon klien tidak perlu menebak-nebak prosesnya, poin pentingnya kami buat lebih jelas di sini.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
              {service.faqs.map((faq, index) => (
                <AnimateOnScroll key={faq.question} delay={index * 0.08} direction="up">
                  <div className="service-faq-card">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "0" }}>
          <div className="container">
            <AnimateOnScroll direction="scale" duration={1.05}>
              <div className="service-cta-band">
                <div>
                  <span className="service-section-label" style={{ color: "rgba(255,255,255,0.72)" }}>
                    Langkah berikutnya
                  </span>
                  <h2 style={{ color: "white", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "0.75rem" }}>
                    Kalau layanan ini terasa paling cocok, lanjutkan ke konsultasi.
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, margin: 0 }}>
                    Anda bisa mulai dari diskusi singkat dulu. Dari situ baru diputuskan struktur, prioritas, dan paket yang paling masuk akal untuk bisnis Anda.
                  </p>
                </div>
                <div className="service-cta-actions">
                  <Link href="/#contact" className="btn btn-accent">
                    Hubungi Sekarang
                  </Link>
                  <Link href="/layanan" className="btn btn-white">
                    Lihat Layanan Lain
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .service-detail-hero {
          background:
            radial-gradient(circle at top right, var(--service-accent-soft), transparent 30%),
            linear-gradient(180deg, #111111 0%, #171717 100%);
          overflow: hidden;
        }

        .service-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .service-detail-hero-grid {
          gap: 2.5rem;
          align-items: start;
        }

        .service-detail-copy {
          max-width: 700px;
        }

        .service-detail-pill {
          background: rgba(255, 255, 255, 0.08);
          color: white;
          border-color: rgba(255, 255, 255, 0.12);
          margin-bottom: 1rem;
        }

        .service-detail-title {
          color: white;
          font-size: clamp(2.5rem, 5vw, 4.4rem);
          margin-bottom: 1rem;
          line-height: 1.04;
        }

        .service-detail-intro {
          color: rgba(255, 255, 255, 0.72);
          font-size: 1.125rem;
          line-height: 1.9;
          margin-bottom: 1.75rem;
          max-width: 680px;
        }

        .service-detail-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .service-visual-shell {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 460px;
          margin-left: auto;
        }

        .service-visual-badge {
          display: inline-flex;
          align-self: flex-start;
          background: white;
          color: var(--color-brand);
          padding: 0.7rem 1rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 700;
          box-shadow: var(--shadow-lg);
        }

        .service-visual-card {
          width: 100%;
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          background: white;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-lg);
        }

        .service-visual-card h2 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .service-visual-summary {
          color: var(--color-text-muted);
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .service-visual-list,
        .service-content-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .service-check-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .service-content-card {
          padding: 2rem;
          border-radius: var(--radius-xl);
          background: white;
          border: 1px solid var(--color-border);
          min-height: 100%;
        }

        .service-content-card h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .service-content-topline {
          width: 84px;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--color-accent), transparent);
          margin-bottom: 1rem;
        }

        .service-content-topline-secondary {
          background: linear-gradient(90deg, var(--service-accent), transparent);
        }

        .service-section-label {
          display: inline-block;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .service-faq-card {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.015), rgba(255, 255, 255, 1)),
            white;
          min-height: 100%;
        }

        .service-faq-card h3 {
          font-size: 1.05rem;
          margin-bottom: 0.65rem;
        }

        .service-faq-card p {
          margin: 0;
          color: var(--color-text-muted);
          line-height: 1.8;
        }

        .service-cta-band {
          padding: clamp(2rem, 5vw, 3rem);
          border-radius: 30px;
          background:
            radial-gradient(circle at top right, rgba(212, 175, 55, 0.22), transparent 28%),
            linear-gradient(135deg, #111111, #1f1f1f);
          display: grid;
          grid-template-columns: 1.5fr 0.9fr;
          gap: 2rem;
          align-items: center;
        }

        .service-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          align-items: flex-start;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .service-visual-shell {
            max-width: none;
            margin-left: 0;
          }

          .service-cta-band {
            grid-template-columns: 1fr;
          }

          .service-cta-actions {
            align-items: stretch;
          }
        }

        @media (max-width: 768px) {
          .service-detail-hero {
            background:
              radial-gradient(circle at top right, var(--service-accent-soft), transparent 40%),
              linear-gradient(180deg, #111111 0%, #171717 100%);
          }

          .service-detail-intro {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

"use client";

import Image from "next/image";
import AnimateOnScroll from "./AnimateOnScroll";
import type { PortfolioItem } from "@/lib/content-types";

export default function Portfolio({ initialData }: { initialData: PortfolioItem[] }) {
  const portfolios = initialData.filter((item) => item.title && item.image);

  return (
    <section id="portfolio" className="section" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        <AnimateOnScroll style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 4rem" }}>
          <span
            style={{
              color: "var(--color-brand)",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Hasil Karya Kami
          </span>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "1.25rem" }}>
            Transformasi Digital Nyata
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "1.125rem", lineHeight: 1.7 }}>
            Lihat bagaimana kami mengubah bisnis lokal menjadi brand digital yang profesional, menarik, dan berkelas dunia.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-3" style={{ gap: "2rem" }}>
          {portfolios.map((item, index) => (
            <AnimateOnScroll key={`${item.title}-${index}`} delay={index * 0.2} direction="up" duration={1.2}>
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  backgroundColor: "white",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                }}
                onMouseOver={(event) => {
                  event.currentTarget.style.transform = "translateY(-10px)";
                }}
                onMouseOut={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "300px",
                    backgroundColor: item.color,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      backgroundColor: item.color,
                      color: item.accent,
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      marginBottom: "1rem",
                    }}
                  >
                    {item.category}
                  </span>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

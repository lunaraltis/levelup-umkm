"use client";

import { CheckCircle2, ClipboardCheck, Headphones, ShieldCheck } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import type { TrustContent } from "@/lib/content-types";

const icons = [
  <ClipboardCheck key="brief" size={22} strokeWidth={1.8} />,
  <ShieldCheck key="progress" size={22} strokeWidth={1.8} />,
  <Headphones key="support" size={22} strokeWidth={1.8} />,
];

export default function TrustSection({ initialData }: { initialData: TrustContent }) {
  return (
    <section className="section section-alt" id="trust">
      <div className="container">
        <div className="grid grid-cols-2" style={{ gap: "4rem", alignItems: "center" }}>
          <AnimateOnScroll direction="right" duration={1.2}>
            <span
              style={{
                color: "var(--color-brand)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "1rem",
              }}
            >
              {initialData.eyebrow}
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.25rem" }}>
              {initialData.title}{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>{initialData.highlight}</span>
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "1.0625rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              {initialData.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {initialData.guarantees.filter(Boolean).map((guarantee) => (
                <div key={guarantee} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontWeight: 600 }}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  {guarantee}
                </div>
              ))}
            </div>
          </AnimateOnScroll>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {initialData.items.filter((item) => item.title).map((item, index) => (
              <AnimateOnScroll key={`${item.title}-${index}`} delay={index * 0.15} direction="left">
                <div
                  style={{
                    padding: "1.5rem",
                    backgroundColor: "white",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: "1rem",
                    alignItems: "start",
                    boxShadow: index === 1 ? "var(--shadow-md)" : "none",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: index === 1 ? "var(--color-brand)" : "#fef3c7",
                      color: index === 1 ? "white" : "#b45309",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {icons[index % icons.length]}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>{item.title}</h3>
                    <p style={{ color: "var(--color-text-muted)", margin: 0, lineHeight: 1.65, fontSize: "0.9375rem" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

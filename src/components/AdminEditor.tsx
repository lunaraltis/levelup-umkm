"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import type {
  ContentData,
  FaqItem,
  LeadItem,
  PricingPlan,
  TestimonialItem,
} from "@/lib/content-types";

type AdminTab = "leads" | "faqs" | "testimonials" | "pricing";
type SaveStatus = "idle" | "saving" | "success" | "error";

const emptyContent: ContentData = {
  faqs: [],
  testimonials: [],
  pricing: [],
  leads: [],
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function createWhatsAppLink(phone: string) {
  const normalizedPhone = phone.replace(/\D/g, "").replace(/^0/, "62");
  return `https://wa.me/${normalizedPhone}`;
}

export default function AdminEditor() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("faqs");
  const [data, setData] = useState<ContentData>(emptyContent);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });

        if (response.status === 401) {
          router.refresh();
          return;
        }

        if (!response.ok) {
          throw new Error("Gagal memuat data CMS.");
        }

        const result = (await response.json()) as ContentData;

        if (!cancelled) {
          setData(result);
          setLoadError(null);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Data CMS gagal dimuat. Coba refresh halaman.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSave = async () => {
    setSaveStatus("saving");

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        router.refresh();
        return;
      }

      if (!response.ok) {
        setSaveStatus("error");
        return;
      }

      setSaveStatus("success");
      window.setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    setData((currentData) => ({
      ...currentData,
      faqs: currentData.faqs.map((faq, currentIndex) =>
        currentIndex === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Pick<TestimonialItem, "name" | "role" | "content">,
    value: string,
  ) => {
    setData((currentData) => ({
      ...currentData,
      testimonials: currentData.testimonials.map((testimonial, currentIndex) =>
        currentIndex === index ? { ...testimonial, [field]: value } : testimonial,
      ),
    }));
  };

  const updatePricing = (
    index: number,
    field: keyof Pick<PricingPlan, "name" | "description" | "priceUpfront" | "priceMonthly">,
    value: string,
  ) => {
    setData((currentData) => ({
      ...currentData,
      pricing: currentData.pricing.map((plan, currentIndex) =>
        currentIndex === index ? { ...plan, [field]: value } : plan,
      ),
    }));
  };

  const updateFeature = (pricingIndex: number, featureIndex: number, value: string) => {
    setData((currentData) => ({
      ...currentData,
      pricing: currentData.pricing.map((plan, currentIndex) =>
        currentIndex === pricingIndex
          ? {
              ...plan,
              features: plan.features.map((feature, currentFeatureIndex) =>
                currentFeatureIndex === featureIndex ? value : feature,
              ),
            }
          : plan,
      ),
    }));
  };

  const deleteLead = async (id: string) => {
    const response = await fetch(`/api/leads/${id}`, { method: "DELETE" });

    if (response.status === 401) {
      router.refresh();
      return;
    }

    if (!response.ok) {
      return;
    }

    setData((currentData) => ({
      ...currentData,
      leads: currentData.leads.filter((lead) => lead.id !== id),
    }));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <header style={{ backgroundColor: "white", borderBottom: "1px solid var(--color-border)", position: "sticky", top: 0, zIndex: 10 }}>
        <div className="container admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.25rem", margin: 0, fontWeight: 700 }}>CMS Level Up UMKM</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {saveStatus === "success" && <span style={{ color: "#16a34a", fontSize: "0.875rem", fontWeight: 600 }}>Tersimpan!</span>}
            {saveStatus === "error" && <span style={{ color: "#dc2626", fontSize: "0.875rem", fontWeight: 600 }}>Gagal menyimpan.</span>}

            <button onClick={handleSave} disabled={saveStatus === "saving" || loading} className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", borderRadius: "var(--radius-md)" }}>
              <Save size={18} /> {saveStatus === "saving" ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <div className="admin-divider" style={{ width: "1px", height: "24px", backgroundColor: "var(--color-border)", margin: "0 0.5rem" }} />
            <Link href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: 500 }}>
              <ExternalLink size={18} /> Lihat Web
            </Link>
            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", fontSize: "0.875rem", fontWeight: 500 }}>
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="container admin-grid" style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "2rem", padding: "2rem", alignItems: "start" }}>
        <aside style={{ backgroundColor: "white", borderRadius: "var(--radius-lg)", padding: "1rem", border: "1px solid var(--color-border)" }}>
          <h3 style={{ fontSize: "0.875rem", textTransform: "uppercase", color: "var(--color-text-muted)", letterSpacing: "0.05em", marginBottom: "1rem", padding: "0 0.5rem" }}>Menu Editor</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { id: "leads" as const, label: "Lead Masuk" },
              { id: "faqs" as const, label: "FAQ (Tanya Jawab)" },
              { id: "testimonials" as const, label: "Testimoni" },
              { id: "pricing" as const, label: "Paket Harga" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: activeTab === tab.id ? "var(--color-brand)" : "transparent",
                  color: activeTab === tab.id ? "white" : "var(--color-text)",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        <main style={{ backgroundColor: "white", borderRadius: "var(--radius-lg)", padding: "2rem", border: "1px solid var(--color-border)" }}>
          {loading ? (
            <p>Memuat data...</p>
          ) : loadError ? (
            <p style={{ color: "#b91c1c" }}>{loadError}</p>
          ) : (
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem", textTransform: "capitalize" }}>
                {activeTab === "leads" ? "Lead Masuk" : `Edit ${activeTab}`}
              </h2>

              {activeTab === "leads" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {data.leads.length === 0 ? (
                    <p style={{ color: "var(--color-text-muted)" }}>Belum ada lead masuk.</p>
                  ) : (
                    data.leads.map((lead: LeadItem) => (
                      <div key={lead.id} style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", backgroundColor: "#fafafa" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                          <div>
                            <h3 style={{ margin: 0, fontSize: "1.0625rem" }}>{lead.name}</h3>
                            <p style={{ margin: "0.25rem 0 0", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>{lead.business || "Nama bisnis belum diisi"}</p>
                          </div>
                          <span style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>{formatDate(lead.createdAt)}</span>
                        </div>
                        <div className="admin-lead-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                          <p style={{ margin: 0 }}><strong>WhatsApp:</strong> {lead.phone}</p>
                          <p style={{ margin: 0 }}><strong>Layanan:</strong> {lead.service}</p>
                        </div>
                        {lead.message && <p style={{ margin: "0 0 1rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{lead.message}</p>}
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          <a href={createWhatsAppLink(lead.phone)} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: "inline-flex", padding: "0.625rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}>
                            Hubungi via WhatsApp
                          </a>
                          <button onClick={() => void deleteLead(lead.id)} className="btn btn-outline" style={{ display: "inline-flex", padding: "0.625rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}>
                            <Trash2 size={16} /> Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "faqs" &&
                data.faqs.map((faq, index) => (
                  <div key={`${faq.question}-${index}`} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ fontWeight: 600 }}>Pertanyaan #{index + 1}</span>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Pertanyaan</label>
                      <input type="text" value={faq.question} onChange={(event) => updateFaq(index, "question", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Jawaban</label>
                      <textarea value={faq.answer} onChange={(event) => updateFaq(index, "answer", event.target.value)} rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                    </div>
                  </div>
                ))}

              {activeTab === "testimonials" &&
                data.testimonials.map((testimonial, index) => (
                  <div key={`${testimonial.name}-${index}`} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Nama Klien</label>
                        <input type="text" value={testimonial.name} onChange={(event) => updateTestimonial(index, "name", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Peran / Nama Bisnis</label>
                        <input type="text" value={testimonial.role} onChange={(event) => updateTestimonial(index, "role", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Isi Testimoni</label>
                      <textarea value={testimonial.content} onChange={(event) => updateTestimonial(index, "content", event.target.value)} rows={3} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                    </div>
                  </div>
                ))}

              {activeTab === "pricing" &&
                data.pricing.map((plan, index) => (
                  <div key={`${plan.name}-${index}`} style={{ marginBottom: "3rem", padding: "2rem", backgroundColor: "#fafafa", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
                    <h3 style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>Paket: {plan.name}</h3>
                    <div className="admin-pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Nama Paket</label>
                        <input type="text" value={plan.name} onChange={(event) => updatePricing(index, "name", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Harga Setup (Rp)</label>
                        <input type="text" value={plan.priceUpfront} onChange={(event) => updatePricing(index, "priceUpfront", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Harga Bulanan (Rp)</label>
                        <input type="text" value={plan.priceMonthly} onChange={(event) => updatePricing(index, "priceMonthly", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Deskripsi Singkat</label>
                      <input type="text" value={plan.description} onChange={(event) => updatePricing(index, "description", event.target.value)} style={{ width: "100%", padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }} />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.875rem", marginBottom: "0.5rem", color: "var(--color-text-muted)" }}>Fitur-Fitur</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {plan.features.map((feature, featureIndex) => (
                          <input key={`${plan.name}-feature-${featureIndex}`} type="text" value={feature} onChange={(event) => updateFeature(index, featureIndex, event.target.value)} style={{ width: "100%", padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)", fontSize: "0.9375rem" }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }

          .admin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }

          .admin-divider {
            display: none !important;
          }

          .admin-two-col,
          .admin-lead-grid,
          .admin-pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

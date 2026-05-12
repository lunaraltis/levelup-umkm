"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, ExternalLink, LogOut, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import type {
  ContactSettings,
  ContentData,
  FaqItem,
  HeroContent,
  LeadItem,
  LeadStatus,
  PortfolioItem,
  PricingPlan,
  ServicePage,
  TestimonialItem,
  TrustContent,
} from "@/lib/content-types";

type AdminTab =
  | "leads"
  | "hero"
  | "trust"
  | "portfolio"
  | "services"
  | "contact"
  | "faqs"
  | "testimonials"
  | "pricing";
type SaveStatus = "idle" | "saving" | "success" | "error";

const emptyContent: ContentData = {
  hero: {
    badge: "",
    title: "",
    highlight: "",
    description: "",
    primaryCtaLabel: "",
    secondaryCtaLabel: "",
    trustedText: "",
    brands: [],
  },
  faqs: [],
  testimonials: [],
  portfolio: [],
  trust: {
    eyebrow: "",
    title: "",
    highlight: "",
    description: "",
    items: [],
    guarantees: [],
  },
  services: [],
  pricing: [],
  leads: [],
  contact: {
    whatsappNumber: "",
    whatsappDisplay: "",
    email: "",
    location: "",
    businessHours: "",
    ctaTitle: "",
    ctaHighlight: "",
    ctaDescription: "",
    formTitle: "",
    formDescription: "",
  },
};

const leadStatuses: Array<{ value: LeadStatus; label: string }> = [
  { value: "new", label: "Baru" },
  { value: "contacted", label: "Sudah Dihubungi" },
  { value: "won", label: "Closing" },
  { value: "lost", label: "Belum Jadi" },
];

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

function escapeCsvCell(value: string) {
  const normalized = value.replace(/"/g, '""');
  return `"${normalized}"`;
}

export default function AdminEditor() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("leads");
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

  const exportLeadsCsv = () => {
    if (data.leads.length === 0) {
      return;
    }

    const rows = [
      ["Tanggal", "Status", "Nama", "WhatsApp", "Bisnis", "Layanan", "Pesan", "Halaman"],
      ...data.leads.map((lead) => [
        lead.createdAt,
        lead.status ?? "new",
        lead.name,
        lead.phone,
        lead.business,
        lead.service,
        lead.message,
        lead.pageUrl,
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => escapeCsvCell(String(cell ?? ""))).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads-levelup-umkm.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const updateHero = (field: keyof HeroContent, value: string | string[]) => {
    setData((currentData) => ({
      ...currentData,
      hero: {
        ...currentData.hero,
        [field]: value,
      },
    }));
  };

  const updateTrust = (field: keyof Omit<TrustContent, "items" | "guarantees">, value: string) => {
    setData((currentData) => ({
      ...currentData,
      trust: {
        ...currentData.trust,
        [field]: value,
      },
    }));
  };

  const updateTrustItem = (index: number, field: "title" | "description", value: string) => {
    setData((currentData) => ({
      ...currentData,
      trust: {
        ...currentData.trust,
        items: currentData.trust.items.map((item, currentIndex) =>
          currentIndex === index ? { ...item, [field]: value } : item,
        ),
      },
    }));
  };

  const updateGuarantee = (index: number, value: string) => {
    setData((currentData) => ({
      ...currentData,
      trust: {
        ...currentData.trust,
        guarantees: currentData.trust.guarantees.map((item, currentIndex) =>
          currentIndex === index ? value : item,
        ),
      },
    }));
  };

  const updatePortfolio = (index: number, field: keyof PortfolioItem, value: string) => {
    setData((currentData) => ({
      ...currentData,
      portfolio: currentData.portfolio.map((item, currentIndex) =>
        currentIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const updateService = (
    index: number,
    field: keyof Omit<ServicePage, "idealFor" | "deliverables" | "outcomes" | "faqs">,
    value: string,
  ) => {
    setData((currentData) => ({
      ...currentData,
      services: currentData.services.map((service, currentIndex) =>
        currentIndex === index ? { ...service, [field]: value } : service,
      ),
    }));
  };

  const updateServiceList = (
    index: number,
    field: keyof Pick<ServicePage, "idealFor" | "deliverables" | "outcomes">,
    value: string,
  ) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setData((currentData) => ({
      ...currentData,
      services: currentData.services.map((service, currentIndex) =>
        currentIndex === index ? { ...service, [field]: items } : service,
      ),
    }));
  };

  const updateServiceFaq = (serviceIndex: number, faqIndex: number, field: keyof FaqItem, value: string) => {
    setData((currentData) => ({
      ...currentData,
      services: currentData.services.map((service, currentIndex) =>
        currentIndex === serviceIndex
          ? {
              ...service,
              faqs: service.faqs.map((faq, currentFaqIndex) =>
                currentFaqIndex === faqIndex ? { ...faq, [field]: value } : faq,
              ),
            }
          : service,
      ),
    }));
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

  const updateContact = (field: keyof ContactSettings, value: string) => {
    setData((currentData) => ({
      ...currentData,
      contact: {
        ...currentData.contact,
        [field]: value,
      },
    }));
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    const response = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.status === 401) {
      router.refresh();
      return;
    }

    if (!response.ok) {
      return;
    }

    setData((currentData) => ({
      ...currentData,
      leads: currentData.leads.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
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
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          className="container admin-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            gap: "1rem",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", margin: 0, fontWeight: 700 }}>CMS Level Up UMKM</h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {saveStatus === "success" && (
              <span style={{ color: "#16a34a", fontSize: "0.875rem", fontWeight: 600 }}>Tersimpan!</span>
            )}
            {saveStatus === "error" && (
              <span style={{ color: "#dc2626", fontSize: "0.875rem", fontWeight: 600 }}>Gagal menyimpan.</span>
            )}

            <button
              onClick={handleSave}
              disabled={saveStatus === "saving" || loading}
              className="btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              <Save size={18} /> {saveStatus === "saving" ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <div
              className="admin-divider"
              style={{ width: "1px", height: "24px", backgroundColor: "var(--color-border)", margin: "0 0.5rem" }}
            />
            <Link
              href="/"
              target="_blank"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              <ExternalLink size={18} /> Lihat Web
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-muted)",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div
        className="container admin-grid"
        style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "2rem", padding: "2rem", alignItems: "start" }}
      >
        <aside
          style={{
            backgroundColor: "white",
            borderRadius: "var(--radius-lg)",
            padding: "1rem",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
              padding: "0 0.5rem",
            }}
          >
            Menu Editor
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              { id: "leads" as const, label: "Lead Masuk" },
              { id: "hero" as const, label: "Hero" },
              { id: "trust" as const, label: "Trust & Garansi" },
              { id: "portfolio" as const, label: "Portfolio" },
              { id: "services" as const, label: "Halaman Layanan" },
              { id: "contact" as const, label: "Kontak & CTA" },
              { id: "faqs" as const, label: "FAQ" },
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

        <main
          style={{
            backgroundColor: "white",
            borderRadius: "var(--radius-lg)",
            padding: "2rem",
            border: "1px solid var(--color-border)",
          }}
        >
          {loading ? (
            <p>Memuat data...</p>
          ) : loadError ? (
            <p style={{ color: "#b91c1c" }}>{loadError}</p>
          ) : (
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
                {activeTab === "leads"
                  ? "Lead Masuk"
                  : activeTab === "services"
                    ? "Halaman Layanan"
                  : activeTab === "contact"
                    ? "Kontak & CTA"
                    : activeTab === "trust"
                      ? "Trust & Garansi"
                      : activeTab === "faqs"
                        ? "FAQ"
                        : activeTab === "pricing"
                          ? "Paket Harga"
                          : activeTab === "testimonials"
                            ? "Testimoni"
                            : activeTab === "portfolio"
                              ? "Portfolio"
                              : "Hero"}
              </h2>

              {activeTab === "leads" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
                      Total lead: <strong>{data.leads.length}</strong>
                    </p>
                    <button
                      onClick={exportLeadsCsv}
                      className="btn btn-outline"
                      style={{ display: "inline-flex", padding: "0.625rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}
                    >
                      <Download size={16} /> Export CSV
                    </button>
                  </div>

                  {data.leads.length === 0 ? (
                    <p style={{ color: "var(--color-text-muted)" }}>Belum ada lead masuk.</p>
                  ) : (
                    data.leads.map((lead: LeadItem) => (
                      <div
                        key={lead.id}
                        style={{
                          padding: "1.25rem",
                          borderRadius: "var(--radius-lg)",
                          border: "1px solid var(--color-border)",
                          backgroundColor: "#fafafa",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1rem",
                            flexWrap: "wrap",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <div>
                            <h3 style={{ margin: 0, fontSize: "1.0625rem" }}>{lead.name}</h3>
                            <p style={{ margin: "0.25rem 0 0", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                              {lead.business || "Nama bisnis belum diisi"}
                            </p>
                          </div>
                          <span style={{ color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
                            {formatDate(lead.createdAt)}
                          </span>
                        </div>

                        <div className="admin-lead-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                          <p style={{ margin: 0 }}><strong>WhatsApp:</strong> {lead.phone}</p>
                          <p style={{ margin: 0 }}><strong>Layanan:</strong> {lead.service}</p>
                          <label style={{ margin: 0, display: "flex", gap: "0.5rem", alignItems: "center" }}>
                            <strong>Status:</strong>
                            <select
                              value={lead.status ?? "new"}
                              onChange={(event) => void updateLeadStatus(lead.id, event.target.value as LeadStatus)}
                              style={{ padding: "0.45rem 0.75rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}
                            >
                              {leadStatuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                  {status.label}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                        {lead.message && (
                          <p style={{ margin: "0 0 0.75rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                            {lead.message}
                          </p>
                        )}
                        {lead.pageUrl && (
                          <p style={{ margin: "0 0 1rem", color: "var(--color-text-muted)", fontSize: "0.8125rem" }}>
                            Halaman: {lead.pageUrl}
                          </p>
                        )}
                        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                          <a
                            href={createWhatsAppLink(lead.phone)}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                            style={{ display: "inline-flex", padding: "0.625rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}
                          >
                            Hubungi via WhatsApp
                          </a>
                          <button
                            onClick={() => void deleteLead(lead.id)}
                            className="btn btn-outline"
                            style={{ display: "inline-flex", padding: "0.625rem 1rem", borderRadius: "var(--radius-md)", fontSize: "0.875rem" }}
                          >
                            <Trash2 size={16} /> Hapus
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "hero" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label className="admin-label">Badge</label>
                    <input className="admin-input" type="text" value={data.hero.badge} onChange={(event) => updateHero("badge", event.target.value)} />
                  </div>
                  <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="admin-label">Judul Utama</label>
                      <input className="admin-input" type="text" value={data.hero.title} onChange={(event) => updateHero("title", event.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Highlight</label>
                      <input className="admin-input" type="text" value={data.hero.highlight} onChange={(event) => updateHero("highlight", event.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Deskripsi</label>
                    <textarea className="admin-input" rows={4} value={data.hero.description} onChange={(event) => updateHero("description", event.target.value)} />
                  </div>
                  <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="admin-label">Tombol Utama</label>
                      <input className="admin-input" type="text" value={data.hero.primaryCtaLabel} onChange={(event) => updateHero("primaryCtaLabel", event.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Tombol Kedua</label>
                      <input className="admin-input" type="text" value={data.hero.secondaryCtaLabel} onChange={(event) => updateHero("secondaryCtaLabel", event.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Teks Trusted By</label>
                    <input className="admin-input" type="text" value={data.hero.trustedText} onChange={(event) => updateHero("trustedText", event.target.value)} />
                  </div>
                  <div>
                    <label className="admin-label">Daftar Brand Marquee (1 baris per brand)</label>
                    <textarea
                      className="admin-input"
                      rows={8}
                      value={data.hero.brands.join("\n")}
                      onChange={(event) => updateHero("brands", event.target.value.split("\n").map((item) => item.trim()).filter(Boolean))}
                    />
                  </div>
                </div>
              )}

              {activeTab === "trust" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label className="admin-label">Eyebrow</label>
                    <input className="admin-input" type="text" value={data.trust.eyebrow} onChange={(event) => updateTrust("eyebrow", event.target.value)} />
                  </div>
                  <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="admin-label">Judul</label>
                      <input className="admin-input" type="text" value={data.trust.title} onChange={(event) => updateTrust("title", event.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Highlight</label>
                      <input className="admin-input" type="text" value={data.trust.highlight} onChange={(event) => updateTrust("highlight", event.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="admin-label">Deskripsi</label>
                    <textarea className="admin-input" rows={4} value={data.trust.description} onChange={(event) => updateTrust("description", event.target.value)} />
                  </div>

                  {data.trust.items.map((item, index) => (
                    <div key={`trust-item-${index}`} style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", backgroundColor: "#fafafa", border: "1px solid var(--color-border)" }}>
                      <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Poin Trust #{index + 1}</h3>
                      <div style={{ marginBottom: "1rem" }}>
                        <label className="admin-label">Judul</label>
                        <input className="admin-input" type="text" value={item.title} onChange={(event) => updateTrustItem(index, "title", event.target.value)} />
                      </div>
                      <div>
                        <label className="admin-label">Deskripsi</label>
                        <textarea className="admin-input" rows={3} value={item.description} onChange={(event) => updateTrustItem(index, "description", event.target.value)} />
                      </div>
                    </div>
                  ))}

                  <div style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", backgroundColor: "#fafafa", border: "1px solid var(--color-border)" }}>
                    <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>List Garansi</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {data.trust.guarantees.map((item, index) => (
                        <input key={`guarantee-${index}`} className="admin-input" type="text" value={item} onChange={(event) => updateGuarantee(index, event.target.value)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "portfolio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {data.portfolio.map((item, index) => (
                    <div key={`portfolio-${index}`} style={{ padding: "1.25rem", borderRadius: "var(--radius-lg)", backgroundColor: "#fafafa", border: "1px solid var(--color-border)" }}>
                      <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Portfolio #{index + 1}</h3>
                      <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label className="admin-label">Judul</label>
                          <input className="admin-input" type="text" value={item.title} onChange={(event) => updatePortfolio(index, "title", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Kategori</label>
                          <input className="admin-input" type="text" value={item.category} onChange={(event) => updatePortfolio(index, "category", event.target.value)} />
                        </div>
                      </div>
                      <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "1rem" }}>
                        <div>
                          <label className="admin-label">Path Gambar</label>
                          <input className="admin-input" type="text" value={item.image} onChange={(event) => updatePortfolio(index, "image", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Warna Background</label>
                          <input className="admin-input" type="text" value={item.color} onChange={(event) => updatePortfolio(index, "color", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Warna Accent</label>
                          <input className="admin-input" type="text" value={item.accent} onChange={(event) => updatePortfolio(index, "accent", event.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "services" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {data.services.map((service, index) => (
                    <div
                      key={service.slug || `service-${index}`}
                      style={{
                        padding: "1.5rem",
                        borderRadius: "var(--radius-lg)",
                        backgroundColor: "#fafafa",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <h3 style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>
                        Layanan #{index + 1}: {service.name}
                      </h3>

                      <div className="admin-service-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label className="admin-label">Slug URL</label>
                          <input className="admin-input" type="text" value={service.slug} onChange={(event) => updateService(index, "slug", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Nama Layanan</label>
                          <input className="admin-input" type="text" value={service.name} onChange={(event) => updateService(index, "name", event.target.value)} />
                        </div>
                      </div>

                      <div className="admin-service-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label className="admin-label">Nama Pendek</label>
                          <input className="admin-input" type="text" value={service.shortName} onChange={(event) => updateService(index, "shortName", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Badge</label>
                          <input className="admin-input" type="text" value={service.badge} onChange={(event) => updateService(index, "badge", event.target.value)} />
                        </div>
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <label className="admin-label">Headline</label>
                        <textarea className="admin-input" rows={3} value={service.headline} onChange={(event) => updateService(index, "headline", event.target.value)} />
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <label className="admin-label">Deskripsi Kartu Layanan</label>
                        <textarea className="admin-input" rows={3} value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} />
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <label className="admin-label">Intro Halaman Detail</label>
                        <textarea className="admin-input" rows={4} value={service.intro} onChange={(event) => updateService(index, "intro", event.target.value)} />
                      </div>

                      <div className="admin-service-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label className="admin-label">Label Stat</label>
                          <input className="admin-input" type="text" value={service.statLabel} onChange={(event) => updateService(index, "statLabel", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Nilai Stat</label>
                          <input className="admin-input" type="text" value={service.statValue} onChange={(event) => updateService(index, "statValue", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Accent</label>
                          <input className="admin-input" type="text" value={service.accent} onChange={(event) => updateService(index, "accent", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Accent Soft</label>
                          <input className="admin-input" type="text" value={service.accentSoft} onChange={(event) => updateService(index, "accentSoft", event.target.value)} />
                        </div>
                      </div>

                      <div className="admin-service-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label className="admin-label">Layanan ini cocok untuk (1 baris per poin)</label>
                          <textarea className="admin-input" rows={6} value={service.idealFor.join("\n")} onChange={(event) => updateServiceList(index, "idealFor", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Yang akan disiapkan (1 baris per poin)</label>
                          <textarea className="admin-input" rows={6} value={service.deliverables.join("\n")} onChange={(event) => updateServiceList(index, "deliverables", event.target.value)} />
                        </div>
                        <div>
                          <label className="admin-label">Hasil yang dicari owner (1 baris per poin)</label>
                          <textarea className="admin-input" rows={6} value={service.outcomes.join("\n")} onChange={(event) => updateServiceList(index, "outcomes", event.target.value)} />
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <h4 style={{ fontSize: "1rem", margin: 0 }}>FAQ Layanan</h4>
                        {service.faqs.map((faq, faqIndex) => (
                          <div key={`${service.slug}-faq-${faqIndex}`} style={{ padding: "1rem", borderRadius: "var(--radius-md)", backgroundColor: "white", border: "1px solid var(--color-border)" }}>
                            <div style={{ marginBottom: "0.75rem" }}>
                              <label className="admin-label">Pertanyaan</label>
                              <input className="admin-input" type="text" value={faq.question} onChange={(event) => updateServiceFaq(index, faqIndex, "question", event.target.value)} />
                            </div>
                            <div>
                              <label className="admin-label">Jawaban</label>
                              <textarea className="admin-input" rows={3} value={faq.answer} onChange={(event) => updateServiceFaq(index, faqIndex, "answer", event.target.value)} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "contact" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="admin-label">Nomor WhatsApp (format wa.me)</label>
                      <input className="admin-input" type="text" value={data.contact.whatsappNumber} onChange={(event) => updateContact("whatsappNumber", event.target.value)} placeholder="6281234567890" />
                    </div>
                    <div>
                      <label className="admin-label">Nomor WhatsApp Tampilan</label>
                      <input className="admin-input" type="text" value={data.contact.whatsappDisplay} onChange={(event) => updateContact("whatsappDisplay", event.target.value)} placeholder="+62 812-3456-7890" />
                    </div>
                  </div>

                  <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label className="admin-label">Email</label>
                      <input className="admin-input" type="email" value={data.contact.email} onChange={(event) => updateContact("email", event.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Lokasi</label>
                      <input className="admin-input" type="text" value={data.contact.location} onChange={(event) => updateContact("location", event.target.value)} />
                    </div>
                  </div>

                  <div>
                    <label className="admin-label">Jam Operasional</label>
                    <input className="admin-input" type="text" value={data.contact.businessHours} onChange={(event) => updateContact("businessHours", event.target.value)} />
                  </div>

                  <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", backgroundColor: "#fafafa" }}>
                    <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>CTA Banner</h3>
                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="admin-label">Judul CTA</label>
                        <input className="admin-input" type="text" value={data.contact.ctaTitle} onChange={(event) => updateContact("ctaTitle", event.target.value)} />
                      </div>
                      <div>
                        <label className="admin-label">Highlight CTA</label>
                        <input className="admin-input" type="text" value={data.contact.ctaHighlight} onChange={(event) => updateContact("ctaHighlight", event.target.value)} />
                      </div>
                    </div>
                    <label className="admin-label">Deskripsi CTA</label>
                    <textarea className="admin-input" value={data.contact.ctaDescription} onChange={(event) => updateContact("ctaDescription", event.target.value)} rows={3} />
                  </div>

                  <div style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", backgroundColor: "#fafafa" }}>
                    <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>Form Kontak</h3>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="admin-label">Judul Form</label>
                      <input className="admin-input" type="text" value={data.contact.formTitle} onChange={(event) => updateContact("formTitle", event.target.value)} />
                    </div>
                    <label className="admin-label">Deskripsi Form</label>
                    <textarea className="admin-input" value={data.contact.formDescription} onChange={(event) => updateContact("formDescription", event.target.value)} rows={3} />
                  </div>
                </div>
              )}

              {activeTab === "faqs" &&
                data.faqs.map((faq, index) => (
                  <div key={`${faq.question}-${index}`} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                      <span style={{ fontWeight: 600 }}>Pertanyaan #{index + 1}</span>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="admin-label">Pertanyaan</label>
                      <input className="admin-input" type="text" value={faq.question} onChange={(event) => updateFaq(index, "question", event.target.value)} />
                    </div>
                    <div>
                      <label className="admin-label">Jawaban</label>
                      <textarea className="admin-input" value={faq.answer} onChange={(event) => updateFaq(index, "answer", event.target.value)} rows={3} />
                    </div>
                  </div>
                ))}

              {activeTab === "testimonials" &&
                data.testimonials.map((testimonial, index) => (
                  <div key={`${testimonial.name}-${index}`} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid var(--color-border)" }}>
                    <div className="admin-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="admin-label">Nama Klien</label>
                        <input className="admin-input" type="text" value={testimonial.name} onChange={(event) => updateTestimonial(index, "name", event.target.value)} />
                      </div>
                      <div>
                        <label className="admin-label">Peran / Nama Bisnis</label>
                        <input className="admin-input" type="text" value={testimonial.role} onChange={(event) => updateTestimonial(index, "role", event.target.value)} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label className="admin-label">Isi Testimoni</label>
                      <textarea className="admin-input" value={testimonial.content} onChange={(event) => updateTestimonial(index, "content", event.target.value)} rows={3} />
                    </div>
                  </div>
                ))}

              {activeTab === "pricing" &&
                data.pricing.map((plan, index) => (
                  <div key={`${plan.name}-${index}`} style={{ marginBottom: "3rem", padding: "2rem", backgroundColor: "#fafafa", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
                    <h3 style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}>Paket: {plan.name}</h3>
                    <div className="admin-pricing-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label className="admin-label">Nama Paket</label>
                        <input className="admin-input" type="text" value={plan.name} onChange={(event) => updatePricing(index, "name", event.target.value)} />
                      </div>
                      <div>
                        <label className="admin-label">Harga Setup (Rp)</label>
                        <input className="admin-input" type="text" value={plan.priceUpfront} onChange={(event) => updatePricing(index, "priceUpfront", event.target.value)} />
                      </div>
                      <div>
                        <label className="admin-label">Harga Bulanan (Rp)</label>
                        <input className="admin-input" type="text" value={plan.priceMonthly} onChange={(event) => updatePricing(index, "priceMonthly", event.target.value)} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <label className="admin-label">Deskripsi Singkat</label>
                      <input className="admin-input" type="text" value={plan.description} onChange={(event) => updatePricing(index, "description", event.target.value)} />
                    </div>

                    <div>
                      <label className="admin-label">Fitur-Fitur</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {plan.features.map((feature, featureIndex) => (
                          <input
                            key={`${plan.name}-feature-${featureIndex}`}
                            className="admin-input"
                            type="text"
                            value={feature}
                            onChange={(event) => updateFeature(index, featureIndex, event.target.value)}
                          />
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
        .admin-label {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          color: var(--color-text-muted);
        }

        .admin-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          font: inherit;
        }

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
          .admin-service-grid,
          .admin-lead-grid,
          .admin-pricing-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

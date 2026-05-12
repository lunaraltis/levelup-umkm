"use client";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";
import { trackEvent } from "@/lib/analytics";
import type { ContactSettings } from "@/lib/content-types";

type SubmitStatus = "idle" | "saving" | "success" | "warning" | "error";

export default function Contact({ initialData }: { initialData: ContactSettings }) {
  const contact = initialData;
  const [formData, setFormData] = useState({
    name: '', phone: '', business: '', service: '', message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const openWhatsApp = () => {
    const text = [
      "Halo Level Up UMKM!",
      "",
      "Saya tertarik untuk mendigitalisasi bisnis saya. Berikut data saya:",
      "",
      `Nama: ${formData.name}`,
      `WhatsApp: ${formData.phone}`,
      `Bisnis/Toko: ${formData.business}`,
      `Layanan: ${formData.service}`,
      "",
      "Pesan:",
      formData.message,
      "",
      "Mohon informasi lebih lanjut. Terima kasih!",
    ].join("\n");

    trackEvent("whatsapp_click", {
      source: "contact_form",
      service: formData.service,
    });
    window.open(`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      setSubmitStatus("error");
      setStatusMessage("Mohon isi Nama Lengkap, WhatsApp, dan Layanan yang Diminati.");
      return;
    }

    setSubmitStatus("saving");
    setStatusMessage("Menyimpan data konsultasi...");
    trackEvent("lead_form_submit", {
      service: formData.service,
      has_business: Boolean(formData.business),
      has_message: Boolean(formData.message),
    });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        if (response.status >= 500) {
          setSubmitStatus("warning");
          setStatusMessage("WhatsApp tetap dibuka, tapi data belum tersimpan otomatis.");
          openWhatsApp();
          return;
        }

        setSubmitStatus("error");
        setStatusMessage(result.message ?? "Data belum lengkap.");
        return;
      }

      setSubmitStatus("success");
      setStatusMessage("Data tersimpan. WhatsApp akan terbuka untuk melanjutkan chat.");
      trackEvent("lead_form_saved", {
        service: formData.service,
      });
      openWhatsApp();
    } catch {
      setSubmitStatus("warning");
      setStatusMessage("WhatsApp tetap dibuka, tapi data belum tersimpan otomatis.");
      openWhatsApp();
    }
  };

  return (
    <section id="contact" className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        {/* CTA Banner */}
        <AnimateOnScroll direction="scale" duration={1.3}>
          <div style={{
            backgroundColor: 'var(--color-brand)', borderRadius: 'var(--radius-xl)',
            padding: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center',
            position: 'relative', overflow: 'hidden', marginBottom: '4rem'
          }}>
            <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: '1.25rem' }}>
                {contact.ctaTitle}{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>{contact.ctaHighlight}</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                {contact.ctaDescription}
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="#form" className="btn btn-accent" style={{ padding: '1rem 2rem' }}>
                  Hubungi Kami Sekarang
                </Link>
                <Link href={`https://wa.me/${contact.whatsappNumber}`} target="_blank" onClick={() => trackEvent("whatsapp_click", { source: "contact_banner" })} className="btn btn-white" style={{ padding: '1rem 2rem' }}>
                  Chat via WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Contact Form */}
        <div id="form" className="grid grid-cols-2" style={{ gap: '4rem', alignItems: 'center' }}>
          <AnimateOnScroll direction="right" duration={1.2}>
            <div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem' }}>{contact.formTitle}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1.0625rem', marginBottom: '2.5rem', lineHeight: 1.7 }}>
                {contact.formDescription}
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                  <div className="input-group" style={{ margin: 0 }}>
                    <label htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="Budi Santoso" required />
                  </div>
                  <div className="input-group" style={{ margin: 0 }}>
                    <label htmlFor="phone">No. WhatsApp</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder="08123456789" required />
                  </div>
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label htmlFor="business">Nama Bisnis / Toko</label>
                  <input type="text" id="business" value={formData.business} onChange={e=>setFormData({...formData, business: e.target.value})} placeholder="Misal: Kopi Senja" />
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label htmlFor="service">Layanan yang Diminati</label>
                  <select id="service" value={formData.service} onChange={e=>setFormData({...formData, service: e.target.value})} required>
                    <option value="">Pilih layanan...</option>
                    <option value="Paket Starter">Paket Starter</option>
                    <option value="Paket Pro Business">Paket Pro Business</option>
                    <option value="Paket Enterprise">Paket Enterprise</option>
                    <option value="Solusi Custom">Solusi Custom</option>
                  </select>
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label htmlFor="message">Pesan / Pertanyaan</label>
                  <textarea id="message" rows={4} value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} placeholder="Ceritakan singkat tentang bisnis Anda..."></textarea>
                </div>
                {submitStatus !== "idle" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.625rem",
                      color:
                        submitStatus === "success"
                          ? "#15803d"
                          : submitStatus === "error"
                            ? "#b91c1c"
                            : "#a16207",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                    }}
                  >
                    {submitStatus === "success" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                    {statusMessage}
                  </div>
                )}
                <button type="submit" disabled={submitStatus === "saving"} className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
                  {submitStatus === "saving" ? "Menyimpan..." : "Kirim via WhatsApp"} <Send size={18} />
                </button>
              </form>
            </div>
          </AnimateOnScroll>

          {/* Info Side */}
          <AnimateOnScroll direction="left" duration={1.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { icon: <MapPin size={20} strokeWidth={1.5} />, title: 'Lokasi', desc: contact.location, iconBg: '#dbeafe', iconColor: '#2563eb' },
                { icon: <Mail size={20} strokeWidth={1.5} />, title: 'Email', desc: contact.email, iconBg: '#fef3c7', iconColor: '#d97706' },
                { icon: <Phone size={20} strokeWidth={1.5} />, title: 'WhatsApp', desc: contact.whatsappDisplay, iconBg: '#dcfce7', iconColor: '#16a34a' },
                { icon: <Clock size={20} strokeWidth={1.5} />, title: 'Jam Operasional', desc: contact.businessHours, iconBg: '#f3e8ff', iconColor: '#9333ea' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '1.5rem', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)', backgroundColor: 'white',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                >
                  <div style={{ 
                    width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: 'var(--radius-md)', backgroundColor: item.iconBg, color: item.iconColor,
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem' }}>{item.title}</p>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

"use client";
import { ShoppingCart, Paintbrush, BarChart, ShieldCheck, Megaphone, Globe } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import Image from "next/image";

const categories = [
  { icon: <Globe size={18} />, label: "Website" },
  { icon: <ShoppingCart size={18} />, label: "Toko Online" },
  { icon: <Megaphone size={18} />, label: "Sosial Media" },
  { icon: <Paintbrush size={18} />, label: "Branding" },
  { icon: <BarChart size={18} />, label: "Analitik" },
  { icon: <ShieldCheck size={18} />, label: "Keamanan" },
];

export default function Features() {
  return (
    <section id="features" className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        <AnimateOnScroll style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Untuk semua jenis{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>bisnis UMKM</span>
          </h2>
        </AnimateOnScroll>

        {/* Category Pills */}
        <AnimateOnScroll delay={0.2} duration={1.2}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {categories.map((cat, i) => (
              <div key={i} className="pill" style={{ 
                gap: '0.5rem', padding: '0.625rem 1.25rem',
                transition: 'all var(--transition-fast)', cursor: 'default'
              }}
              onMouseOver={e => { 
                e.currentTarget.style.backgroundColor = 'var(--color-brand)'; 
                e.currentTarget.style.color = 'white'; 
                e.currentTarget.style.borderColor = 'var(--color-brand)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={e => { 
                e.currentTarget.style.backgroundColor = 'white'; 
                e.currentTarget.style.color = 'var(--color-text)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                {cat.icon}
                {cat.label}
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Feature Showcase Image */}
        <AnimateOnScroll direction="scale" duration={1.3}>
          <div style={{
            borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)',
            maxWidth: '900px', margin: '0 auto 4rem',
            position: 'relative', height: '420px', width: '100%'
          }}>
            <Image 
              src="/images/feature-showcase.png" 
              alt="Solusi Digital UMKM Lengkap" 
              fill
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </AnimateOnScroll>

        {/* How it works */}
        <AnimateOnScroll style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Kami yang urus sisanya,{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Anda tinggal jualan</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            Proses digitalisasi bisnis Anda semudah 4 langkah.
          </p>
        </AnimateOnScroll>

        {/* Steps Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '01', title: 'Konsultasi', desc: 'Ceritakan bisnis Anda dan kami analisa kebutuhan digitalnya secara gratis.', color: '#dbeafe', accent: '#2563eb' },
            { step: '02', title: 'Setup & Desain', desc: 'Tim kami membangun website dan branding visual sesuai karakter bisnis Anda.', color: '#fef3c7', accent: '#d97706' },
            { step: '03', title: 'Go Live', desc: 'Toko online Anda siap live dalam hitungan hari. Terima pesanan pertama!', color: '#dcfce7', accent: '#16a34a' },
            { step: '04', title: 'Bertumbuh', desc: 'Pantau performa lewat dashboard, kami bantu optimasi terus-menerus.', color: '#f3e8ff', accent: '#9333ea' },
          ].map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 0.18}>
              <div style={{
                padding: '2rem', borderRadius: 'var(--radius-lg)',
                backgroundColor: 'white', border: '1px solid var(--color-border)',
                transition: 'all var(--transition-normal)', height: '100%'
              }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                  backgroundColor: item.color, color: item.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.875rem', marginBottom: '1.25rem'
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.625rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

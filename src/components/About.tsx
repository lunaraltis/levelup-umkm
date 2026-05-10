"use client";
import { ShoppingCart, Laptop, Megaphone } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

const reasons = [
  {
    icon: <ShoppingCart size={24} strokeWidth={1.5} />,
    title: "Langsung Pakai",
    description: "Website toko online yang siap beroperasi tanpa perlu coding. Upload produk, terima pesanan, semudah posting di sosmed."
  },
  {
    icon: <Laptop size={24} strokeWidth={1.5} />,
    title: "Desain Premium",
    description: "Tampilan website yang didesain khusus agar bisnis Anda terlihat setara dengan brand besar nasional."
  },
  {
    icon: <Megaphone size={24} strokeWidth={1.5} />,
    title: "Solusi End-to-End",
    description: "Bukan cuma website — kami juga urus branding, konten sosial media, hingga pemasangan iklan digital."
  }
];

export default function About() {
  return (
    <section id="about" className="section" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <AnimateOnScroll style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Karena digitalisasi bisnis{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>seharusnya</span>{' '}
            tidak serumit ini
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem', lineHeight: 1.7 }}>
            Kami menyederhanakan seluruh proses go-digital agar Anda bisa fokus pada hal yang paling penting: menjalankan bisnis.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-3" style={{ gap: '2.5rem' }}>
          {reasons.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 0.2} direction={i === 0 ? 'right' : i === 2 ? 'left' : 'up'}>
              <div style={{
                padding: '2.5rem 2rem', borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)', transition: 'all var(--transition-normal)',
                cursor: 'default', height: '100%'
              }}
              onMouseOver={e => { 
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; 
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              onMouseOut={e => { 
                e.currentTarget.style.boxShadow = 'none'; 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-brand)', marginBottom: '1.5rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.7, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

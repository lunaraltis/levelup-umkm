"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-brand)', color: 'rgba(255,255,255,0.7)', paddingTop: '4rem' }}>
      <div className="container">
        <div className="grid footer-grid" style={{ gap: '3rem', paddingBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px', height: '36px', backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-brand)', fontWeight: 'bold', fontSize: '1rem'
              }}>L</div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: 'white' }}>
                Level Up UMKM
              </span>
            </div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Platform digitalisasi UMKM yang membantu bisnis lokal naik kelas dengan solusi website, e-commerce, dan media sosial.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>Layanan</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="/layanan/website-umkm" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Website UMKM</Link></li>
              <li><Link href="/layanan/toko-online" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Toko Online</Link></li>
              <li><Link href="/layanan/kelola-sosmed" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Kelola Sosmed</Link></li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>Perusahaan</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link href="#about" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Tentang Kami</Link></li>
              <li><Link href="/terms" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" style={{ fontSize: '0.875rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Kebijakan Privasi</Link></li>
            </ul>
          </div>

          {/* Sosial */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>Ikuti Kami</h4>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* Instagram */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              {/* TikTok */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.22V9.4a8.16 8.16 0 0 0 3.84.96V7.64a4.85 4.85 0 0 1-.84-.07 5 5 0 0 1-.16-.02Z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.8125rem' }}>© 2026 Level Up UMKM. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

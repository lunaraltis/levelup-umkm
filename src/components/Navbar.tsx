"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'all var(--transition-normal)',
      padding: '0.75rem 0'
    }}>
      <div className="container flex justify-between items-center">
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src="/images/logo_revisi.png" 
            alt="Level Up UMKM Logo" 
            width={300} 
            height={100} 
            style={{ 
              objectFit: 'contain', 
              height: '64px', 
              width: 'auto',
              transform: 'scale(1.6)',
              transformOrigin: 'left center'
            }}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="desktop-nav">
          {[
            { href: '#about', label: 'Tentang' },
            { href: '#features', label: 'Layanan' },
            { href: '#pricing', label: 'Harga' },
            { href: '#contact', label: 'Kontak' }
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ 
              fontWeight: 500, fontSize: '0.9375rem', color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)' 
            }} 
            onClick={() => trackEvent("nav_click", { label: link.label, target: link.href })}
            onMouseOver={e => e.currentTarget.style.color = 'var(--color-brand)'} 
            onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
              {link.label}
            </Link>
          ))}
          <Link href="#contact" onClick={() => trackEvent("cta_click", { source: "navbar_desktop", target: "contact" })} className="btn btn-primary" style={{ padding: '0.625rem 1.5rem', fontSize: '0.875rem' }}>
            Mulai Sekarang
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          backgroundColor: 'white', padding: '1.5rem',
          boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: '1rem',
          borderTop: '1px solid var(--color-border)'
        }}>
          <Link href="#about" onClick={() => { trackEvent("nav_click", { label: "Tentang", target: "#about" }); setIsMobileMenuOpen(false); }} style={{ padding: '0.5rem 0', fontWeight: 500 }}>Tentang</Link>
          <Link href="#features" onClick={() => { trackEvent("nav_click", { label: "Layanan", target: "#features" }); setIsMobileMenuOpen(false); }} style={{ padding: '0.5rem 0', fontWeight: 500 }}>Layanan</Link>
          <Link href="#pricing" onClick={() => { trackEvent("nav_click", { label: "Harga", target: "#pricing" }); setIsMobileMenuOpen(false); }} style={{ padding: '0.5rem 0', fontWeight: 500 }}>Harga</Link>
          <Link href="#contact" onClick={() => { trackEvent("nav_click", { label: "Kontak", target: "#contact" }); setIsMobileMenuOpen(false); }} style={{ padding: '0.5rem 0', fontWeight: 500 }}>Kontak</Link>
          <hr style={{ borderColor: 'var(--color-border)' }} />
          <Link href="#contact" className="btn btn-primary" style={{ width: '100%' }} onClick={() => { trackEvent("cta_click", { source: "navbar_mobile", target: "contact" }); setIsMobileMenuOpen(false); }}>Mulai Sekarang</Link>
        </div>
      )}
    </nav>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import CountUp from "./CountUp";
import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const slides = [
  { src: "/images/hero-slide-1.png", alt: "Pengusaha UMKM digital" },
  { src: "/images/hero-slide-2.png", alt: "Toko online modern" },
  { src: "/images/hero-slide-3.png", alt: "Produk siap kirim" },
  { src: "/images/hero-slide-4.png", alt: "Social media & analytics" },
  { src: "/images/hero-slide-5.png", alt: "Tim profesional" },
];

const brands = [
  "Kopi Senja", "Rasa Nusantara", "Dian Fashion", "Batik Madura", "Snack Box ID",
  "Toko Hijau", "Warung Digital", "Dapur Bunda", "Tenun Nusantara", "Keramik Jaya",
  "Aroma Kopi", "Serba Unik", "Jahit Cantik", "Rempah Indonesia", "Kerajinan Lokal",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" style={{ 
      paddingTop: '7rem', paddingBottom: '2rem',
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', backgroundColor: 'white'
    }}>
      <div className="container">
        {/* Badge */}
        <AnimateOnScroll delay={0.1} direction="scale" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="pill" style={{ 
            background: 'linear-gradient(135deg, #fef9c3, #fde68a)', 
            border: 'none', fontWeight: 600, color: '#92400e' 
          }}>
            Platform Digitalisasi UMKM No. 1
          </span>
        </AnimateOnScroll>

        {/* Headline */}
        <AnimateOnScroll delay={0.3} style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 700, lineHeight: 1.08, 
            marginBottom: '1.5rem', letterSpacing: '-0.03em'
          }}>
            Digitalisasi. Otomatisasi.{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, var(--color-accent), #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Naik Kelas.
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.5} style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--color-text-muted)',
            maxWidth: '580px', margin: '0 auto 2.5rem', lineHeight: 1.7
          }}>
            Ubah toko konvensional Anda menjadi bisnis digital yang profesional. 
            Website, toko online, dan manajemen sosial media — semuanya dalam satu paket.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.7}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#pricing" onClick={() => trackEvent("cta_click", { source: "hero", target: "pricing" })} className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
              Lihat Harga Paket <ArrowRight size={18} />
            </Link>
            <Link href="#about" onClick={() => trackEvent("cta_click", { source: "hero", target: "about" })} className="btn btn-outline" style={{ padding: '1rem 2rem' }}>
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </AnimateOnScroll>

        {/* Hero Image Carousel */}
        <AnimateOnScroll delay={0.4} direction="scale" duration={1.3} style={{ marginTop: '4rem' }}>
          <div className="hero-carousel" style={{
            borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)',
            maxWidth: '1000px', margin: '0 auto', position: 'relative'
          }}>
            {/* Slides */}
            {slides.map((slide, i) => (
              <Image 
                key={i}
                src={slide.src} 
                alt={slide.alt}
                fill
                priority={i === 0}
                style={{ 
                  objectFit: 'cover', 
                  objectPosition: 'center',
                  opacity: currentSlide === i ? 1 : 0,
                  transform: currentSlide === i ? 'scale(1)' : 'scale(1.05)',
                  transition: 'opacity 1.2s ease, transform 1.2s ease'
                }}
              />
            ))}

            {/* Bottom gradient */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
              zIndex: 1
            }} />

            {/* Stats pills */}
            <div className="hero-stats" style={{
              position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem',
              display: 'flex', gap: '0.5rem', flexWrap: 'wrap', zIndex: 2
            }}>
              <div className="pill" style={{ background: 'white', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '0.75rem' }}>
                <CountUp end={500} suffix="+" /> UMKM Terdaftar
              </div>
              <div className="pill" style={{ background: 'white', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '0.75rem' }}>
                Rating 4.9 / 5.0
              </div>
              <div className="pill" style={{ background: 'white', border: 'none', boxShadow: 'var(--shadow-md)', fontSize: '0.75rem' }}>
                Rata-rata +<CountUp end={150} />% Omzet
              </div>
            </div>

            {/* Slide indicators */}
            <div style={{
              position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '0.5rem', zIndex: 2
            }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: currentSlide === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentSlide === i ? 'white' : 'rgba(255,255,255,0.5)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.5s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Trusted by — Marquee */}
        <AnimateOnScroll delay={0.3} style={{ marginTop: '3.5rem', overflow: 'hidden' }}>
          <p style={{ 
            fontSize: '0.8125rem', color: 'var(--color-text-muted)', 
            letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, 
            marginBottom: '1.5rem', textAlign: 'center'
          }}>
            Dipercaya oleh ratusan pelaku UMKM di seluruh Indonesia
          </p>
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="marquee-track">
              {[...brands, ...brands].map((name, i) => (
                <span key={i} style={{ 
                  fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, 
                  color: 'var(--color-brand)', opacity: 0.3, whiteSpace: 'nowrap',
                  padding: '0 2rem'
                }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .hero-carousel {
          height: 480px;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 5.5rem !important;
            min-height: auto !important;
          }
          .hero-carousel {
            height: 240px !important;
          }
          .hero-stats {
            bottom: 0.75rem !important;
            left: 0.75rem !important;
            right: 0.75rem !important;
            gap: 0.375rem !important;
          }
          .hero-stats .pill {
            padding: 0.375rem 0.625rem !important;
            font-size: 0.625rem !important;
          }
        }
      `}</style>
    </section>
  );
}

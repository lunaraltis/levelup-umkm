"use client";
import { Star, Quote } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import type { TestimonialItem } from "@/lib/content-types";

export default function Testimonial({ initialData }: { initialData: TestimonialItem[] }) {
  const testimonials = initialData && initialData.length > 0 ? initialData : [];
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        <AnimateOnScroll style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Apa kata mereka{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>yang sudah bergabung?</span>
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {testimonials.map((testi, index) => (
            <AnimateOnScroll key={index} delay={index * 0.2} direction={index === 0 ? 'left' : index === 2 ? 'right' : 'up'}>
              <div style={{
                backgroundColor: 'white', border: '1px solid var(--color-border)',
                padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem',
                transition: 'all var(--transition-normal)', height: '100%'
              }}
              onMouseOver={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <Quote size={32} color="var(--color-border)" strokeWidth={1} />
                <p style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--color-text)', flex: 1 }}>
                  &ldquo;{testi.content}&rdquo;
                </p>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '-0.5rem' }}>
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                  <div style={{ 
                    width: '44px', height: '44px', borderRadius: '50%', 
                    backgroundColor: 'var(--color-brand)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.875rem'
                  }}>{testi.initials}</div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }}>{testi.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{testi.role}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

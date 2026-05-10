"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";

export default function Pricing({ initialData }: { initialData: any[] }) {
  const [activePlan, setActivePlan] = useState(1);
  const plans = initialData && initialData.length > 0 ? initialData : [];

  return (
    <section id="pricing" className="section" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <AnimateOnScroll style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Investasi yang{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>sepadan</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            Tanpa biaya pembuatan di awal. Cukup bayar langganan bulanan.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-3" style={{ alignItems: 'stretch', gap: '1.5rem' }}>
          {plans.map((plan, index) => {
            const isActive = activePlan === index;
            return (
              <AnimateOnScroll key={index} delay={index * 0.18}>
                <div onClick={() => setActivePlan(index)} style={{
                  backgroundColor: isActive ? 'var(--color-brand)' : 'white',
                  color: isActive ? 'white' : 'var(--color-text)',
                  borderRadius: 'var(--radius-xl)', padding: '2.5rem 2rem',
                  border: isActive ? '1px solid var(--color-brand)' : '1px solid var(--color-border)',
                  boxShadow: isActive ? 'var(--shadow-xl)' : 'none',
                  position: 'relative', cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex', flexDirection: 'column', height: '100%'
                }}>
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                      backgroundColor: 'var(--color-accent)', color: 'var(--color-brand)',
                      padding: '0.375rem 1.25rem', borderRadius: 'var(--radius-full)',
                      fontSize: '0.8125rem', fontWeight: 700
                    }}>PALING DIMINATI</div>
                  )}
                  <h3 style={{ fontSize: '1.375rem', color: isActive ? 'white' : 'var(--color-brand)', marginBottom: '0.5rem', transition: 'color 0.4s' }}>{plan.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: isActive ? 'rgba(255,255,255,0.6)' : 'var(--color-text-muted)', marginBottom: '1.5rem', transition: 'color 0.4s' }}>{plan.description}</p>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                      <span style={{ fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Rp {plan.priceUpfront}</span>
                    </div>
                    <span style={{ fontSize: '0.8125rem', color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)', display: 'block', marginBottom: '0.75rem', transition: 'color 0.4s' }}>Biaya Setup (Satu Kali Pembayaran)</span>
                    
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: isActive ? 'rgba(0,0,0,0.1)' : 'var(--color-bg)', padding: '0.375rem 0.75rem', borderRadius: 'var(--radius-md)', transition: 'all 0.4s' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>+ Rp {plan.priceMonthly}</span>
                      <span style={{ fontSize: '0.8125rem', color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)' }}>/ bulan (Maintenance)</span>
                    </div>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '2rem', flex: 1 }}>
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <Check size={18} color={isActive ? 'var(--color-accent)' : '#16a34a'} style={{ flexShrink: 0, marginTop: '2px', transition: 'color 0.4s' }} />
                        <span style={{ fontSize: '0.9375rem' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="#contact" className="btn w-full" style={{ 
                    backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                    color: isActive ? 'var(--color-brand)' : 'var(--color-brand)',
                    border: isActive ? '1.5px solid transparent' : '1.5px solid var(--color-border)',
                    borderRadius: 'var(--radius-full)', transition: 'all 0.4s', fontWeight: 600
                  }}>Pilih Paket</Link>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

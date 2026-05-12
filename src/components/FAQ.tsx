"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import type { FaqItem } from "@/lib/content-types";

export default function FAQ({ initialData }: { initialData: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = initialData && initialData.length > 0 ? initialData : [];

  return (
    <section className="section" style={{ backgroundColor: 'white' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <AnimateOnScroll style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
            Pertanyaan{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>umum</span>
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
            Punya pertanyaan lain? Hubungi tim support kami kapan saja.
          </p>
        </AnimateOnScroll>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <AnimateOnScroll key={index} delay={index * 0.12}>
                <div style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} style={{ 
                    width: '100%', padding: '1.5rem 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left', fontSize: '1.0625rem', fontWeight: 600,
                    color: 'var(--color-brand)', gap: '1rem'
                  }}>
                    <span>{faq.question}</span>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-brand)' : 'var(--color-bg)',
                      color: isOpen ? 'white' : 'var(--color-text-muted)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all var(--transition-fast)'
                    }}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <div style={{ 
                    maxHeight: isOpen ? '300px' : '0', overflow: 'hidden', opacity: isOpen ? 1 : 0,
                    transition: 'all var(--transition-normal)', paddingBottom: isOpen ? '1.5rem' : '0'
                  }}>
                    <p style={{ color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.7, fontSize: '0.9375rem', paddingRight: '3rem' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Save, Plus, Trash2, LogOut, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("faqs");
  const [data, setData] = useState<any>({ faqs: [], testimonials: [], pricing: [] });
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetch('/api/content')
        .then(res => res.json())
        .then(resData => {
          setData(resData);
          setLoading(false);
        })
        .catch(err => {
          console.error("Gagal mengambil data:", err);
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN sederhana untuk demo (bisa diganti nanti)
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("PIN salah!");
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
    }
  };

  // Fungsi untuk update field tertentu dalam array
  const updateItem = (tab: string, index: number, field: string, value: any) => {
    const newData = { ...data };
    newData[tab][index][field] = value;
    setData(newData);
  };

  // Fungsi khusus untuk fitur di Pricing
  const updateFeature = (pricingIndex: number, featureIndex: number, value: string) => {
    const newData = { ...data };
    newData.pricing[pricingIndex].features[featureIndex] = value;
    setData(newData);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Login Admin</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9375rem' }}>Masukkan PIN rahasia untuk masuk ke CMS</p>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="Masukkan PIN"
            style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '1.5rem', outline: 'none' }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>Masuk Dashboard</button>
          
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Kembali ke Halaman Utama
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header Admin */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
          <h1 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>CMS Level Up UMKM</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {saveStatus === 'success' && <span style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: 600 }}>Tersimpan! ✓</span>}
            {saveStatus === 'error' && <span style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: 600 }}>Gagal menyimpan ✗</span>}
            
            <button 
              onClick={handleSave} 
              disabled={saveStatus === 'saving'}
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-md)' }}
            >
              <Save size={18} /> {saveStatus === 'saving' ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', margin: '0 0.5rem' }} />
            <Link href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
              <ExternalLink size={18} /> Lihat Web
            </Link>
            <button onClick={() => setIsAuthenticated(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
              <LogOut size={18} /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', padding: '2rem', alignItems: 'start' }}>
        {/* Sidebar Tabs */}
        <aside style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '1rem', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginBottom: '1rem', padding: '0 0.5rem' }}>Menu Editor</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'faqs', label: 'FAQ (Tanya Jawab)' },
              { id: 'testimonials', label: 'Testimoni' },
              { id: 'pricing', label: 'Paket Harga' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                  backgroundColor: activeTab === tab.id ? 'var(--color-brand)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--color-text)',
                  border: 'none', cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Editor area */}
        <main style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '2rem', border: '1px solid var(--color-border)' }}>
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textTransform: 'capitalize' }}>Edit {activeTab}</h2>

              {/* Editor untuk FAQ */}
              {activeTab === 'faqs' && data.faqs.map((faq: any, index: number) => (
                <div key={index} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 600 }}>Pertanyaan #{index + 1}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Pertanyaan</label>
                    <input type="text" value={faq.question} onChange={e => updateItem('faqs', index, 'question', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Jawaban</label>
                    <textarea value={faq.answer} onChange={e => updateItem('faqs', index, 'answer', e.target.value)} rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  </div>
                </div>
              ))}

              {/* Editor untuk Testimoni */}
              {activeTab === 'testimonials' && data.testimonials.map((testi: any, index: number) => (
                <div key={index} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Nama Klien</label>
                      <input type="text" value={testi.name} onChange={e => updateItem('testimonials', index, 'name', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Peran / Nama Bisnis</label>
                      <input type="text" value={testi.role} onChange={e => updateItem('testimonials', index, 'role', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Isi Testimoni</label>
                    <textarea value={testi.content} onChange={e => updateItem('testimonials', index, 'content', e.target.value)} rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  </div>
                </div>
              ))}

              {/* Editor untuk Paket Harga */}
              {activeTab === 'pricing' && data.pricing.map((plan: any, index: number) => (
                <div key={index} style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#fafafa', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Paket: {plan.name}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Nama Paket</label>
                      <input type="text" value={plan.name} onChange={e => updateItem('pricing', index, 'name', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Harga Setup (Rp)</label>
                      <input type="text" value={plan.priceUpfront} onChange={e => updateItem('pricing', index, 'priceUpfront', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Harga Bulanan (Rp)</label>
                      <input type="text" value={plan.priceMonthly} onChange={e => updateItem('pricing', index, 'priceMonthly', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Deskripsi Singkat</label>
                    <input type="text" value={plan.description} onChange={e => updateItem('pricing', index, 'description', e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }} />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Fitur-Fitur (Baris per baris)</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.features.map((feature: string, fIndex: number) => (
                        <input 
                          key={fIndex} 
                          type="text" 
                          value={feature} 
                          onChange={e => updateFeature(index, fIndex, e.target.value)}
                          style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.9375rem' }} 
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
    </div>
  );
}

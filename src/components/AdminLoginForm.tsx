"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminLoginFormProps {
  isConfigured: boolean;
}

export default function AdminLoginForm({ isConfigured }: AdminLoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "Gagal masuk ke dashboard.");
        return;
      }

      router.refresh();
    } catch {
      setError("Koneksi ke server gagal. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-bg)", padding: "1.5rem" }}>
      <form onSubmit={handleLogin} style={{ backgroundColor: "white", padding: "3rem", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", width: "100%", maxWidth: "420px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Login Admin</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem", fontSize: "0.9375rem" }}>Masukkan password admin untuk masuk ke CMS.</p>

        {!isConfigured && (
          <div style={{ marginBottom: "1.5rem", padding: "0.875rem 1rem", borderRadius: "var(--radius-md)", backgroundColor: "#fef2f2", color: "#991b1b", display: "flex", alignItems: "flex-start", gap: "0.75rem", textAlign: "left", fontSize: "0.875rem" }}>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: "1px" }} />
            <span>ADMIN_PASSWORD dan ADMIN_SESSION_SECRET belum dikonfigurasi.</span>
          </div>
        )}

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Masukkan password"
          disabled={!isConfigured || submitting}
          style={{ width: "100%", padding: "0.875rem 1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", marginBottom: "1rem", outline: "none" }}
        />

        {error && <p style={{ color: "#b91c1c", fontSize: "0.875rem", marginBottom: "1rem" }}>{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={!isConfigured || submitting} style={{ width: "100%", marginBottom: "1.5rem" }}>
          {submitting ? "Memproses..." : "Masuk Dashboard"}
        </button>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.875rem", textDecoration: "none", fontWeight: 500 }}>
          <ArrowLeft size={16} /> Kembali ke Halaman Utama
        </Link>
      </form>
    </div>
  );
}

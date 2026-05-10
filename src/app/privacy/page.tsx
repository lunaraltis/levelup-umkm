import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="heading" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Kebijakan Privasi</h1>
          
          <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Terakhir diperbarui: 10 Mei 2026</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Pengumpulan Data</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Kami di Level Up UMKM menghargai privasi Anda. Kami hanya mengumpulkan informasi yang diperlukan untuk memberikan layanan terbaik, seperti nama, alamat email, nomor telepon, dan data toko online Anda yang terintegrasi di platform kami.
            </p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Penggunaan Informasi</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Informasi yang kami kumpulkan digunakan untuk memproses pendaftaran, mengelola akun Anda, mengirimkan tagihan, serta memberikan dukungan teknis (customer support). Kami tidak akan pernah menjual data Anda kepada pihak ketiga.
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Keamanan Data</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Kami menggunakan teknologi enkripsi standar industri untuk melindungi data sensitif Anda. Namun, Anda juga bertanggung jawab untuk menjaga kerahasiaan kata sandi (password) akun Anda.
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Hak Pengguna</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Anda memiliki hak untuk meminta penghapusan seluruh data akun Anda secara permanen dari server kami. Permintaan ini dapat diajukan dengan menghubungi tim support kami melalui email.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

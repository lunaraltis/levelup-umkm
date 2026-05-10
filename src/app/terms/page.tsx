import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="heading" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Syarat & Ketentuan</h1>
          
          <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Terakhir diperbarui: 10 Mei 2026</p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>1. Pendahuluan</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Selamat datang di Level Up UMKM. Dengan mendaftar dan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan yang berlaku. Harap baca dengan saksama sebelum menggunakan platform kami.
            </p>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>2. Penggunaan Layanan</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Platform kami disediakan khusus untuk membantu UMKM (Usaha Mikro, Kecil, dan Menengah) dalam mendigitalisasi bisnis mereka. Pengguna tidak diperkenankan menggunakan layanan kami untuk aktivitas ilegal, penipuan, atau melanggar hak kekayaan intelektual pihak lain.
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>3. Pembayaran dan Langganan</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Layanan kami menggunakan sistem berlangganan (subscription). Tagihan akan dikirimkan secara otomatis setiap bulan sesuai dengan paket yang Anda pilih. Anda dapat membatalkan langganan kapan saja melalui dashboard pengaturan.
            </p>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: '2rem' }}>4. Perubahan Layanan</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Level Up UMKM berhak untuk memperbarui, mengubah, atau menghentikan fitur layanan kapan saja dengan memberikan pemberitahuan sebelumnya kepada pengguna.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

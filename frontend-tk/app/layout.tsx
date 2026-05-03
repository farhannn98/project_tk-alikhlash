import Navbar from "@/components/Navbar";
import "./globals.css";

export async function generateMetadata() {
  try {
    // Tambahkan timestamp biar browser nggak nge-cache link yang salah
    const timestamp = new Date().getTime();
    const res = await fetch(
      `http://127.0.0.1:8000/api/settings?v=${timestamp}`,
      {
        cache: "no-store",
      },
    );
    const settings = await res.json();

    const logoPath = settings.logo_sekolah
      ? `http://127.0.0.1:8000/storage/${settings.logo_sekolah}`
      : "/images/logo-tk.png";

    return {
      title: settings.nama_sekolah || "TK Al-Ikhlash",
      icons: {
        icon: [
          { url: logoPath, href: logoPath }, // Kasih href eksplisit
        ],
        apple: logoPath,
      },
    };
  } catch (e) {
    return { title: "TK Al-Ikhlash", icons: { icon: "/images/logo-tk.png" } };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white">
        <Navbar />

        <main className="min-h-screen">{children}</main>

        {/* Footer Bertema Islami & Child-Friendly */}
        <footer className="bg-emerald-800 text-emerald-50">
          {/* Ornamen Atas (Opsional: Memberikan kesan lembut) */}
          <div className="h-2 bg-yellow-400 w-full"></div>

          <div className="max-w-7xl mx-auto py-16 px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Kolom 1: Brand & Slogan */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {/* Dot Kuning untuk kesan ceria */}
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <h1 className="text-2xl font-bold tracking-tight font-serif">
                    TK Al-Ikhlash
                  </h1>
                </div>
                <p className="text-sm text-emerald-200/80 leading-relaxed max-w-sm">
                  Menanamkan nilai-nilai Islami, kemandirian, dan kreativitas
                  sejak dini untuk mencetak generasi Robbani yang cerdas dan
                  berakhlak mulia.
                </p>
              </div>

              {/* Kolom 2: Informasi Kontak & Alamat */}
              <div className="space-y-4">
                <p className="font-bold text-yellow-400 uppercase tracking-[0.2em] text-xs">
                  Hubungi Kami
                </p>
                <div className="text-sm space-y-3 text-emerald-100">
                  <p className="flex items-start gap-3">
                    <span className="opacity-60 italic">Alamat:</span>
                    <span>
                      Jl. Raya Jepara-Bangsri KM 07, Mlonggo, Kabupaten Jepara,
                      Jawa Tengah.
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="opacity-60 italic">Email:</span>
                    <span>info@tkalikhlasjepara.sch.id</span>
                  </p>
                </div>
              </div>

              {/* Kolom 3: Tautan Cepat / Sosial (Gaya Baru) */}
              <div className="space-y-4 md:text-right">
                <p className="font-bold text-yellow-400 uppercase tracking-[0.2em] text-xs">
                  Program Unggulan
                </p>
                <ul className="text-sm space-y-2 text-emerald-200/70">
                  <li>Tahfidz Juz Amma</li>
                  <li>Pembiasaan Adab Islami</li>
                  <li>Eksplorasi Kreativitas</li>
                </ul>
              </div>
            </div>

            {/* Garis Pembatas Bawah */}
            <div className="mt-16 pt-8 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-emerald-400">
              <p>© 2026 TK AL-IKHLASH JEPARA - ALL RIGHTS RESERVED</p>
              <p className="border border-emerald-700/50 px-4 py-1.5 rounded-full text-emerald-300 font-medium">
                Crafted for UTS — Farhan Ariyadi
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

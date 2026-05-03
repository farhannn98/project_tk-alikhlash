"use client";
import { useState, useEffect } from "react"; // Tambahkan ini
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  // 1. STATE UNTUK DATA DARI CMS
  const [settings, setSettings] = useState({
    hero_title: "Tempat Cahaya Kecil Mulai Bersinar.", // Default sebelum loading
    hero_subtitle:
      "Menghadirkan pendidikan Islam kelas dunia dengan lingkungan yang hangat.",
  });

  // 2. AMBIL DATA DARI LARAVEL
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        // Kita timpa state dengan data dari database
        if (data.hero_title) {
          setSettings({
            hero_title: data.hero_title,
            hero_subtitle: data.hero_subtitle,
          });
        }
      })
      .catch((err) => console.error("Gagal ambil data hero:", err));
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center pt-20 justify-center overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg_tk.png"
          alt="TK Al-Ikhlash School"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[1px]"></div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        {/* Badge Pendaftaran */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white mx-auto animate-pulse"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Pendaftaran 2026/2027 Dibuka
          </span>
        </motion.div>

        {/* JUDUL UTAMA (DINAMIS) */}
        <motion.h2
          key={settings.hero_title} // Key ini agar animasi jalan lagi saat data berubah
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-7xl font-serif text-white leading-tight tracking-tight whitespace-pre-line"
        >
          {/* Bree, teks ini sekarang otomatis dari Dashboard. 
             Kalau kamu mau ada efek warna hijau di tengah teks, 
             admin harus ngetik manual di dashboard, tapi ini 
             sudah kita buat dinamis total.
          */}
          {settings.hero_title}
        </motion.h2>

        {/* DESKRIPSI SINGKAT (DINAMIS) */}
        <motion.p
          key={settings.hero_subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-base text-stone-200 font-light max-w-2xl mx-auto leading-relaxed opacity-90"
        >
          {settings.hero_subtitle}
        </motion.p>

        {/* Tombol Aksi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <Link
            href="/pendaftaran"
            className="group flex items-center space-x-3 bg-green-600 hover:bg-white text-white hover:text-stone-900 px-8 py-4 rounded-full text-xs font-bold transition-all duration-500 shadow-xl"
          >
            <span className="tracking-widest">DAFTAR SEKARANG</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

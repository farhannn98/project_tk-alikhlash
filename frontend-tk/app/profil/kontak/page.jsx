"use client";
import React, { useState, useEffect } from "react"; // Tambahkan useState & useEffect
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function KontakPage() {
  // 1. STATE UNTUK DATA DINAMIS
  const [settings, setSettings] = useState({
    wa_number: "6281234567890",
    email_sekolah: "info@tkal-ikhlash.sch.id",
    alamat_sekolah: "Jl. Raya Jepara No. 123, Indonesia",
    jam_operasional: "Senin - Jumat: 07:30 - 12:00",
    google_maps: "",
  });

  // 2. FETCH DATA DARI API LARAVEL
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => console.error("Gagal memuat data kontak:", err));
  }, []);

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
              Pusat Informasi
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
              Hubungi{" "}
              <span className="italic font-light text-stone-400">Kami.</span>
            </h1>
            <p className="text-stone-500 max-w-xl font-light text-lg leading-relaxed">
              Kami siap mendengarkan dan membantu memberikan pendidikan terbaik
              bagi buah hati Anda di Jepara.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: INFO CARDS & FORM */}
          <div className="space-y-12">
            {/* CONTACT CARDS DINAMIS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactCard
                icon={<MessageCircle size={20} />}
                title="WhatsApp"
                detail={`+${settings.wa_number}`}
                link={`https://wa.me/${settings.wa_number}?text=Halo%20TK%20Al-Ikhlash...`}
              />
              <ContactCard
                icon={<Mail size={20} />}
                title="Email"
                detail={settings.email_sekolah}
                link={`mailto:${settings.email_sekolah}`}
              />
              <ContactCard
                icon={<MapPin size={20} />}
                title="Lokasi"
                detail={settings.alamat_sekolah}
                // Link ini bisa diarahkan ke versi web maps jika perlu
              />
              <ContactCard
                icon={<Clock size={20} />}
                title="Jam Operasional"
                detail={settings.jam_operasional}
              />
            </div>

            {/* MINIMALIST FORM */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-100"
            >
              <h3 className="text-2xl font-serif mb-8 text-stone-800">
                Kirim Pesan Cepat
              </h3>
              <form className="space-y-6">
                <div className="group border-b border-stone-200 focus-within:border-green-600 transition-colors py-2">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full bg-transparent outline-none text-sm font-light placeholder:text-stone-300"
                  />
                </div>
                <div className="group border-b border-stone-200 focus-within:border-green-600 transition-colors py-2">
                  <input
                    type="email"
                    placeholder="Email / WhatsApp"
                    className="w-full bg-transparent outline-none text-sm font-light placeholder:text-stone-300"
                  />
                </div>
                <div className="group border-b border-stone-200 focus-within:border-green-600 transition-colors py-2">
                  <textarea
                    rows="3"
                    placeholder="Apa yang ingin Anda tanyakan?"
                    className="w-full bg-transparent outline-none text-sm font-light placeholder:text-stone-300 resize-none"
                  ></textarea>
                </div>
                <button className="w-full bg-stone-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-all duration-500 flex items-center justify-center space-x-2 group">
                  <span>Kirim Sekarang</span>
                  <Send
                    size={14}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: MAPS DINAMIS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-[400px] lg:h-[750px] sticky top-32 rounded-[4rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-8 border-white"
          >
            {settings.google_maps ? (
              <iframe
                src={settings.google_maps}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 italic">
                Peta lokasi belum diatur.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}

// Komponen Kecil untuk Card agar Kode Rapi
function ContactCard({ icon, title, detail, link }) {
  const Content = (
    <div className="bg-white p-8 rounded-[2.5rem] border border-stone-50 hover:border-green-100 transition-all duration-500 group h-full">
      <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors mb-4">
        {icon}
      </div>
      <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-1">
        {title}
      </h4>
      <p className="text-stone-800 font-serif leading-snug">{detail}</p>
    </div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {Content}
    </a>
  ) : (
    <div className="block h-full">{Content}</div>
  );
}

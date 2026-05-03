"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Sparkles,
  Target,
  Clock,
  Star,
  Sun,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

const Profile = () => {
  // 1. Definisikan state settings
  const [settings, setSettings] = useState({
    nama_kepsek: "Memuat nama...",
    sambutan_kepsek_title: "Memuat judul...",
    sambutan_kepsek_body: "...",
    sambutan_kepsek_quote: "...",
    foto_kepsek: "",

    visi_sekolah: "Memuat visi...",
    misi_sekolah: "Memuat misi...",
    wa_number: "",
    email_sekolah: "",
    alamat_sekolah: "",
    jam_operasional: "",
    google_maps: "",
  });

  // 2. Ambil data dari API Laravel
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => console.error("Gagal ambil data profil:", err));
  }, []);
  return (
    <section
      id="profil"
      className="py-24 bg-gradient-to-b from-green-50 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* ========================================= */}
        {/* DEKORASI LATAR — Lingkaran Warna Cerah    */}
        {/* ========================================= */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-yellow-100 opacity-50" />
          <div className="absolute top-40 -right-10 w-56 h-56 rounded-full bg-green-100 opacity-60" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-teal-100 opacity-40" />
        </div>

        {/* ========================================= */}
        {/* 1. SAMBUTAN KEPALA SEKOLAH               */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          {/* Kolom Kiri — Foto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            {/* Bingkai Dekoratif Berwarna */}
            <div className="absolute -top-5 -left-5 w-20 h-20 border-t-4 border-l-4 border-yellow-400 rounded-tl-3xl z-10 opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-4 border-r-4 border-green-400 rounded-br-3xl z-10 opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Bayangan Warna di Belakang Foto */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[3rem] bg-yellow-200/60 -z-10" />

            {/* Container Foto */}
            <div className="aspect-[4/5] bg-green-50 rounded-[3rem] overflow-hidden border-4 border-white shadow-xl relative">
              <img
                // 2. PASTIKAN URL NYA LENGKAP: BACKEND_URL + STORAGE + PATH_FILE
                src={
                  settings.foto_kepsek
                    ? `http://127.0.0.1:8000/storage/${settings.foto_kepsek}`
                    : "/images/placeholder-kepsek.jpg"
                }
                alt="Kepala Sekolah"
                className="w-full h-full object-cover rounded-[2rem] shadow-2xl"
              />

              {/* Overlay Gradien */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent" />

              {/* Nama & Jabatan */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300 mb-1.5 font-bold">
                  Kepala Sekolah
                </p>
                <h4 className="text-xl md:text-2xl font-serif tracking-tight text-white">
                  {settings.nama_kepsek}
                </h4>
                <div className="w-10 h-1 bg-yellow-400 mt-3 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan — Teks Sambutan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Badge Label */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-2 py-2 rounded-full">
              <Sun className="w-3.5 h-3.5" />
              Sambutan Kepala Sekolah
            </div>

            <h3 className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight">
              {settings.sambutan_kepsek_title}
            </h3>

            {/* Garis Warna */}
            <div className="flex gap-2">
              <div className="h-1 w-12 rounded-full bg-green-400" />
              <div className="h-1 w-6 rounded-full bg-yellow-400" />
              <div className="h-1 w-3 rounded-full bg-teal-400" />
            </div>

            <div className="space-y-4 text-stone-500 font-light leading-relaxed text-base md:text-lg">
              {/* <p className="text-stone-700 font-medium">
                Assalamualaikum Wr. Wb.
              </p> */}
              {settings.sambutan_kepsek_body}
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2 bg-green-50/50 rounded-r-xl">
              <p className="italic text-stone-700 font-medium text-lg">
                "{settings.sambutan_kepsek_quote}"
              </p>
            </div>

            {/* Kutipan Inspiratif */}
            {/* <div className="bg-green-50 border-l-4 border-green-400 pl-5 py-4 rounded-r-2xl mt-2">
              <p className="text-green-800 font-serif italic text-lg leading-relaxed">
                "Setiap anak adalah bintang yang menunggu untuk bersinar."
              </p>
            </div> */}
          </motion.div>
        </div>

        {/* ========================================= */}
        {/* 2. VISI & MISI                           */}
        {/* ========================================= */}
        <div className="mb-32">
          {/* Header Seksi */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              <Star className="w-3.5 h-3.5" />
              Arah & Tujuan
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-stone-800 leading-tight">
              Membentuk Insan{" "}
              <span className="italic font-light text-stone-400">
                Cerdas & Berakhlak.
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box Visi — Hijau Cerah */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="md:col-span-2 bg-green-600 p-12 rounded-[2.5rem] text-white flex flex-col justify-between shadow-lg shadow-green-200 relative overflow-hidden"
            >
              {/* Lingkaran Dekoratif */}
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-green-500/40" />
              <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-green-700/30" />

              <Target className="w-10 h-10 text-yellow-300 mb-8 relative z-10" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-widest text-green-200 font-bold mb-3">
                  Visi Utama
                </p>
                <h4 className="text-xl md:text-2xl font-serif leading-relaxed text-white">
                  "{settings.visi_sekolah}"
                </h4>
              </div>
            </motion.div>

            {/* Box Misi — Kuning Lembut */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-yellow-50 p-10 rounded-[2.5rem] border-2 border-yellow-200 shadow-sm"
            >
              <div className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center mb-6">
                <Star className="w-5 h-5 text-yellow-800" />
              </div>
              <h4 className="text-xl font-serif text-stone-800 mb-6">
                Misi Kami
              </h4>
              <ul className="space-y-4">
                {settings.misi_sekolah?.split("\n").map((poin, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-green-500 shrink-0"
                      size={18}
                    />
                    <span className="text-stone-700 text-sm">{poin}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* ========================================= */}
        {/* 3. PROGRAM KELAS                         */}
        {/* ========================================= */}
        <div>
          {/* Header Seksi */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Program Belajar
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-stone-800 leading-tight">
              Pilih Program{" "}
              <span className="italic font-light text-stone-400">
                yang Tepat untuk Si Kecil.
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kelas Reguler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              className="p-10 rounded-[2.5rem] border-2 border-green-100 bg-white hover:shadow-xl hover:border-green-200 transition-all duration-500 relative overflow-hidden"
            >
              {/* Lingkaran Dekoratif Sudut */}
              <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-green-50" />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h4 className="text-2xl font-serif text-stone-800 mb-1">
                    Kelas Reguler
                  </h4>
                  <p className="text-xs text-stone-400 font-light tracking-widest uppercase">
                    Senin — Sabtu
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <Clock className="text-green-600 w-5 h-5" />
                </div>
              </div>

              {/* Waktu */}
              <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                <span className="text-3xl font-serif text-green-700 tracking-tight">
                  07.30 — 10.00
                </span>
              </div>

              <p className="text-sm text-stone-500 font-light leading-relaxed relative z-10">
                Program pendidikan standar yang fokus pada pengembangan motorik
                dan pengenalan adab dasar secara interaktif dan menyenangkan.
              </p>

              {/* Tag */}
              <div className="mt-6 flex gap-2 flex-wrap relative z-10">
                {["Motorik Halus", "Pengenalan Huruf", "Bermain Edukatif"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-[11px] bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </motion.div>

            {/* Kelas Full Day */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-10 rounded-[2.5rem] bg-teal-600 text-white hover:shadow-xl hover:shadow-teal-200 transition-all duration-500 relative overflow-hidden"
            >
              {/* Dekorasi Lingkaran */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-teal-500/40" />
              <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-teal-700/30" />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h4 className="text-2xl font-serif mb-1">Kelas Full Day</h4>
                  <p className="text-xs text-teal-200 font-light tracking-widest uppercase">
                    Pengalaman Lengkap
                  </p>
                </div>
                <div className="bg-yellow-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-yellow-900">
                  ★ Populer
                </div>
              </div>

              {/* Jadwal */}
              <div className="space-y-3 relative z-10 mb-8">
                {[
                  {
                    label: "Persiapan TPQ & Makan Siang",
                    time: "11.00 — 12.00",
                  },
                  {
                    label: "Sholat Dzuhur & Tidur Siang",
                    time: "12.00 — 14.00",
                  },
                  { label: "Sekolah TPQ & Penjemputan", time: "14.00 — 16.00" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-white/20 text-sm"
                  >
                    <span className="text-teal-100 font-light">
                      {item.label}
                    </span>
                    <span className="text-yellow-300 font-medium tabular-nums">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-teal-100 font-light leading-relaxed relative z-10">
                Layanan menyeluruh untuk membantu tumbuh kembang anak secara
                spiritual dan mandiri dalam pengawasan penuh guru.
              </p>

              {/* Tag */}
              <div className="mt-6 flex gap-2 flex-wrap relative z-10">
                {["TPQ", "Makan Siang", "Tidur Siang"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-teal-500/50 text-teal-100 font-medium px-3 py-1 rounded-full border border-teal-400/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="pt-10 flex justify-center">
            <Link
              href="/profil"
              className="group flex items-center space-x-3 text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-green-700 transition-all"
            >
              <span>Lihat Profil & Sejarah Lengkap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        {/* --- SECTION KONTAK CEPAT & MAPS --- */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* KOLOM KIRI: INFO TEKS */}
          <div className="bg-white border border-stone-100 p-10 rounded-[3rem] shadow-sm flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif text-stone-800 mb-2">
                  Hubungi Kami
                </h3>
                <p className="text-stone-500 text-sm">
                  Kami siap melayani informasi seputar pendaftaran dan kegiatan
                  sekolah.
                </p>
              </div>

              <div className="space-y-6">
                {/* Item: Jam Operasional */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Jam Operasional
                    </p>
                    <p className="text-stone-700 font-medium">
                      {settings.jam_operasional}
                    </p>
                  </div>
                </div>

                {/* Item: Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Email Resmi
                    </p>
                    <p className="text-stone-700 font-medium">
                      {settings.email_sekolah}
                    </p>
                  </div>
                </div>

                {/* Item: Alamat */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                      Lokasi
                    </p>
                    <p className="text-stone-700 font-medium leading-relaxed">
                      {settings.alamat_sekolah}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol WhatsApp Interaktif */}
            <a
              href={`https://wa.me/${settings.wa_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 group flex items-center justify-center gap-3 bg-green-600 hover:bg-stone-900 text-white py-5 rounded-2xl font-bold transition-all duration-500 shadow-xl shadow-green-900/10"
            >
              <MessageCircle size={20} />
              <span className="tracking-widest text-xs uppercase">
                Tanya Via WhatsApp
              </span>
            </a>
          </div>

          {/* KOLOM KANAN: GOOGLE MAPS */}
          <div className="h-[400px] lg:h-auto min-h-[400px] rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200 border-8 border-white relative">
            {settings.google_maps ? (
              <iframe
                src={settings.google_maps}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" // <--- Pastikan ini ada!
              ></iframe>
            ) : (
              <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-400 italic text-sm">
                Peta belum dikonfigurasi.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

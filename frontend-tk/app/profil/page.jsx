"use client";
import { useState, useEffect } from "react"; // Tambahkan ini
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Target,
  Flag,
  BookOpen,
  Info,
  Clock,
  Coffee,
  Users,
  ArrowLeft,
  Sparkles,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function ProfilPage() {
  // 1. STATE UNTUK DATA DARI CMS
  const [settings, setSettings] = useState({
    nama_sekolah: "TK Al-Ikhlash",
    nama_kepsek: "Sri Endang Tristyaningrum, S.Pd",
    foto_kepsek: "",
    sambutan_kepsek_title: "Mendidik dengan Hati dan Kebahagiaan.",
    sambutan_kepsek_body: "",
    visi_sekolah: "",
    misi_sekolah: "",
  });

  // 2. AMBIL DATA DARI API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => console.error("Gagal ambil data profil:", err));
  }, []);

  const jadwalFullDay = [
    {
      time: "07.30 — 10.00",
      act: "Kegiatan Belajar TK Reguler",
      icon: BookOpen,
    },
    { time: "10.00 — 10.30", act: "Masa Peralihan (Istirahat)", icon: Coffee },
    {
      time: "10.30 — 11.00",
      act: "Toilet Training (Kebersihan & Ganti Baju)",
      icon: Sparkles,
    },
    {
      time: "11.00 — 12.00",
      act: "Persiapan TPQ & Makan Siang Bersama",
      icon: Heart,
    },
    {
      time: "12.00 — 14.00",
      act: "Sholat Dzuhur Berjamaah & Tidur Siang",
      icon: Clock,
    },
    {
      time: "14.00 — 15.00",
      act: "Mandi & Persiapan Sekolah TPQ",
      icon: Sparkles,
    },
    { time: "15.00 — 16.00", act: "Kegiatan Belajar TPQ", icon: GraduationCap },
    { time: "16.00", act: "Waktu Penjemputan Pulang", icon: Users },
  ];

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* BACK BUTTON */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-stone-400 hover:text-green-600 transition-colors mb-12 group text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* HEADER SECTION (Nama Sekolah Dinamis) */}
        <header className="mb-20 space-y-4">
          <h2 className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
            Profil Institusi
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight tracking-tighter">
            Mengenal{" "}
            <span className="italic font-light text-stone-400">
              {settings.nama_sekolah}.
            </span>
          </h1>
        </header>

        {/* SAMBUTAN LENGKAP (Data dari CMS) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32 border-b border-stone-100 pb-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-[10px] border-white shadow-xl">
              <img
                src={
                  settings.foto_kepsek
                    ? `http://127.0.0.1:8000/storage/${settings.foto_kepsek}`
                    : "/images/ft_kepsek.jpeg"
                }
                className="w-full h-full object-cover"
                alt="Kepala Sekolah"
              />
            </div>
            <div className="mt-6 text-center lg:text-left">
              <h4 className="text-xl font-serif text-stone-800">
                {settings.nama_kepsek}
              </h4>
              <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
                Kepala Sekolah
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-8 text-stone-600 font-light leading-relaxed text-lg">
            <h3 className="text-3xl font-serif text-stone-900 italic">
              "{settings.sambutan_kepsek_title}"
            </h3>
            {/* Pakai whitespace-pre-line agar paragraf dari textarea rapi */}
            <div className="whitespace-pre-line space-y-4">
              {settings.sambutan_kepsek_body}
            </div>
          </div>
        </section>

        {/* VISI, MISI & TUJUAN */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VISI DINAMIS */}
          <div className="p-12 rounded-[3.5rem] bg-green-700 text-white space-y-6 shadow-xl shadow-green-900/10">
            <Target className="w-10 h-10 text-amber-300" />
            <h4 className="text-3xl font-serif">Visi Sekolah</h4>
            <p className="text-xl font-serif italic leading-relaxed text-green-50">
              "{settings.visi_sekolah}"
            </p>
          </div>

          {/* MISI DINAMIS */}
          <div className="space-y-8">
            <div className="p-10 rounded-[3.5rem] bg-white border border-green-50 shadow-sm">
              <h4 className="text-xl font-serif text-stone-800 mb-6 flex items-center space-x-3">
                <Flag className="w-5 h-5 text-green-600" />
                <span>Misi Strategis</span>
              </h4>
              <ul className="space-y-4">
                {/* Pakai trik split baris baru \n */}
                {settings.misi_sekolah?.split("\n").map((m, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-3 text-sm text-stone-500"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bagian Tujuan sementara masih statis sesuai code awal kamu */}
            <div className="p-10 rounded-[3.5rem] bg-amber-50 border border-amber-100 shadow-sm">
              <h4 className="text-xl font-serif text-stone-800 mb-6 flex items-center space-x-3">
                <Info className="w-5 h-5 text-amber-600" />
                <span>Tujuan Institusi</span>
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-sm text-stone-600">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0 mt-2"></div>
                  <span>
                    Menjadi Lembaga Pendidikan formal yang mampu mendidik dan
                    membantu anak dalam mengembangkan potensi.
                  </span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-stone-600">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0 mt-2"></div>
                  <span>
                    Menjadi fasilitator bagi anak dalam kegiatan belajar dan
                    bermain di TK.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROGRAM & JADWAL (Tetap Statis) */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-4xl font-serif text-stone-900">
              Program Pembelajaran
            </h3>
            <p className="text-stone-400 font-light max-w-lg mx-auto">
              Kami menyediakan dua pilihan layanan sesuai kebutuhan perkembangan
              putra-putri Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 p-10 bg-white rounded-[3.5rem] border border-stone-100 h-fit">
              <h4 className="text-2xl font-serif text-stone-800 mb-6">
                Kelas Reguler
              </h4>
              <div className="space-y-4">
                <div className="p-6 bg-stone-50 rounded-3xl">
                  <p className="text-[10px] uppercase font-bold text-stone-400 mb-1">
                    Jam Belajar
                  </p>
                  <p className="text-2xl font-serif text-green-700">
                    07.30 — 10.00
                  </p>
                </div>
                <p className="text-sm text-stone-500 font-light leading-relaxed">
                  Layanan pendidikan standar dengan durasi yang tepat untuk
                  pembentukan kemandirian awal anak.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 p-12 bg-white rounded-[3.5rem] border border-green-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-12">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-700">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-stone-800 leading-none">
                    Kelas Full Day
                  </h4>
                  <p className="text-xs text-stone-400 mt-2 uppercase tracking-widest">
                    Alur Kegiatan Harian
                  </p>
                </div>
              </div>

              <div className="space-y-0 relative">
                <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-green-100"></div>

                {jadwalFullDay.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative pl-16 pb-10 last:pb-0 group"
                  >
                    <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-4 border-white bg-green-500 group-hover:scale-125 transition-transform z-10 shadow-sm"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full w-fit">
                        {item.time}
                      </span>
                      <p className="text-stone-700 font-medium md:text-right flex-1">
                        {item.act}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function GraduationCap({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

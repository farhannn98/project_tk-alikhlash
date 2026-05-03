"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  UserPlus,
  Search,
  FileCheck,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function ProsesPendaftaran() {
  const steps = [
    {
      title: "Informasi & Observasi",
      desc: "Orang tua dapat mengunjungi sekolah atau melihat profil digital untuk memahami visi, misi, dan lingkungan belajar kami.",
      icon: <Search className="w-6 h-6" />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Registrasi Online",
      desc: "Mengisi formulir pendaftaran melalui portal pendaftaran online yang telah disediakan dengan data calon siswa yang valid.",
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Observasi Calon Siswa",
      desc: "Pertemuan hangat antara guru dan calon siswa untuk mengenal kesiapan serta karakter anak dalam suasana yang menyenangkan.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Verifikasi Berkas",
      desc: "Penyerahan dan pengecekan kelengkapan administrasi seperti Akte Kelahiran, Kartu Keluarga, dan dokumen pendukung lainnya.",
      icon: <FileCheck className="w-6 h-6" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Daftar Ulang",
      desc: "Penyelesaian administrasi akhir dan pengambilan perlengkapan sekolah. Selamat bergabung di keluarga besar TK Al-Ikhlash!",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* HEADER */}
        <header className="text-center mb-24 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]"
          >
            Admission Path
          </motion.h2>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif text-stone-900"
          >
            Proses{" "}
            <span className="italic font-light text-stone-400">
              Pendaftaran.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-stone-500 max-w-xl mx-auto font-light leading-relaxed"
          >
            Langkah-langkah sederhana untuk memulai perjalanan pendidikan buah
            hati Anda bersama kami.
          </motion.p>
        </header>

        {/* TIMELINE SECTION */}
        <div className="relative">
          {/* Garis Tengah (Hanya muncul di Desktop) */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-stone-200 -translate-x-1/2 z-0" />

          <div className="space-y-20 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Konten Teks */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4 md:px-12 text-left md:text-right">
                  <div
                    className={idx % 2 === 0 ? "md:text-left" : "md:text-right"}
                  >
                    <h3 className="text-xl font-serif text-stone-800 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-stone-500 font-light leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Ikon Tengah */}
                <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-16 h-16 rounded-full border-4 border-white shadow-xl flex items-center justify-center z-20 ${step.color}`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Placeholder Kosong buat Seimbangin Grid */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-5 p-5 rounded-[1rem]  text-white text-center space-y-8 relative overflow-hidden"
        >
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-green-900 to-green-600 px-8 py-14 text-center">
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="mb-4 font-serif text-3xl font-bold text-white">
                Siap Bergabung Bersama Kami?
              </h2>

              <p className="mx-auto mb-8 max-w-md text-sm font-light leading-relaxed text-green-200">
                Pendaftaran online tahun ajaran baru telah dibuka. Amankan kursi
                untuk putra-putri Anda sekarang.
              </p>

              <Link
                href="/pendaftaran"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-green-800 transition-all hover:bg-green-50 hover:scale-105 active:scale-95 group"
              >
                <span>Daftar Online</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
          {/* Aksen Dekorasi Bawah */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 blur-[100px] rounded-full" />
        </motion.section>
      </div>
    </main>
  );
}

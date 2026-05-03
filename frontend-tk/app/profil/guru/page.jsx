"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, GraduationCap, Heart } from "lucide-react";
import Link from "next/link";

export default function GuruPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOGIKA AMBIL DATA DARI LARAVEL KAMU
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/tenaga-pendidik",
        );
        const result = await response.json();

        // PERBAIKAN DI SINI:
        // Kita ambil "result.data" karena data gurunya ada di dalam kunci 'data'
        if (result.status === "sukses" && Array.isArray(result.data)) {
          setTeachers(result.data);
        } else {
          setTeachers([]); // Jaga-jaga kalau formatnya gak sesuai
        }

        setLoading(false);
      } catch (error) {
        console.error("Gagal nangkep data guru:", error);
        setTeachers([]);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* BACK BUTTON */}
        <Link
          href="/profil"
          className="inline-flex items-center space-x-2 text-stone-400 hover:text-green-600 transition-colors mb-12 group text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Profil</span>
        </Link>

        {/* HEADER */}
        <header className="mb-20 text-center space-y-4">
          <h2 className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
            Pilar Pendidikan
          </h2>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
            Tenaga{" "}
            <span className="italic font-light text-stone-400">
              Pendidik & Staf.
            </span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            Dipandu oleh para pengajar yang berdedikasi tinggi, penuh kasih
            sayang, dan berkomitmen dalam membentuk karakter buah hati Anda.
          </p>
        </header>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachers.map((guru, idx) => (
              <motion.div
                key={guru.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* CARD GURU */}
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-stone-200 border-4 border-white shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                  {/* 1. PERBAIKAN FOTO (Pakai URL Laravel + storage) */}
                  <img
                    src={
                      guru.foto
                        ? `http://localhost:8000/storage/${guru.foto}`
                        : "/images/placeholder-guru.jpg"
                    }
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={guru.nama_lengkap}
                    onError={(e) => {
                      e.target.src = "/images/placeholder-guru.jpg";
                    }}
                  />

                  {/* OVERLAY INFO GURU */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <p className="text-[14px] uppercase tracking-widest text-white text-center font-bold mb-1">
                      {/* Kolom jabatan sudah benar */}
                      {guru.jabatan || "Pengajar"}
                    </p>

                    {/* 2. PERBAIKAN NAMA (Ganti guru.nama jadi guru.nama_lengkap) */}
                    <h4 className="text-2xl text-center font-serif leading-tight">
                      {guru.nama_lengkap || "Nama Tidak Tersedia"}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && teachers.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-stone-100">
            <User className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <p className="text-stone-400 font-light">
              Data guru sedang dalam proses pembaruan.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

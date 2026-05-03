"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize2, Box } from "lucide-react";

export default function SaranaPage() {
  const [sarana, setSarana] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSarana = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sarana");
        const result = await response.json();
        // Ingat Bree, sesuaikan dengan struktur JSON Laravel kamu (result.data)
        setSarana(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Gagal ambil data sarana:", error);
        setLoading(false);
      }
    };
    fetchSarana();
  }, []);

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="text-center mb-24 space-y-4">
          <h2 className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px]">
            Lingkungan Belajar
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
            Sarana &{" "}
            <span className="italic font-light text-stone-400">Fasilitas.</span>
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            Menciptakan ruang yang aman, nyaman, dan inspiratif untuk mendukung
            tumbuh kembang kreatifitas buah hati Anda.
          </p>
        </header>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-stone-100 animate-pulse rounded-[2rem]"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sarana.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-stone-100 border-4 border-white shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <img
                    src={
                      item.foto
                        ? `http://localhost:8000/storage/${item.foto}`
                        : "/images/placeholder-sarana.jpg"
                    }
                    alt={item.nama_sarana}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* OVERLAY ON HOVER */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>

                {/* INFO TEXT */}
                <div className="mt-6 space-y-1">
                  <h3 className="text-xl font-serif text-stone-900">
                    {item.nama_sarana}
                  </h3>
                  <p className="text-sm text-stone-400 font-light line-clamp-2">
                    {item.deskripsi ||
                      "Fasilitas unggulan untuk kenyamanan belajar siswa."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && sarana.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-[3rem]">
            <Box className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <p className="text-stone-400 font-light italic">
              Data sarana belum tersedia.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

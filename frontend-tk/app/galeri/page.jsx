"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Maximize2,
  Loader2,
  Image as ImageIcon,
  PlayCircle,
} from "lucide-react";

// HELPER: Mengambil ID Video YouTube dari berbagai format URL
const getYoutubeID = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function GaleriPublik() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/galeri");
        const data = await res.json();
        const actualData = data.data || data;
        setGaleri(Array.isArray(actualData) ? actualData : []);
      } catch (error) {
        console.error("Gagal memuat galeri", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleri();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAFA]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-green-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="bg-[#FCFAFA] min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="max-w-4xl mx-auto text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-green-700 font-bold uppercase tracking-[0.4em] text-[10px] mb-4">
              Visual Journey
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight">
              Galeri{" "}
              <span className="italic font-light text-stone-400">
                Kegiatan.
              </span>
            </h1>
            <p className="text-stone-500 max-w-xl mx-auto font-light text-lg leading-relaxed mt-6">
              Merekam setiap senyum, kreativitas, dan momen berharga yang
              membentuk karakter buah hati Anda.
            </p>
          </motion.div>
        </header>

        {/* GRID GALERI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {galeri.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Media Card (Foto atau Video) */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-stone-100 border-4 border-white shadow-sm group-hover:shadow-2xl transition-all duration-700">
                  {item.tipe === "video" ? (
                    /* TAMPILAN VIDEO YOUTUBE */
                    <div className="w-full h-full relative">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getYoutubeID(item.link_video)}?rel=0&modestbranding=1`}
                        title={item.judul}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    /* TAMPILAN FOTO */
                    <>
                      {item.foto ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${item.foto}`}
                          alt={item.judul}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300">
                          <ImageIcon size={48} strokeWidth={1} />
                        </div>
                      )}

                      {/* Overlay Khusus Foto */}
                      <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[3px]">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"
                        >
                          <Maximize2 size={24} />
                        </motion.div>
                      </div>
                    </>
                  )}

                  {/* Label Tipe (Kanan Atas) */}
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-stone-800 shadow-sm flex items-center space-x-2">
                      {item.tipe === "video" ? (
                        <>
                          <PlayCircle size={12} className="text-red-600" />{" "}
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <Camera size={12} className="text-green-600" />{" "}
                          <span>Photo</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-8 text-center space-y-2 px-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-green-600 font-bold">
                    {item.tipe === "video"
                      ? "Cinematic Journey"
                      : "Capture Moment"}
                  </span>
                  <h3 className="text-2xl font-serif text-stone-800 tracking-tight transition-colors group-hover:text-green-700">
                    {item.judul}
                  </h3>
                  <div className="w-8 h-[1px] bg-stone-200 mx-auto transition-all group-hover:w-16 group-hover:bg-green-600" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {!loading && galeri.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border-2 border-dashed border-stone-100 rounded-[4rem] max-w-4xl mx-auto"
          >
            <Camera
              className="w-12 h-12 text-stone-200 mx-auto mb-6"
              strokeWidth={1}
            />
            <p className="text-stone-400 font-serif italic text-xl">
              Saat ini belum ada momen yang dibagikan.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

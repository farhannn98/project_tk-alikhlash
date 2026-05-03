"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Image as ImageIcon,
  Video,
  Loader2,
  Camera,
  Play,
  RefreshCw,
} from "lucide-react";

// Helper untuk mengambil ID Video YouTube (untuk preview thumbnail)
const getYoutubeID = (url) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function DashboardGaleri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // State untuk mode edit

  // State Form
  const [judul, setJudul] = useState("");
  const [tipe, setTipe] = useState("foto");
  const [file, setFile] = useState(null);
  const [linkVideo, setLinkVideo] = useState("");

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/galeri");
      const result = await res.json();
      const dataAsli = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result)
          ? result
          : [];
      setGaleri(dataAsli);
    } catch (error) {
      console.error("Gagal ambil data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk memicu mode Edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setJudul(item.judul);
    setTipe(item.tipe);
    setLinkVideo(item.link_video || "");
    setFile(null); // Reset input file saat edit dimulai
    // Scroll ke atas agar user tahu form berubah jadi edit
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form ke mode tambah
  const resetForm = () => {
    setEditingItem(null);
    setJudul("");
    setTipe("foto");
    setFile(null);
    setLinkVideo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!judul) return alert("Judul wajib diisi!");

    setUploading(true); // 1. Mulai Loading
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("tipe", tipe);

    // 1. Validasi untuk Tipe Foto
    if (tipe === "foto") {
      // Jika tidak sedang mengedit (tambah baru) dan file kosong, STOP.
      if (!editingItem && !file) {
        alert("Pilih fotonya terlebih dahulu");
        return;
      }

      // Jika ada file, baru masukkan ke formData
      if (file) formData.append("foto", file);
    }

    // 2. Validasi untuk Tipe Video
    else if (tipe === "video") {
      // Jika link video kosong atau cuma isi spasi, STOP.
      if (!linkVideo || linkVideo.trim() === "") {
        alert("Link videonya jangan lupa diisi");
        return;
      }

      formData.append("link_video", linkVideo);
    }

    if (editingItem) {
      formData.append("_method", "POST");
    }

    const url = editingItem
      ? `http://127.0.0.1:8000/api/galeri/${editingItem.id}`
      : "http://127.0.0.1:8000/api/galeri";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        // --- PERBAIKAN DI SINI ---
        setUploading(false); // 2. MATIKAN LOADING DULU

        // Simpan status edit di variabel sementara sebelum di-reset
        const isEdit = !!editingItem;

        resetForm(); // 3. Bersihkan form
        fetchGaleri(); // 4. Refresh data

        alert(
          isEdit
            ? "Galeri berhasil diperbarui."
            : "Sip! Galeri baru sudah ditambah.",
        );
      } else {
        setUploading(false);
        alert("Gagal menyimpan data, cek koneksi backend.");
      }
    } catch (error) {
      setUploading(false); // Matikan loading jika error
      alert("Terjadi kesalahan sistem.");
    }
    // Tidak perlu pakai finally kalau sudah di-handle di setiap kondisi
  };

  const handleHapus = async (id) => {
    if (!confirm("Hapus konten ini?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/api/galeri/${id}`, {
        method: "DELETE",
      });
      fetchGaleri();
    } catch (error) {
      alert("Gagal menghapus");
    }
  };

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-stone-800 tracking-tight">
            Manajemen Galeri
          </h1>
          <p className="text-sm text-stone-500 font-light italic">
            {editingItem
              ? `Sedang mengubah: ${editingItem.judul}`
              : "Elegan, rapi, dan terorganisir."}
          </p>
        </div>
      </div>

      {/* Form Tambah/Edit */}
      <div
        className={`bg-white border transition-all duration-500 ${editingItem ? "border-amber-200 ring-4 ring-amber-50" : "border-stone-200"} rounded-[2.5rem] p-10 shadow-sm`}
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Judul Kegiatan
            </label>
            <input
              type="text"
              value={judul || ""}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Contoh: Lomba Mewarnai"
              className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none transition-all font-serif"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Tipe Dokumentasi
            </label>
            <select
              value={tipe || "foto"}
              onChange={(e) => setTipe(e.target.value)}
              className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none font-serif cursor-pointer"
            >
              <option value="foto">Foto</option>
              <option value="video">Video (Youtube)</option>
            </select>
          </div>

          <div className="md:col-span-1 space-y-2">
            {tipe === "foto" ? (
              <>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  {editingItem
                    ? "Ganti File (Kosongkan jika tetap)"
                    : "Unggah File"}
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-xs text-stone-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:bg-stone-900 file:text-white hover:file:bg-black transition-all cursor-pointer"
                  />
                </div>
              </>
            ) : (
              <>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  URL YouTube
                </label>
                <input
                  type="text"
                  value={linkVideo || ""}
                  onChange={(e) => setLinkVideo(e.target.value)}
                  placeholder="Paste link video di sini..."
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-2 focus:ring-red-500/20 outline-none transition-all text-sm"
                />
              </>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={uploading}
              className={`${editingItem ? "bg-amber-600" : "bg-stone-900"} text-white py-4 px-8 rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95 disabled:opacity-50 w-full`}
            >
              {uploading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : editingItem ? (
                <RefreshCw size={18} />
              ) : (
                <Plus size={18} />
              )}
              <span>
                {uploading
                  ? "MEMPROSES..."
                  : editingItem
                    ? "SIMPAN PERUBAHAN"
                    : "TAMBAHKAN KE GALERI"}
              </span>
            </button>

            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-stone-200 text-stone-600 p-4 rounded-2xl hover:bg-stone-300 transition-all"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid Preview Konten */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-stone-200" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {galeri.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                {item.tipe === "video" ? (
                  <div className="w-full h-full relative">
                    <img
                      src={`https://img.youtube.com/vi/${getYoutubeID(item.link_video)}/0.jpg`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      alt={item.judul}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                        <Play size={20} fill="white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.foto}`}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                )}

                {/* Overlay Action (Edit & Hapus) */}
                <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4 backdrop-blur-[2px]">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-white text-stone-900 p-4 rounded-full hover:bg-stone-100 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-75"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6 text-center">
                <p className="text-[9px] uppercase tracking-[0.3em] text-green-600 font-bold mb-2">
                  {item.tipe === "foto" ? "STILL LIFE" : "MOTION PICTURE"}
                </p>
                <h3 className="font-serif text-stone-800 text-sm truncate px-2">
                  {item.judul}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

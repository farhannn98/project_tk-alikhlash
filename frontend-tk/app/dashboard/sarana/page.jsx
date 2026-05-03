"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Image as ImageIcon,
  Loader2,
  LayoutGrid,
  RefreshCcw,
} from "lucide-react";

export default function SaranaPage() {
  const [sarana, setSarana] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // State untuk mode edit

  // State untuk Form
  const [nama, setNama] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchSarana();
  }, []);

  const fetchSarana = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/sarana");
      const result = await res.json();

      const dataAsli = Array.isArray(result.data)
        ? result.data
        : Array.isArray(result)
          ? result
          : [];

      setSarana(dataAsli);
    } catch (error) {
      console.error("Gagal ambil data sarana", error);
      setSarana([]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi memicu mode edit
  const handleEdit = (item) => {
    setEditingItem(item);
    setNama(item.nama_sarana);
    setFile(null); // Reset input file
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset form ke semula
  const resetForm = () => {
    setEditingItem(null);
    setNama("");
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama) return alert("Nama sarana wajib diisi!");
    if (!editingItem && !file) return alert("Pilih foto dulu, bro!");

    setUploading(true);
    const formData = new FormData();
    formData.append("nama_sarana", nama);
    if (file) formData.append("foto", file);

    // Trick untuk Laravel Update dengan FormData
    if (editingItem) {
      formData.append("_method", "POST");
    }

    const url = editingItem
      ? `http://127.0.0.1:8000/api/sarana/${editingItem.id}`
      : "http://127.0.0.1:8000/api/sarana";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // Ambil respon mentah dari server
      const result = await res.json();

      if (res.ok) {
        setUploading(false);
        resetForm();
        fetchSarana();
        alert("Berhasil!");
      } else {
        setUploading(false);
        // Tampilkan pesan error spesifik dari Laravel (misal: validasi gagal)
        console.log("Detail Error:", result);
        alert("Gagal: " + (result.message || "Cek console F12"));
      }
    } catch (error) {
      setUploading(false);
      console.error("Kesalahan koneksi:", error);
      alert(
        "Terjadi kesalahan koneksi. Pastikan server Laravel (php artisan serve) menyala.",
      );
    }
  };

  const handleHapus = async (id) => {
    if (!confirm("Yakin mau hapus fasilitas ini?")) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/sarana/${id}`, {
        method: "DELETE",
      });
      fetchSarana();
    } catch (error) {
      alert("Gagal menghapus");
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">
            Sarana & Prasarana
          </h1>
          <p className="text-sm text-stone-500 font-sans">
            {editingItem
              ? `Mengedit: ${editingItem.nama_sarana}`
              : "Kelola fasilitas fisik sekolah untuk ditampilkan di galeri publik."}
          </p>
        </div>
        <LayoutGrid className="w-8 h-8 text-stone-300" />
      </div>

      {/* Form Tambah/Edit */}
      <div
        className={`bg-white border transition-all duration-500 ${editingItem ? "border-amber-200 ring-4 ring-amber-50" : "border-stone-200"} rounded-2xl p-6 shadow-sm`}
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">
          {editingItem ? "Perbarui Fasilitas" : "Tambah Fasilitas Baru"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-600">
              Nama Sarana
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Misal: Perpustakaan Mini"
              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-400 outline-none text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-600">
              {editingItem ? "Ganti Foto (Opsional)" : "Foto Fasilitas"}
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-xs text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={uploading}
              className={`flex-1 ${editingItem ? "bg-amber-600 hover:bg-amber-700" : "bg-stone-800 hover:bg-stone-900"} text-white py-2.5 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2`}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : editingItem ? (
                <RefreshCcw className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              <span>
                {uploading
                  ? "Sedang Memproses..."
                  : editingItem
                    ? "Simpan Perubahan"
                    : "Simpan Fasilitas"}
              </span>
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-stone-100 text-stone-500 p-2.5 rounded-xl hover:bg-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Display Grid Galeri */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sarana.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                {item.foto ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.foto}`}
                    alt={item.nama_sarana}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-stone-300" />
                  </div>
                )}

                {/* Overlay Action (Edit & Hapus) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-white text-stone-800 p-3 rounded-full hover:bg-stone-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleHapus(item.id)}
                    className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-stone-800 text-sm uppercase tracking-tight">
                  {item.nama_sarana}
                </h3>
              </div>
            </div>
          ))}

          {sarana.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-stone-200 rounded-3xl text-stone-400 font-sans">
              Belum ada sarana yang ditambahkan.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

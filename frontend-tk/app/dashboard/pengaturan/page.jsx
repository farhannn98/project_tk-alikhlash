"use client";
import { useState, useEffect } from "react";
import {
  Save,
  Globe,
  Home,
  Phone,
  MapPin,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  Target,
} from "lucide-react";

export default function PengaturanPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [file, setFile] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [fileKepsek, setFileKepsek] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/settings");
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.error("Gagal ambil setting", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData();
    // Masukkan semua data teks ke FormData
    Object.keys(settings).forEach((key) => {
      if (key !== "logo_sekolah") {
        formData.append(key, settings[key]);
      }
    });

    // Masukkan file logo jika ada yang baru
    if (file) {
      formData.append("logo_sekolah", file);
    }

    if (fileKepsek) {
      formData.append("foto_kepsek", fileKepsek);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/settings", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Pengaturan berhasil disimpan!");
        fetchSettings(); // Refresh data terbaru
      }
    } catch (error) {
      alert("Gagal menyimpan pengaturan.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-stone-300" size={40} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">
            Pengaturan Website
          </h1>
          <p className="text-sm text-stone-500 italic">
            Sesuaikan identitas dan konten utama sekolah.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={updating}
          className="bg-stone-900 text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-black transition-all shadow-lg disabled:opacity-50"
        >
          {updating ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          <span className="font-bold text-xs uppercase tracking-widest">
            Simpan Perubahan
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 1: IDENTITAS */}
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-stone-400">
            <Globe size={20} />
            <h2 className="text-xs font-bold uppercase tracking-tighter">
              Identitas & Branding
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Nama Sekolah
              </label>
              <input
                type="text"
                value={settings.nama_sekolah || ""}
                onChange={(e) => handleChange("nama_sekolah", e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-stone-200"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Logo Sekolah
              </label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center overflow-hidden border border-stone-200">
                  {settings.logo_sekolah ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${settings.logo_sekolah}`}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="text-stone-300" />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="text-xs text-stone-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: HERO BERANDA */}
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-stone-400">
            <Home size={20} />
            <h2 className="text-xs font-bold uppercase tracking-tighter">
              Konten Beranda (Hero)
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Judul Utama (Headline)
              </label>
              <input
                type="text"
                value={settings.hero_title || ""}
                onChange={(e) => handleChange("hero_title", e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-stone-200"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Sub-Judul
              </label>
              <textarea
                value={settings.hero_subtitle || ""}
                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                rows={3}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none focus:ring-2 focus:ring-stone-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* SECTION BARU: SAMBUTAN KEPALA SEKOLAH */}
        <div className="md:col-span-2 bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-stone-400">
            <Sparkles size={20} />
            <h2 className="text-xs font-bold uppercase tracking-tighter">
              Bagian Sambutan Kepala Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom Foto */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Foto Kepala Sekolah
              </label>
              <div className="aspect-[3/4] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 relative group">
                {settings.foto_kepsek && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${settings.foto_kepsek}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <input
                  type="file"
                  onChange={(e) => setFileKepsek(e.target.files[0])} // Buat state setFileKepsek baru
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-[9px] text-stone-400 italic text-center">
                Klik pada area foto untuk mengganti.
              </p>
            </div>

            {/* Kolom Teks */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={settings.nama_kepsek || ""}
                  onChange={(e) => handleChange("nama_kepsek", e.target.value)}
                  className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase">
                  Judul Sambutan
                </label>
                <input
                  type="text"
                  value={settings.sambutan_kepsek_title || ""}
                  onChange={(e) =>
                    handleChange("sambutan_kepsek_title", e.target.value)
                  }
                  className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase">
                  Isi Sambutan (Body)
                </label>
                <textarea
                  value={settings.sambutan_kepsek_body || ""}
                  onChange={(e) =>
                    handleChange("sambutan_kepsek_body", e.target.value)
                  }
                  rows={6}
                  className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase">
                  Quote / Kutipan
                </label>
                <input
                  type="text"
                  value={settings.sambutan_kepsek_quote || ""}
                  onChange={(e) =>
                    handleChange("sambutan_kepsek_quote", e.target.value)
                  }
                  className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none italic"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: VISI & MISI */}
        <div className="md:col-span-2 bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-stone-400">
            <Target size={20} />
            <h2 className="text-xs font-bold uppercase tracking-tighter">
              Visi & Misi Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Visi Utama
              </label>
              <textarea
                value={settings.visi_sekolah || ""}
                onChange={(e) => handleChange("visi_sekolah", e.target.value)}
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Misi Kami (Pisahkan dengan Enter)
              </label>
              <textarea
                value={settings.misi_sekolah || ""}
                onChange={(e) => handleChange("misi_sekolah", e.target.value)}
                rows={4}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none text-sm"
              />
              <p className="text-[9px] text-stone-400 mt-2 italic">
                *Satu baris akan menjadi satu poin checklist.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION: INFORMASI KONTAK & LOKASI */}
        <div className="md:col-span-2 bg-white border border-stone-100 p-8 rounded-[2rem] shadow-sm space-y-6">
          <div className="flex items-center gap-3 text-stone-400">
            <MapPin size={20} />
            <h2 className="text-xs font-bold uppercase tracking-tighter">
              Kontak & Lokasi Sekolah
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Baris 1: WA & Email */}
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={settings.wa_number || ""}
                onChange={(e) => handleChange("wa_number", e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Email Resmi
              </label>
              <input
                type="email"
                value={settings.email_sekolah || ""}
                onChange={(e) => handleChange("email_sekolah", e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
              />
            </div>

            {/* Baris 2: Jam Operasional & Alamat */}
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Jam Operasional
              </label>
              <input
                type="text"
                value={settings.jam_operasional || ""}
                onChange={(e) =>
                  handleChange("jam_operasional", e.target.value)
                }
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
                placeholder="Contoh: Senin - Jumat: 07:30 - 12:00"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Alamat Singkat
              </label>
              <input
                type="text"
                value={settings.alamat_sekolah || ""}
                onChange={(e) => handleChange("alamat_sekolah", e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none"
              />
            </div>

            {/* Baris 3: Google Maps (Full Width) */}
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase">
                Link Google Maps (Iframe SRC)
              </label>
              <textarea
                value={settings.google_maps || ""}
                onChange={(e) => handleChange("google_maps", e.target.value)}
                rows={3}
                className="w-full mt-1 px-4 py-3 bg-stone-50 border border-stone-100 rounded-xl outline-none text-[10px] font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

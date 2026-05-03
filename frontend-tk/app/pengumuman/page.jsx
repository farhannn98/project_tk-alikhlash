"use client";
import { useState } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  GraduationCap,
} from "lucide-react";

export default function PengumumanPage() {
  const [nik, setNik] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null); // Menyimpan data hasil kelulusan
  const [error, setError] = useState("");

  const handleCekKelulusan = async (e) => {
    e.preventDefault();
    if (!nik) return;

    setLoading(true);
    setHasil(null);
    setError("");

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/pendaftaran/cek-kelulusan/${nik}`,
      );
      const data = await res.json();

      if (res.ok && data.status === "sukses") {
        setHasil(data.data);
      } else {
        setError(data.pesan || "Nomor NIK tidak ditemukan.");
      }
    } catch (err) {
      setError("Terjadi kesalahan jaringan. Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col pt-24 items-center justify-center p-6 font-sans">
      {/* Container Utama */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-600 px-8 py-10 text-center text-white">
          <div className="bg-white/20 p-3 rounded-full w-fit mx-auto mb-4 backdrop-blur-sm">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2">
            Cek Kelulusan PPDB
          </h1>
          <p className="text-white text-sm">
            Masukkan Nomor NIK yang tertera pada Bukti Pendaftaran Online Anda.
          </p>
        </div>

        {/* Form Input */}
        <div className="p-8">
          <form onSubmit={handleCekKelulusan} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Nomor NIK
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Contoh: 23343412"
                  value={nik}
                  onChange={(e) => setNik(e.target.value.trim())}
                  className="w-full pl-12 pr-4 py-3 bg-stone-50 border text-black border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all uppercase"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-semibold transition-colors flex justify-center items-center"
            >
              {loading ? "Mencari Data..." : "Cek Hasil Sekarang"}
            </button>
          </form>

          {/* Pesan Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-bottom-2">
              {error}
            </div>
          )}

          {/* Kartu Hasil Kelulusan */}
          {hasil && (
            <div className="mt-8 animate-in zoom-in-95 duration-300">
              {/* Garis Pembatas */}
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-stone-200"></div>
                <span className="flex-shrink-0 mx-4 text-stone-400 text-xs font-semibold uppercase tracking-widest">
                  Hasil Anda
                </span>
                <div className="flex-grow border-t border-stone-200"></div>
              </div>

              {/* Tampilan Berdasarkan Status */}
              <div
                className={`p-6 rounded-2xl border ${
                  hasil.status === "Diterima"
                    ? "bg-green-50 border-green-200"
                    : hasil.status === "Ditolak"
                      ? "bg-red-50 border-red-200"
                      : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="text-center mb-4">
                  {hasil.status === "Diterima" ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2 drop-shadow-sm" />
                  ) : hasil.status === "Ditolak" ? (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-2 drop-shadow-sm" />
                  ) : (
                    <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-2 drop-shadow-sm" />
                  )}

                  <h2 className="text-2xl font-bold text-stone-800 uppercase">
                    {hasil.nama_anak}
                  </h2>
                  <p className="text-stone-500 text-sm mt-1">
                    No NIK: {hasil.nik}
                  </p>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center py-2 border-b border-black/5">
                    <span className="text-sm text-stone-600">
                      Jalur / Kelas
                    </span>
                    <span className="text-sm font-bold text-stone-800 uppercase">
                      {hasil.jalur_pendaftaran || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-stone-600">
                      Status Kelulusan
                    </span>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${
                        hasil.status === "Diterima"
                          ? "bg-green-200 text-green-800"
                          : hasil.status === "Ditolak"
                            ? "bg-red-200 text-red-800"
                            : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {hasil.status || "Menunggu"}
                    </span>
                  </div>
                </div>

                {/* Pesan Tambahan */}
                <p
                  className={`text-center text-xs mt-6 px-4 ${
                    hasil.status === "Diterima"
                      ? "text-green-700"
                      : hasil.status === "Ditolak"
                        ? "text-red-700"
                        : "text-yellow-700"
                  }`}
                >
                  {hasil.status === "Diterima"
                    ? "Selamat! Silakan hubungi panitia PPDB untuk informasi daftar ulang."
                    : hasil.status === "Ditolak"
                      ? "Mohon maaf, Anda belum lulus seleksi. Tetap semangat!"
                      : "Berkas Anda sedang dalam proses verifikasi oleh panitia. Silakan cek secara berkala."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Ringkas */}
      <p className="mt-8 text-stone-400 text-sm">
        Sistem Informasi PPDB © 2026
      </p>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import {
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  Search,
} from "lucide-react";

export default function ManajemenPengumumanPage() {
  const [pendaftar, setPendaftar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Diterima"); // Default lihat yang lulus
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPendaftaran();
  }, []);

  const fetchPendaftaran = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pendaftaran", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.status === "sukses") {
        const dataMentah = data.data;

        // Cek satu-satu kondisinya
        const cekDiterima = dataMentah.filter((i) => i.status === "Diterima");
        const cekMenunggu = dataMentah.filter(
          (i) => !i.status || i.status === "Menunggu",
        );

        setPendaftar(dataMentah);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  // 1. Perbaikan Logika Filter Data (Kebal terhadap NULL dan Spasi)
  const filteredData = pendaftar.filter((item) => {
    // Normalisasi: ambil status, kecilkan hurufnya. Kalau kosong jadi "menunggu"
    const normalizeStatus = item.status
      ? item.status.toLowerCase()
      : "menunggu";

    // Samakan dengan filterStatus (yang juga kita kecilkan hurufnya)
    const matchStatus = normalizeStatus === filterStatus.toLowerCase();

    const matchSearch =
      item.nama_anak.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.no_registrasi &&
        item.no_registrasi.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchStatus && matchSearch;
  });

  // 2. Perbaikan Hitung Statistik (Kebal terhadap NULL dan Spasi)
  const stats = {
    total: pendaftar.length,
    // Kita pakai .toLowerCase() agar tidak peduli huruf besar atau kecil
    diterima: pendaftar.filter((i) => i.status?.toLowerCase() === "diterima")
      .length,
    ditolak: pendaftar.filter((i) => i.status?.toLowerCase() === "ditolak")
      .length,
    menunggu: pendaftar.filter(
      (i) =>
        !i.status ||
        i.status.trim() === "" ||
        i.status.toLowerCase() === "menunggu",
    ).length,
  };

  if (loading)
    return (
      <div className="p-10 text-center text-stone-500">
        Memuat manajemen pengumuman...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header & Aksi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">
            Manajemen Hasil Seleksi
          </h1>
          <p className="text-sm text-stone-500">
            Pantau dan cetak laporan kelulusan siswa.
          </p>
        </div>
        {/* <button
          onClick={() => window.print()}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-all text-sm font-medium shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Laporan</span>
        </button> */}
      </div>

      {/* Grid Statistik Cepat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-lg text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
              Lulus / Diterima
            </p>
            <p className="text-2xl font-bold text-stone-800">
              {stats.diterima}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-lg text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
              Tidak Lulus
            </p>
            <p className="text-2xl font-bold text-stone-800">{stats.ditolak}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
              Menunggu
            </p>
            <p className="text-2xl font-bold text-stone-800">
              {stats.menunggu}
            </p>
          </div>
        </div>
      </div>

      {/* Kontrol Tabel */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-stone-50/50">
          {/* Filter Status */}
          <div className="flex bg-stone-200 p-1 rounded-lg w-full md:w-fit">
            {["Diterima", "Ditolak", "Menunggu"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all flex-1 md:flex-none ${
                  filterStatus === s
                    ? "bg-white text-stone-800 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Cari Nama/No Reg */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Cari nama atau no reg..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold uppercase text-[10px] tracking-widest">
                <th className="px-6 py-4">No. Registrasi</th>
                <th className="px-6 py-4">Nama Lengkap</th>
                <th className="px-6 py-4">Jalur / Jenis</th>
                <th className="px-6 py-4 text-center">Status Akhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-green-600 font-bold">
                      {item.no_registrasi || "-"}
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-800 uppercase">
                      {item.nama_anak}
                    </td>
                    <td className="px-6 py-4 text-stone-500 uppercase text-xs">
                      {item.jenis_pendaftaran || item.jalur_pendaftaran || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          item.status === "Diterima"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Ditolak"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status || "Menunggu"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-10 text-center text-stone-400 italic bg-stone-50/30"
                  >
                    Tidak ada data pendaftar dengan status "{filterStatus}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informasi Tambahan */}
      <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-start space-x-3">
        <ClipboardList className="w-5 h-5 text-green-600 mt-0.5" />
        <div className="text-xs text-green-800 leading-relaxed">
          <strong>Tips Admin:</strong> Status yang Anda lihat di sini sinkron
          dengan apa yang dilihat wali murid di halaman publik. Pastikan semua
          data sudah diverifikasi dengan benar sebelum membagikan link
          pengumuman.
        </div>
      </div>
    </div>
  );
}

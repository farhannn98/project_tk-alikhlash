"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Eye,
  CheckCircle,
  User,
  Activity,
  MapPin,
  XCircle,
  FileText,
  X,
  Printer,
} from "lucide-react";

function DetailItem({ label, value }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest text-stone-400">
        {label}
      </p>
      <p className="text-sm font-medium text-stone-800 border-b border-stone-50 pb-1">
        {value || "-"}
      </p>
    </div>
  );
}

export default function DataPendaftaranPage() {
  const [pendaftar, setPendaftar] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchUserData();
    fetchPendaftaran();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
      }
    } catch (error) {
      console.error("Gagal mengambil role user", error);
    }
  };

  const fetchPendaftaran = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pendaftaran", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.status === "sukses") {
        setPendaftar(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data pendaftaran", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCetakSemuaPDF = () => {
    window.open("http://127.0.0.1:8000/api/pendaftaran/cetak-semua", "_blank");
  };

  const handleCetakPDF = (noReg) => {
    window.open(
      `http://127.0.0.1:8000/api/pendaftaran/cetak/${noReg}`,
      "_blank",
    );
  };

  const handleUpdateStatus = async (id, statusBaru) => {
    if (!confirm(`Yakin ingin mengubah status menjadi ${statusBaru}?`)) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/pendaftaran/${id}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: statusBaru }),
        },
      );

      if (res.ok) {
        alert("Status berhasil diperbarui");
        fetchPendaftaran();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error update status", error);
    }
  };

  const openModal = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  const filteredData = pendaftar.filter((item) =>
    item.nama_anak.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="p-10 text-center text-stone-500 italic">
        Memuat data...
      </div>
    );

  return (
    <div className="space-y-6 relative animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">
            Data Pendaftaran PPDB
          </h1>
          <p className="text-sm text-stone-500 font-medium">
            Mode Akses:{" "}
            <span className="text-orange-600 capitalize">{userRole}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleCetakSemuaPDF}
            className="flex items-center space-x-2 bg-stone-800 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Rekap Laporan</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-xs font-bold text-stone-600 uppercase">
                <th className="px-6 py-4">Anak & Jalur</th>
                <th className="px-6 py-4">Tgl Daftar</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-400 uppercase tracking-widest">
                  L/P
                </th>
                {/* Kolom Baru 2 */}
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Kategori
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map(
                (item) => (
                  console.log("ISI DATA PER SISWA:", item),
                  (
                    <tr
                      key={item.id}
                      className="hover:bg-stone-50 transition-colors"
                    >
                      {/* 1. KOLOM ANAK & JALUR */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-stone-800 uppercase text-sm">
                          {item.nama_anak}
                        </div>
                        <div className="text-[10px] text-orange-600 font-bold uppercase tracking-tight">
                          {item.jenis_pendaftaran || "REGULER"}
                        </div>
                      </td>

                      {/* 2. KOLOM TGL DAFTAR (Tadi tertukar dengan L/P) */}
                      <td className="px-6 py-4 text-sm text-stone-500 font-medium">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>

                      {/* 3. KOLOM L/P (Tadi tertukar dengan Kategori) */}
                      {/* --- KOLOM L/P --- */}
                      <td className="px-6 py-4 text-sm text-stone-600 font-medium">
                        {item.jenis_kelamin &&
                        item.jenis_kelamin
                          .toString()
                          .toUpperCase()
                          .includes("LAKI")
                          ? "Laki-laki"
                          : "Perempuan"}
                      </td>

                      {/* --- KOLOM KATEGORI --- */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                            item.kategori_siswa &&
                            item.kategori_siswa.toLowerCase() === "pindahan"
                              ? "bg-purple-50 text-purple-600 border-purple-100"
                              : "bg-blue-50 text-blue-600 border-blue-100"
                          }`}
                        >
                          {item.kategori_siswa || "Baru"}
                        </span>
                      </td>

                      {/* 5. KOLOM STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
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

                      {/* 6. KOLOM AKSI */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            onClick={() => openModal(item)}
                            className="flex items-center space-x-1 px-3 py-1.5 bg-stone-100 text-stone-600 rounded-md text-xs font-bold hover:bg-stone-200"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Detail</span>
                          </button>

                          {userRole === "admin" && (
                            <div className="flex items-center space-x-1 border-l pl-2 border-stone-200">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(item.id, "Diterima")
                                }
                                className="p-1.5 text-stone-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(item.id, "Ditolak")
                                }
                                className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 mt-18 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
            {/* Header Modal */}
            <div className="p-4 border-b border-stone-100 flex justify-between pt-4 items-start bg-stone-50/50">
              <div className="flex gap-6 items-center">
                <div className="w-20 h-20 bg-stone-200 rounded-2xl overflow-hidden border-4 border-white shadow-md">
                  {selectedData.pas_foto ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/${selectedData.pas_foto}`}
                      alt="Foto Siswa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs text-center p-2">
                      Tanpa Foto
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-serif text-stone-800 uppercase tracking-tight">
                    {selectedData.nama_anak}
                  </h2>
                  <p className="text-stone-500 font-medium tracking-widest text-xs uppercase">
                    {selectedData.no_registrasi}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase">
                      {selectedData.jenis_pendaftaran}
                    </span>
                    <span className="px-3 py-1 bg-stone-800 text-white text-[10px] font-bold rounded-full uppercase">
                      {selectedData.kategori_siswa}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white rounded-full transition-colors text-stone-400 hover:text-stone-800 shadow-sm"
              >
                <XCircle className="w-8 h-8" />
              </button>
            </div>

            {/* Body Modal (Scrollable) */}
            <div className="p-8 overflow-y-auto space-y-10">
              {/* Kategori 1: Identitas & Kelahiran */}
              <section>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <User className="w-4 h-4" /> Informasi Identitas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                  <DetailItem label="NIK Anak" value={selectedData.nik_anak} />
                  <DetailItem label="No. Akta" value={selectedData.no_akta} />
                  <DetailItem
                    label="Jenis Kelamin"
                    value={selectedData.jenis_kelamin}
                  />
                  <DetailItem
                    label="Kewarganegaraan"
                    value={selectedData.kewarganegaraan}
                  />
                  <DetailItem
                    label="Tempat Lahir"
                    value={selectedData.tempat_lahir}
                  />
                  <DetailItem
                    label="Tanggal Lahir"
                    value={selectedData.tanggal_lahir}
                  />
                  <DetailItem label="Anak Ke-" value={selectedData.anak_ke} />
                  <DetailItem label="Bahasa" value={selectedData.bahasa} />
                </div>
              </section>

              {/* Kategori 2: Data Fisik & Kesehatan */}
              <section className="p-6 bg-stone-50 rounded-[2rem] border border-stone-100">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Kondisi Fisik
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">
                      Berat Badan
                    </p>
                    <p className="text-xl font-serif text-stone-800">
                      {selectedData.berat_badan}{" "}
                      <span className="text-xs">kg</span>
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">
                      Tinggi Badan
                    </p>
                    <p className="text-xl font-serif text-stone-800">
                      {selectedData.tinggi_badan}{" "}
                      <span className="text-xs">cm</span>
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">
                      Lingkar Kepala
                    </p>
                    <p className="text-xl font-serif text-stone-800">
                      {selectedData.lingkar_kepala}{" "}
                      <span className="text-xs">cm</span>
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                    <p className="text-[10px] text-stone-400 uppercase font-bold mb-1">
                      Jarak Rumah
                    </p>
                    <p className="text-xl font-serif text-stone-800">
                      {selectedData.jarak_rumah}{" "}
                      <span className="text-xs">km</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* Kategori 3: Kontak & Minat */}
              <section>
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Kontak & Minat
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <DetailItem label="Email" value={selectedData.email} />
                    <DetailItem label="Alamat" value={selectedData.alamat} />
                  </div>
                  <div className="space-y-4">
                    <DetailItem label="Hobi" value={selectedData.hobi} />
                    <DetailItem
                      label="Cita-cita"
                      value={selectedData.cita_cita}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Modal */}
            <div className="p-6 border-t border-stone-100 bg-white flex justify-between">
              <button
                onClick={closeModal}
                className="px-6 py-3 text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-800 transition-colors"
              >
                Tutup
              </button>
              <button
                // Gunakan no_registrasi karena route Laravel-mu mintanya {no_reg}
                onClick={() =>
                  window.open(
                    `http://127.0.0.1:8000/api/pendaftaran/cetak/${selectedData.no_registrasi}`,
                    "_blank",
                  )
                }
                className="px-8 py-3 bg-stone-800 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-stone-200 flex items-center gap-2 hover:bg-stone-700 transition-all"
              >
                <Printer className="w-4 h-4" />
                Cetak Form PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

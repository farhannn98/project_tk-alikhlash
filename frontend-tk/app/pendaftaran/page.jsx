"use client";
import { useState } from "react";
import Link from "next/link";

export default function PendaftaranPage() {
  // State untuk data teks
  const [formData, setFormData] = useState({
    jenis_pendaftaran: "Reguler",
    nama_anak: "",
    jenis_kelamin: "LAKI-LAKI",
    nik_anak: "",
    alamat: "",
    kategori_siswa: "baru",
    tempat_lahir: "",
    tanggal_lahir: "",
    anak_ke: "",
    no_akta: "",
    bahasa: "INDONESIA",
    berat_badan: "",
    tinggi_badan: "",
    lingkar_kepala: "",
    jarak_rumah: "",
    hobi: "",
    cita_cita: "",
    kewarganegaraan: "WNI",
    email: "",
    tanggal_pendaftaran: new Date().toISOString().split("T")[0], // Set otomatis hari ini
  });

  // State khusus untuk file foto
  const [pasFoto, setPasFoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [noRegistrasi, setNoRegistrasi] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPasFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // BUNGKUS DATA BESERTA FOTO MENGGUNAKAN FORMDATA
    const submitData = new FormData();
    for (const key in formData) {
      submitData.append(key, formData[key]);
    }
    if (pasFoto) {
      submitData.append("pas_foto", pasFoto);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pendaftaran", {
        method: "POST",
        headers: {
          Accept: "application/json",
          // Jangan set Content-Type, biarkan browser yang mengatur otomatis untuk FormData
        },
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        setBerhasil(true);
        setNoRegistrasi(result.no_registrasi);
      } else {
        alert(
          "Terjadi kesalahan: Cek kembali isian Anda. Pastikan foto berekstensi JPG/JPEG dan maksimal 2MB.",
        );
      }
    } catch (error) {
      console.error(error);
      alert("Gagal terhubung ke server. Pastikan server Laravel menyala.");
    } finally {
      setLoading(false);
    }
  };

  // Tampilan jika pendaftaran berhasil
  if (berhasil) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            Formulir pendaftaran juga akan dikirim ke email Anda.
          </p>
          <div className="bg-green-50 p-6 rounded-2xl border  border-green-100 mb-8">
            <p className="text-xs text-green-600 uppercase tracking-widest mb-2 font-bold">
              Nomor Registrasi Anda
            </p>
            <p className="text-3xl font-mono font-bold text-green-600">
              {noRegistrasi}
            </p>
          </div>
          <button
            onClick={() =>
              window.open(
                `http://127.0.0.1:8000/api/pendaftaran/cetak/${noRegistrasi}`,
                "_blank",
              )
            }
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-md mb-4"
          >
            Cetak Bukti Pendaftaran (PDF)
          </button>
          <Link
            href="/"
            className="text-slate-500 hover:text-green-600 text-sm font-semibold transition-colors"
          >
            Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    );
  }

  // Tampilan Form Pendaftaran Utama
  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Form */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 py-10 px-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Formulir Pendaftaran
          </h2>
          <p className="text-green-100 font-medium tracking-wide">
            TK AL-IKHLASH JEPARA
          </p>
        </div>

        {/* Form Isi */}
        <form onSubmit={handleSubmit} className="p-10 space-y-12">
          {/* BAGIAN 1: INFO PENDAFTARAN */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">
              1. Informasi Pendaftaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jenis Pendaftaran <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenis_pendaftaran"
                  value={formData.jenis_pendaftaran}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Reguler">Reguler</option>
                  <option value="Fullday">Fullday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Pendaftaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_pendaftaran"
                  required
                  value={formData.tanggal_pendaftaran}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-200 text-slate-600 outline-none"
                  readOnly
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat Email Aktif <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email untuk menerima bukti pendaftaran"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN 2: IDENTITAS ANAK */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">
              2. Identitas Peserta Didik
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Calon Peserta Didik{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama_anak"
                  required
                  value={formData.nama_anak}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="LAKI-LAKI">LAKI-LAKI</option>
                  <option value="PEREMPUAN">PEREMPUAN</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-stone-700 uppercase tracking-widest">
                  Kategori Pendaftaran
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Pilihan Murid Baru */}
                  <label
                    className={`cursor-pointer p-4 border-2 rounded-2xl transition-all flex flex-col gap-2 ${formData.kategori_siswa === "baru" ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-200"}`}
                  >
                    <input
                      type="radio"
                      name="kategori_siswa"
                      value="baru"
                      className="hidden"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kategori_siswa: e.target.value,
                        })
                      }
                    />
                    <span className="font-bold text-stone-800">Murid Baru</span>
                    <span className="text-xs text-stone-500 font-light">
                      Pendaftaran untuk siswa baru tahun ajaran ini.
                    </span>
                  </label>

                  {/* Pilihan Pindahan */}
                  <label
                    className={`cursor-pointer p-4 border-2 rounded-2xl transition-all flex flex-col gap-2 ${formData.kategori_siswa === "pindahan" ? "border-stone-800 bg-stone-50" : "border-stone-100 hover:border-stone-200"}`}
                  >
                    <input
                      type="radio"
                      name="kategori_siswa"
                      value="pindahan"
                      className="hidden"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kategori_siswa: e.target.value,
                        })
                      }
                    />
                    <span className="font-bold text-stone-800">Pindahan</span>
                    <span className="text-xs text-stone-500 font-light">
                      Transfer siswa dari sekolah lain (mutasi).
                    </span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  NIK Calon Peserta Didik{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="nik_anak"
                  required
                  value={formData.nik_anak}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tempat_lahir"
                  required
                  value={formData.tempat_lahir}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  required
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Anak Ke Berapa <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="anak_ke"
                  required
                  value={formData.anak_ke}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor Akta Kelahiran <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="no_akta"
                  required
                  value={formData.no_akta}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Kewarganegaraan <span className="text-red-500">*</span>
                </label>
                <select
                  name="kewarganegaraan"
                  value={formData.kewarganegaraan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="WNI">WNI (INDONESIA)</option>
                  <option value="WNA">WNA (ASING)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Bahasa Sehari-hari <span className="text-red-500">*</span>
                </label>
                <select
                  name="bahasa"
                  value={formData.bahasa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="INDONESIA">INDONESIA</option>
                  <option value="INGGRIS">INGGRIS</option>
                  <option value="JAWA">JAWA</option>
                  <option value="LAINNYA">LAINNYA</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Alamat Rumah <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="alamat"
                  rows="2"
                  required
                  value={formData.alamat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* BAGIAN 3: FISIK & LAINNYA */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">
              3. Data Fisik & Profil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Berat Badan (Kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="berat_badan"
                  required
                  value={formData.berat_badan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tinggi Badan (Cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="tinggi_badan"
                  required
                  value={formData.tinggi_badan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Lingkar Kepala (Cm) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="lingkar_kepala"
                  required
                  value={formData.lingkar_kepala}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Jarak Rumah (Km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="jarak_rumah"
                  required
                  value={formData.jarak_rumah}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Hobi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hobi"
                  required
                  value={formData.hobi}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Cita-Cita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cita_cita"
                  required
                  value={formData.cita_cita}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* BAGIAN 4: BERKAS FOTO */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6">
              4. Berkas Persyaratan
            </h3>
            <div className="border-2 border-dashed border-slate-300 p-6 rounded-xl bg-slate-50 text-center">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pas Foto Calon Peserta Didik (JPG/JPEG){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg"
                required
                onChange={handleFileChange}
                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-70 transform hover:-translate-y-1 text-lg"
            >
              {loading
                ? "Mengirim Data & Foto..."
                : "Kirim Formulir Pendaftaran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

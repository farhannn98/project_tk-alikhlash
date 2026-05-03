"use client";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, User as UserIcon } from "lucide-react";

export default function TenagaPendidikPage() {
  const [guru, setGuru] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

  // State untuk Modal Form (Tambah/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    jabatan: "",
    nip: "",
    foto: null,
  });

  // Load Data saat halaman dibuka
  useEffect(() => {
    fetchUserData();
    fetchGuruData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
      }
    } catch (error) {
      console.error("Gagal mengambil role user", error);
    }
  };

  const fetchGuruData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/tenaga-pendidik");
      const data = await res.json();
      if (data.status === "sukses") {
        setGuru(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data guru", error);
    } finally {
      setLoading(false);
    }
  };

  // --- FUNGSI CRUD ---
  const handleOpenModal = (dataGuru = null) => {
    if (dataGuru) {
      setEditId(dataGuru.id);
      setFormData({
        nama_lengkap: dataGuru.nama_lengkap,
        jabatan: dataGuru.jabatan,
        nip: dataGuru.nip || "",
        foto: null, // Kosongkan, kecuali user ingin ganti
      });
    } else {
      setEditId(null);
      setFormData({ nama_lengkap: "", jabatan: "", nip: "", foto: null });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus data guru ini?")) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/tenaga-pendidik/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) fetchGuruData();
    } catch (error) {
      console.error("Gagal menghapus", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nama_lengkap", formData.nama_lengkap);
    data.append("jabatan", formData.jabatan);
    data.append("nip", formData.nip);
    if (formData.foto) data.append("foto", formData.foto);

    try {
      let url = "http://127.0.0.1:8000/api/tenaga-pendidik";
      let options = { method: "POST", body: data }; // Default untuk tambah

      // Jika Edit, arahkan ke URL update
      if (editId) {
        url = `http://127.0.0.1:8000/api/tenaga-pendidik/${editId}`;
        // Di Laravel, kirim file via method spoofing kalau pakai POST
        data.append("_method", "POST");
      }

      const res = await fetch(url, options);
      if (res.ok) {
        setIsModalOpen(false);
        fetchGuruData();
      } else {
        alert("Gagal menyimpan data!");
      }
    } catch (error) {
      console.error("Error submit", error);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10 text-stone-500">Memuat data...</div>
    );

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-serif text-stone-800">
            Tenaga Pendidik
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Kelola informasi guru dan staf sekolah.
          </p>
        </div>

        {/* Tombol Tambah HANYA muncul untuk Admin */}
        {userRole === "admin" && (
          <button
            onClick={() => handleOpenModal()}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </button>
        )}
      </div>

      {/* Grid Data Guru */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {guru.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative"
          >
            <div className="aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden">
              {item.foto ? (
                <img
                  src={`http://127.0.0.1:8000/storage/${item.foto}`}
                  alt={item.nama_lengkap}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-16 h-16 text-stone-300" />
              )}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-stone-800 text-lg line-clamp-1">
                {item.nama_lengkap}
              </h3>
              <p className="text-green-600 text-xs font-semibold uppercase tracking-wider mt-1">
                {item.jabatan}
              </p>
              <p className="text-stone-500 text-xs mt-2">
                NIP: {item.nip || "-"}
              </p>
            </div>

            {/* Opsi Edit/Hapus HANYA muncul untuk Admin saat di-hover */}
            {userRole === "admin" && (
              <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 bg-white/90 text-stone-700 rounded-md hover:text-green-600 shadow-sm backdrop-blur-sm"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white/90 text-red-500 rounded-md hover:text-red-700 shadow-sm backdrop-blur-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-xl font-serif text-stone-800">
                {editId ? "Edit" : "Tambah"} Tenaga Pendidik
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama_lengkap}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_lengkap: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
                    Jabatan
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jabatan}
                    onChange={(e) =>
                      setFormData({ ...formData, jabatan: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
                    NIP (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) =>
                      setFormData({ ...formData, nip: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
                  Foto (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, foto: e.target.files[0] })
                  }
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-stone-500 text-sm font-semibold hover:text-stone-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  UserPlus,
  Loader2,
  ShieldCheck,
  Mail,
  User,
} from "lucide-react";

export default function KelolaUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // State Form dengan pengaman || "" agar tidak error uncontrolled
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "guru",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal load user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password)
      return alert("Semua kolom wajib diisi!");

    setSaving(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Akun Resmi Berhasil Dibuat!");
        setFormData({ name: "", email: "", password: "", role: "guru" });
        fetchUsers();
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setSaving(false);
    }
  };

  const handleHapus = async (id) => {
    if (!confirm("Hapus akses akun ini secara permanen?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchUsers();
    } catch (error) {
      alert("Gagal menghapus akun.");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-10">
      <header>
        <h1 className="text-4xl font-serif text-stone-800 tracking-tight">
          Manajemen Akses
        </h1>
        <p className="text-stone-500 italic font-light">
          Otorisasi akun resmi Guru dan Kepala Sekolah TK Al-Ikhlash.
        </p>
      </header>

      {/* FORM REGISTRASI AKUN */}
      <div className="bg-white border border-stone-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nama Lengkap & Gelar"
              className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-600/10 transition-all font-serif"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Email Login
            </label>
            <input
              type="email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="user@sekolah.com"
              className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-2xl outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Password Awal
            </label>
            <input
              type="password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Min. 8 Karakter"
              className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-2xl outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Jabatan (Role)
            </label>
            <select
              value={formData.role || "guru"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-5 py-3.5 bg-stone-50 border border-stone-100 rounded-2xl outline-none cursor-pointer font-serif"
            >
              <option value="guru">Guru Pengajar</option>
              <option value="kepsek">Kepala Sekolah</option>
            </select>
          </div>
          <button
            disabled={saving}
            className="lg:col-span-4 bg-stone-900 text-white py-4 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <UserPlus size={18} />
            )}
            <span>{saving ? "MENDAFTARKAN..." : "AKTIFKAN AKSES AKUN"}</span>
          </button>
        </form>
      </div>

      {/* DAFTAR AKUN AKTIF */}
      <div className="bg-white border border-stone-100 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50/50 border-b border-stone-100">
              <tr>
                <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Pengguna
                </th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Kontak
                </th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                  Status Akses
                </th>
                <th className="p-6 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 text-center">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-stone-50/30 transition-colors group"
                >
                  <td className="p-6 font-serif text-stone-800 text-lg">
                    {u.name}
                  </td>
                  <td className="p-6 text-stone-500 text-sm italic">
                    {u.email}
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                        u.role === "admin"
                          ? "bg-indigo-50 text-indigo-700"
                          : u.role === "kepsek"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    {u.role !== "admin" ? (
                      <button
                        onClick={() => handleHapus(u.id)}
                        className="text-stone-300 hover:text-red-600 transition-all transform hover:scale-110"
                      >
                        <Trash2 size={20} />
                      </button>
                    ) : (
                      <ShieldCheck
                        size={20}
                        className="mx-auto text-indigo-200"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import {
  KeyRound,
  ShieldCheck,
  Loader2,
  RefreshCcw,
  Eye,
  EyeOff,
} from "lucide-react";

export default function KeamananPage() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://127.0.0.1:8000/api/user/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await res.json();

      if (res.ok) {
        alert("Sukses! Password Anda telah diperbarui.");
        setFormData({
          old_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
      } else {
        alert(result.message || "Gagal memperbarui password.");
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-10">
      <header className="text-center space-y-2">
        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <KeyRound size={32} />
        </div>
        <h1 className="text-4xl font-serif text-stone-800 tracking-tight">
          Keamanan Akun
        </h1>
        <p className="text-stone-400 italic font-light text-sm">
          Halaman ini digunakan oleh Admin, Guru, dan Kepsek untuk mengelola
          kata sandi pribadi.
        </p>
      </header>

      <div className="bg-white border border-stone-100 rounded-[2.5rem] p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password Lama */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Kata Sandi Lama
            </label>
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                value={formData.old_password}
                onChange={(e) =>
                  setFormData({ ...formData, old_password: e.target.value })
                }
                className="w-full px-5 py-4 pr-12 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/10 transition-all font-serif"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, old: !showPassword.old })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
              >
                {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password Baru */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={formData.new_password}
                  onChange={(e) =>
                    setFormData({ ...formData, new_password: e.target.value })
                  }
                  className="w-full px-5 py-4 pr-12 bg-stone-50 border border-stone-100 rounded-2xl outline-none transition-all font-serif"
                  placeholder="Min. 8 Karakter"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({ ...showPassword, new: !showPassword.new })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                Konfirmasi Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={formData.new_password_confirmation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      new_password_confirmation: e.target.value,
                    })
                  }
                  className="w-full px-5 py-4 pr-12 bg-stone-50 border border-stone-100 rounded-2xl outline-none transition-all font-serif"
                  placeholder="Ulangi sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirm: !showPassword.confirm,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  {showPassword.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <RefreshCcw size={18} />
            )}
            <span>{loading ? "MEMPROSES..." : "PERBARUI KATA SANDI"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

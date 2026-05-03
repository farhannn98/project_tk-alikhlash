"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link untuk navigasi
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react"; // Tambah ikon Mata dan Panah

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // State baru untuk toggle lihat password
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userName", data.nama);
        router.push("/dashboard");
      } else {
        setErrorMsg(data.pesan || "Gagal login. Periksa kembali data Anda.");
      }
    } catch (error) {
      setErrorMsg("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center pt-24 sm:px-6 lg:px-8 font-sans animate-in fade-in duration-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-serif text-stone-800 tracking-tight mb-2">
          Portal{" "}
          <span className="italic font-light text-green-700">Sekolah</span>
        </h1>
        <p className="text-sm text-green-700 uppercase tracking-widest font-bold">
          TK Al-Ikhlash
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl shadow-stone-200/50 rounded-[2rem] border border-stone-100 sm:px-10 relative overflow-hidden">
          {/* Dekorasi BG */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold text-center animate-in fade-in slide-in-from-top-2">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-stone-50 focus:bg-white text-black transition-colors outline-none"
                  placeholder="admin@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"} // Toggle type antara text dan password
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3 border border-stone-200 rounded-2xl text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-stone-50 focus:bg-white text-black transition-colors outline-none"
                  placeholder="••••••••"
                />

                {/* Tombol Toggle Mata */}
                <button
                  type="button" // Pastikan type button agar tidak submit form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-green-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center space-x-2 py-3.5 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Button Kembali ke Beranda */}
              <Link
                href="/"
                className="w-full flex justify-center items-center space-x-2 py-3 text-sm font-semibold text-stone-500 hover:text-green-700 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

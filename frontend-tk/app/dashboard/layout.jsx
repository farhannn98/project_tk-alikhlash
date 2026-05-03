"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  // State untuk menyimpan data user asli dari database
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek apakah ada token login di browser
    const token = localStorage.getItem("token"); // Sesuaikan jika kamu pakai nama 'token_login' atau cookie

    if (!token) {
      // Kalau tidak ada token, tendang kembali ke halaman login
      router.push("/login");
      return;
    }

    // 2. Tanya ke Laravel: "Ini token punya siapa?"
    const fetchUser = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Simpan data user (termasuk role-nya)
        } else {
          // Token kedaluwarsa atau tidak valid
          localStorage.removeItem("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  // Munculkan loading screen sementara Next.js ngecek KTP ke Laravel
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Jika user gagal dimuat tapi tidak ter-redirect (safety net)
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar sekarang membaca role ASLI dari database */}
      <Sidebar userRole={user.role} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 z-10">
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-widest">
            Dashboard Panel
          </h2>

          {/* Menampilkan Nama & Role Asli */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-bold text-stone-800">{user.name}</p>
              <p className="text-xs text-green-600 uppercase font-semibold">
                {user.role}
              </p>
            </div>
            {/* Tombol Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="bg-stone-100 hover:bg-red-50 text-red-500 text-xs px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Images,
  UserCheck,
  ArrowUpRight,
  Loader2,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function DashboardBeranda() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Pengguna");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Ambil identitas user dari localStorage
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("userRole");

    if (storedName) setUserName(storedName);
    if (storedRole) setUserRole(storedRole);

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Pastikan URL API ini sesuai dengan route di Laravel kamu
      const res = await fetch("http://127.0.0.1:8000/api/dashboard-stats");
      const data = await res.json();
      setStats(data.data);
    } catch (error) {
      console.error("Gagal ambil statistik", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-stone-300" />
      </div>
    );

  // --- KARTU MONITORING PENDAFTARAN (FOKUS UTAMA) ---
  const registrationCards = [
    {
      label: "Total Pendaftar",
      value: stats?.pendaftaran?.total || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      desc: "Keseluruhan Calon Siswa",
      href: "/dashboard/ppdb/pendaftaran",
    },
    {
      label: "Menunggu Verifikasi",
      value: stats?.pendaftaran?.menunggu || 0,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      desc: "Perlu Tindakan Segera",
      href: "/dashboard/ppdb/pendaftaran",
      highlight: true, // Untuk memberi border khusus
    },
    {
      label: "Siswa Diterima",
      value: stats?.pendaftaran?.diterima || 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      desc: "Sudah Terverifikasi",
      href: "/dashboard/ppdb/pendaftaran",
    },
    {
      label: "Pendaftaran Ditolak",
      value: stats?.pendaftaran?.ditolak || 0,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      desc: "Tidak Memenuhi Syarat",
      href: "/dashboard/ppdb/pendaftaran",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 p-2 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-stone-800 tracking-tight">
            {userRole === "kepsek" ? "Laporan Pimpinan," : "Selamat Datang,"}{" "}
            <span className="italic font-light text-stone-500 capitalize">
              {userName}.
            </span>
          </h1>
          <p className="text-stone-500 text-sm mt-1">
            {userRole === "kepsek"
              ? "Memantau perkembangan pendaftaran TK Al-Ikhlash secara real-time."
              : "Berikut adalah ringkasan data operasional sekolah hari ini."}
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone-200 rounded-2xl shadow-sm text-stone-600 text-xs font-medium w-fit">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}
          </span>
        </div>
      </div>

      {/* SECTION 1: MONITORING PENDAFTARAN (FOKUS KEPSEK & ADMIN) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-400 uppercase tracking-[0.2em]">
            Monitoring Pendaftaran (PPDB)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {registrationCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <div
                className={`group bg-white border ${card.highlight ? "border-amber-200 shadow-amber-50 shadow-lg" : "border-stone-200"} p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full cursor-pointer`}
              >
                <div
                  className={`p-3 rounded-2xl w-fit ${card.bg} ${card.color} mb-4`}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">
                    {card.label}
                  </p>
                  <h2 className="text-4xl font-serif text-stone-800">
                    {card.value}
                  </h2>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-50 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-tighter ${card.highlight ? "text-amber-500" : "text-stone-400"}`}
                  >
                    {card.desc}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-stone-800 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: INFORMASI SEKOLAH LAINNYA */}
      <section className="space-y-6 pt-4">
        <h2 className="text-sm font-bold text-stone-400 uppercase tracking-[0.2em]">
          Informasi Sekolah
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tenaga Pendidik */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
            <div className="p-4 bg-stone-50 text-stone-600 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                Guru & Staf
              </p>
              <h3 className="text-2xl font-serif text-stone-800">
                {stats?.sekolah?.total_guru || 0} Orang
              </h3>
            </div>
          </div>

          {/* Sarana */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
            <div className="p-4 bg-stone-50 text-stone-600 rounded-2xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                Sarana Sekolah
              </p>
              <h3 className="text-2xl font-serif text-stone-800">
                {stats?.sekolah?.total_sarana || 0} Data
              </h3>
            </div>
          </div>

          {/* Galeri */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm">
            <div className="p-4 bg-stone-50 text-stone-600 rounded-2xl">
              <Images className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                Koleksi Galeri
              </p>
              <h3 className="text-2xl font-serif text-stone-800">
                {stats?.sekolah?.total_galeri || 0} Foto
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: AKSI CEPAT (KONTROL BERBEDA) */}
    </div>
  );
}

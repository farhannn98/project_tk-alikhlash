"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  Lock,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- TAMBAHAN UNTUK CMS ---
  const [identitas, setIdentitas] = useState({
    nama_sekolah: "TK Al-Ikhlash",
    logo_sekolah: "",
  });

  const pathname = usePathname();
  const isSolidPage = pathname !== "/";

  useEffect(() => {
    // 1. Ambil Data Identitas dari API
    fetch("http://127.0.0.1:8000/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setIdentitas(data);
      })
      .catch((err) => console.error("Gagal ambil data navbar:", err));

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    setIsLoggedIn(!!localStorage.getItem("token"));

    setIsMobileMenuOpen(false);
    setMobileDropdown(null);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Lock scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const menuConfig = [
    { title: "Beranda", path: "/" },
    {
      title: "Profil",
      path: "/profil",
      submenu: [
        { name: "Kontak Sekolah", path: "/profil/kontak" },
        { name: "Tenaga Pendidik", path: "/profil/guru" },
      ],
    },
    {
      title: "Informasi PPDB",
      submenu: [
        { name: "Proses Pendaftaran", path: "/proses" },
        { name: "PPDB Online", path: "/pendaftaran" },
        { name: "Pengumuman", path: "/pengumuman" },
      ],
    },
    { title: "Sarana", path: "/sarana" },
    { title: "Galeri", path: "/galeri" },
  ];

  const isScrolledOrSolid = isScrolled || isSolidPage;

  const elementsColor = isMobileMenuOpen
    ? "text-white"
    : isScrolledOrSolid
      ? "text-stone-800"
      : "text-white";
  const secondaryColor = isMobileMenuOpen
    ? "text-white/60"
    : isScrolledOrSolid
      ? "text-stone-500"
      : "text-white/70";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${
          isMobileMenuOpen
            ? "bg-transparent"
            : isScrolledOrSolid
              ? "bg-white shadow-md py-4"
              : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* 1. LOGO & NAMA DINAMIS */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* LOGO DARI API */}
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <img
                src={
                  identitas.logo_sekolah
                    ? `http://127.0.0.1:8000/storage/${identitas.logo_sekolah}`
                    : "/images/logo-tk.png"
                } // Fallback ke logo lama kalau API kosong
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex flex-col">
              <h1
                className={`text-xl md:text-2xl font-serif transition-colors duration-500 ${elementsColor}`}
              >
                {/* NAMA SEKOLAH DARI API */}
                {identitas.nama_sekolah}
                <span className="text-green-500 italic">.</span>
              </h1>
              <p
                className={`text-[8px] uppercase tracking-[0.2em] ${secondaryColor}`}
              >
                Jepara
              </p>
            </div>
          </Link>

          {/* 2. DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuConfig.map((item, idx) => (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.submenu ? (
                  <Link
                    href={item.path || "#"}
                    className={`flex items-center space-x-1 text-[11px] uppercase tracking-widest font-bold transition-colors duration-500 hover:text-green-500 ${elementsColor}`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${activeDropdown === item.title ? "rotate-180" : ""}`}
                    />
                  </Link>
                ) : (
                  <Link
                    href={item.path}
                    className={`text-[11px] uppercase tracking-widest font-bold transition-colors duration-500 hover:text-green-500 ${elementsColor}`}
                  >
                    {item.title}
                  </Link>
                )}
                {/* Dropdown Desktop */}
                {item.submenu && activeDropdown === item.title && (
                  <div className="absolute top-full left-0 pt-4 w-60 animate-in fade-in slide-in-from-top-2">
                    <div className="bg-white border border-stone-100 shadow-2xl rounded-2xl overflow-hidden p-2">
                      {item.submenu.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.path}
                          className="block px-4 py-3 text-xs font-medium text-stone-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 3. DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className={`flex items-center space-x-2 text-[10px] font-bold transition-colors duration-500 hover:text-green-600 uppercase tracking-widest ${secondaryColor}`}
            >
              {isLoggedIn ? (
                <LayoutDashboard size={14} className="text-green-500" />
              ) : (
                <Lock size={14} />
              )}
              <span>{isLoggedIn ? "Dashboard" : "Masuk"}</span>
            </Link>

            <Link
              href="/pendaftaran"
              className="bg-green-600 hover:bg-stone-900 text-white px-7 py-3 rounded-full text-[10px] font-bold transition-all duration-300 shadow-lg shadow-green-900/10 uppercase tracking-widest"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* 4. MOBILE BURGER TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative z-[160] p-3 transition-all duration-500 ${elementsColor}`}
          >
            {isMobileMenuOpen ? (
              <X size={32} strokeWidth={1.5} />
            ) : (
              <Menu size={32} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY (Isi Nama Sekolah juga harus dinamis) --- */}
      <div
        className={`fixed inset-0 z-[140] bg-[#062c1b] transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="relative h-full flex flex-col pt-32 pb-12 px-10 overflow-y-auto">
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            {menuConfig.map((item, idx) => (
              <div key={idx} className="w-full text-center">
                {item.submenu ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-3">
                      <Link
                        href={item.path || "#"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-serif text-white transition-colors hover:text-green-400"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.title ? null : item.title,
                          )
                        }
                        className="p-2"
                      >
                        <ChevronDown
                          size={24}
                          className={`transition-transform duration-300 ${
                            mobileDropdown === item.title
                              ? "rotate-180 text-green-400"
                              : "text-white/30"
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        mobileDropdown === item.title
                          ? "max-h-60 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="flex flex-col space-y-4 py-2">
                        {item.submenu.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-base text-white/50 uppercase tracking-widest font-light hover:text-white"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-serif text-white block hover:text-green-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Mobile Actions */}
          <div className="shrink-0 flex flex-col items-center space-y-6 pt-10 mt-auto">
            <div className="w-12 h-[1px] bg-white/20"></div>
            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 text-white/60 uppercase tracking-[0.3em] text-[10px] font-bold"
            >
              {isLoggedIn ? <LayoutDashboard size={14} /> : <Lock size={14} />}
              <span>{isLoggedIn ? "Masuk Dashboard" : "Masuk"}</span>
            </Link>
            <Link
              href="/pendaftaran"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full max-w-xs flex items-center justify-center space-x-3 bg-white text-[#062c1b] py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl"
            >
              <Sparkles size={14} />
              <span>Daftar Sekarang</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

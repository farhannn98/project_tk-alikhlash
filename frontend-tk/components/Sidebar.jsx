"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Tambah useRouter
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { MENU_ITEMS } from "@/constants/menu";

const Sidebar = ({ userRole }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState({});

  // Filter menu utama sesuai role user
  const filteredMenu = MENU_ITEMS.filter((item) =>
    item.roles?.includes(userRole),
  );

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Fungsi Logout Total
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");

      // Redirect ke beranda dan refresh total agar Navbar sadar sudah logout
      window.location.href = "/";
    }
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-stone-200 flex flex-col shadow-sm">
      {/* Logo Area */}
      <div className="p-6 border-b border-stone-100">
        <h1 className="text-xl font-serif font-bold tracking-widest text-stone-800">
          AL-IKHLASH
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-green-500 font-semibold mt-1">
          Admin Portal
        </p>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {filteredMenu.map((item, index) => {
          const Icon = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isMenuOpen = openMenus[item.title];

          // Logika khusus untuk menu KELUAR
          const isLogout = item.title.toUpperCase() === "KELUAR";

          const isActive =
            item.path === pathname ||
            (hasSubmenu &&
              item.submenu.some((sub) => pathname.startsWith(sub.path)));

          return (
            <div key={index} className="mb-2">
              {!hasSubmenu ? (
                // Jika menu KELUAR, gunakan <button> bukan <Link>
                isLogout ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-all duration-200 text-red-500 hover:bg-red-50 hover:text-red-700 font-medium mt-2 border border-transparent hover:border-red-100"
                  >
                    {Icon && <Icon className="w-4 h-4 mr-3" />}
                    {item.title}
                  </button>
                ) : (
                  // Menu Normal (Hijau)
                  <Link
                    href={item.path}
                    className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-green-50 text-green-600 font-semibold shadow-sm shadow-green-100"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 mr-3" />}
                    {item.title}
                  </Link>
                )
              ) : (
                /* Menu Dropdown (Normal) */
                <div>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                      isActive && !isMenuOpen
                        ? "bg-green-50 text-green-600 font-semibold"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                    }`}
                  >
                    <div className="flex items-center">
                      {Icon && <Icon className="w-4 h-4 mr-3" />}
                      {item.title}
                    </div>
                    {isMenuOpen ? (
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    )}
                  </button>

                  {/* Daftar Submenu */}
                  {isMenuOpen && (
                    <div className="ml-5 mt-1 pl-4 border-l-2 border-stone-100 space-y-1">
                      {item.submenu
                        .filter((sub) => sub.roles?.includes(userRole))
                        .map((sub, idx) => {
                          const isSubActive = pathname === sub.path;
                          return (
                            <Link
                              key={idx}
                              href={sub.path}
                              className={`block px-3 py-2 text-[13px] rounded-md transition-all ${
                                isSubActive
                                  ? "text-green-600 font-bold bg-green-50/50"
                                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                              }`}
                            >
                              {sub.title}
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer Sidebar (Optional biar makin Luxury) */}
      <div className="p-4 border-t border-stone-100">
        <p className="text-[10px] text-stone-400 text-center font-medium">
          v1.0.26 — Al-Ikhlash System
        </p>
      </div>
    </div>
  );
};

export default Sidebar;

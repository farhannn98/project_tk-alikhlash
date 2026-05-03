import {
  Home,
  Users,
  Building,
  Image as ImageIcon,
  ClipboardList,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "Beranda",
    path: "/dashboard",
    icon: Home,
    roles: ["admin", "guru", "kepsek"], // Semua bisa lihat dashboard utama
  },
  {
    title: "Kelola User",
    path: "/dashboard/users",
    icon: Users, // Kita pakai icon Users dari Lucide
    roles: ["admin"],
  },
  {
    title: "Profil",
    icon: Users,
    roles: ["admin", "kepsek"], // GURU DIHAPUS: Sesuai permintaan agar guru tidak mengelola profil
    submenu: [
      {
        title: "Tenaga Pendidik",
        path: "/dashboard/profil/guru",
        roles: ["admin", "kepsek"],
      },
    ],
  },
  {
    title: "Informasi PPDB",
    icon: ClipboardList,
    roles: ["admin", "guru", "kepsek"], // GURU TETAP TIDAK ADA: Hanya admin & kepsek yang mengelola pendaftaran
    submenu: [
      {
        title: "Data Pendaftaran",
        path: "/dashboard/ppdb/pendaftaran",
        roles: ["admin", "guru", "kepsek"],
      },
      {
        title: "Pengumuman",
        path: "/dashboard/ppdb/pengumuman",
        roles: ["admin", "guru", "kepsek"],
      },
    ],
  },
  {
    title: "Sarana Prasarana",
    path: "/dashboard/sarana",
    icon: Building,
    roles: ["admin", "guru"], // GURU DITAMBAHKAN: Agar guru bisa mengelola/melihat data sarana
  },
  {
    title: "Galeri",
    path: "/dashboard/galeri",
    icon: ImageIcon,
    roles: ["admin", "guru"], // GURU DITAMBAHKAN: Tempat guru upload foto kegiatan
  },
  {
    title: "Keamanan",
    path: "/dashboard/keamanan", // Sesuaikan dengan nama folder baru
    icon: ShieldCheck,
    roles: ["admin", "guru", "kepsek"], // Semua orang butuh fitur ini
  },
  {
    title: "Pengaturan",
    path: "/dashboard/pengaturan",
    icon: Settings,
    roles: ["admin"],
  },
  {
    title: "Keluar",
    path: "#",
    icon: LogOut,
    roles: ["admin", "guru", "kepsek"],
  },
];

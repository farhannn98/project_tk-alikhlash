<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

// Model tetap sama
use App\Models\Pendaftaran;
use App\Models\Sarana;
use App\Models\Galeri;
use App\Models\TenagaPendidik; 

class DashboardController extends Controller
{
    public function getStats()
    {
        // 1. STATISTIK UTAMA (Untuk Ringkasan Cepat)
        $totalPendaftar = Pendaftaran::count();
        $totalGuru      = TenagaPendidik::count();
        
        // 2. BREAKDOWN STATUS PENDAFTARAN (Fokus Utama Kita)
        // Menghitung jumlah berdasarkan status yang ada di database kamu
        $pendaftarMenunggu    = Pendaftaran::where('status', 'menunggu')->count();
        $pendaftarDiterima    = Pendaftaran::where('status', 'diterima')->count(); // Sesuaikan jika namanya 'diterima'
        $pendaftarDitolak     = Pendaftaran::where('status', 'ditolak')->count();

        // 3. STATISTIK PENDUKUNG (Opsional, tetap dipertahankan)
        $totalSarana = Sarana::count();
        $totalGaleri = Galeri::count();

        // Kirim laporannya dalam bentuk JSON ke Next.js
        return response()->json([
            'status' => 'sukses',
            'data' => [
                // Info Pendaftaran (Bahan baku untuk Monitoring Kepsek)
                'pendaftaran' => [
                    'total'    => $totalPendaftar,
                    'menunggu' => $pendaftarMenunggu,
                    'diterima' => $pendaftarDiterima,
                    'ditolak'  => $pendaftarDitolak,
                ],
                // Info Sekolah Lainnya
                'sekolah' => [
                    'total_guru'   => $totalGuru,
                    'total_sarana' => $totalSarana,
                    'total_galeri' => $totalGaleri,
                ]
            ]
        ]);
    }
}
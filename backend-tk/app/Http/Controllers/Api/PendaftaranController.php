<?php

namespace App\Http\Controllers\Api;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Pendaftaran; 

class PendaftaranController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'jenis_pendaftaran' => 'required|string',
            'nama_anak' => 'required|string',
            'jenis_kelamin' => 'required|in:LAKI-LAKI,PEREMPUAN',
            'nik_anak' => 'required|string',
            'alamat' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'anak_ke' => 'required|numeric',
            'no_akta' => 'required|string',
            'bahasa' => 'required|string',
            'berat_badan' => 'required|numeric',
            'tinggi_badan' => 'required|numeric',
            'lingkar_kepala' => 'required|numeric',
            'jarak_rumah' => 'required|numeric',
            'hobi' => 'required|string',
            'cita_cita' => 'required|string',
            'kewarganegaraan' => 'required|string',
            'email' => 'required|email',
            'tanggal_pendaftaran' => 'required|date',
            'pas_foto' => 'required|image|mimes:jpeg,jpg,png|max:5120', 
        ]);

        $no_registrasi = 'TK-' . date('Ymd') . '-' . rand(1000, 9999);

        $path_foto = null;
        if ($request->hasFile('pas_foto')) {
            $file = $request->file('pas_foto');
            $nama_file = time() . '_' . $file->getClientOriginalName();
            $path_foto = $file->storeAs('pendaftar', $nama_file, 'public');
        }

        DB::table('pendaftaran')->insert([
            'no_registrasi' => $no_registrasi,
            'jenis_pendaftaran' => $request->jenis_pendaftaran,
            'nama_anak' => $request->nama_anak,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nik_anak' => $request->nik_anak,
            'alamat' => $request->alamat,
            'kategori_siswa' => $request->kategori_siswa,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'anak_ke' => $request->anak_ke,
            'no_akta' => $request->no_akta,
            'bahasa' => $request->bahasa,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'lingkar_kepala' => $request->lingkar_kepala,
            'jarak_rumah' => $request->jarak_rumah,
            'hobi' => $request->hobi,
            'cita_cita' => $request->cita_cita,
            'kewarganegaraan' => $request->kewarganegaraan,
            'email' => $request->email,
            'tanggal_pendaftaran' => $request->tanggal_pendaftaran,
            'pas_foto' => $path_foto,
            'status' => 'menunggu',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'pesan' => 'Pendaftaran berhasil dikirim!',
            'no_registrasi' => $no_registrasi
        ], 201);
    }

    public function cetak($no_reg)
    {
        $pendaftaran = DB::table('pendaftaran')->where('no_registrasi', $no_reg)->first();

        if (!$pendaftaran) {
            return response()->json(['pesan' => 'Data tidak ditemukan'], 404);
        }

        // --- PROSES GAMBAR LOGO (BASE64) ---
        $pathLogo = public_path('images/logo-tk.png');
        $base64Logo = null;
        if (file_exists($pathLogo)) {
            $typeLogo = pathinfo($pathLogo, PATHINFO_EXTENSION);
            $dataLogo = file_get_contents($pathLogo);
            $base64Logo = 'data:image/' . $typeLogo . ';base64,' . base64_encode($dataLogo);
        }

        // --- PROSES PAS FOTO MURID (BASE64) ---
        $pathFoto = storage_path('app/public/' . $pendaftaran->pas_foto);
        $base64Foto = null;
        if ($pendaftaran->pas_foto && file_exists($pathFoto)) {
            $typeFoto = pathinfo($pathFoto, PATHINFO_EXTENSION);
            $dataFoto = file_get_contents($pathFoto);
            $base64Foto = 'data:image/' . $typeFoto . ';base64,' . base64_encode($dataFoto);
        }

        // Kirim data ke view bukti_pendaftaran.blade.php
        $pdf = Pdf::loadView('bukti_pendaftaran', [
            'pendaftaran' => $pendaftaran,
            'logo' => $base64Logo,
            'foto' => $base64Foto
        ]);

        return $pdf->stream('Bukti-' . $no_reg . '.pdf');
    }

    public function index()
    {
        $data = DB::table('pendaftaran')->orderBy('created_at', 'desc')->get();
        return response()->json([
            'status' => 'sukses',
            'data' => $data
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Menunggu,Diterima,Ditolak'
        ]);

        $pendaftar = DB::table('pendaftaran')->where('id', $id);
        
        if (!$pendaftar->first()) {
            return response()->json(['pesan' => 'Data tidak ditemukan'], 404);
        }

        $pendaftar->update(['status' => $request->status]);

        return response()->json([
            'status' => 'sukses',
            'pesan' => 'Status berhasil diperbarui menjadi ' . $request->status
        ]);
    }

    public function cekKelulusan($nik)
{
    // Sekarang kita cari berdasarkan nik_anak
    $pendaftar = DB::table('pendaftaran')->where('nik_anak', $nik)->first();

    if (!$pendaftar) {
        return response()->json([
            'status' => 'error',
            'pesan' => 'NIK tidak ditemukan. Pastikan NIK yang dimasukkan sesuai dengan Kartu Keluarga.'
        ], 404);
    }

    return response()->json([
        'status' => 'sukses',
        'data' => [
            'nama_anak' => $pendaftar->nama_anak,
            'nik_anak' => $pendaftar->nik_anak, // Tambahkan ini agar user yakin
            'status' => $pendaftar->status,
            'jalur_pendaftaran' => $pendaftar->jenis_pendaftaran
        ]
    ]);
}

    public function cetakSemua()
    {
        $pendaftar = DB::table('pendaftaran')->orderBy('created_at', 'desc')->get();
        $pdf = Pdf::loadView('laporan_pendaftar', compact('pendaftar'));
        $pdf->setPaper('A4', 'landscape');
        return $pdf->stream('Laporan-Semua-Pendaftar.pdf');
    }
}
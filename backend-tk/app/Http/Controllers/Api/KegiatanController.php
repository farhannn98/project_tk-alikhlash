<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KegiatanController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi Input & File
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Maks 2MB
        ]);

        // 2. Proses Simpan Gambar
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $nama_file = time() . '_' . $file->getClientOriginalName();
            // Simpan ke folder public/storage/kegiatan
            $path = $file->storeAs('kegiatan', $nama_file, 'public');

            // 3. Simpan Data ke Database
            DB::table('kegiatan')->insert([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $path, // Simpan path-nya saja
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json(['pesan' => 'Kegiatan berhasil diunggah!'], 201);
        }

        return response()->json(['pesan' => 'Gagal mengunggah gambar'], 400);
    }

    public function index()
    {
        // Ambil semua data kegiatan, urutkan dari yang terbaru
        $kegiatan = DB::table('kegiatan')->orderBy('created_at', 'desc')->get();

        // Karena Next.js butuh link lengkap gambar, kita buatkan URL-nya
        foreach ($kegiatan as $item) {
            $item->gambar_url = asset('storage/' . $item->gambar);
        }

        return response()->json([
            'status' => 'sukses',
            'data' => $kegiatan
        ]);
    }
}
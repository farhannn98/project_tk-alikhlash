<?php

namespace App\Http\Controllers;

use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class GaleriController extends Controller
{
    /**
     * Tampilkan semua data galeri
     */
    public function index()
    {
        return response()->json(Galeri::orderBy('created_at', 'desc')->get());
    }

    /**
     * Simpan data galeri baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul'      => 'required|string|max:255',
            'tipe'       => 'required|in:foto,video',
            'foto'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048', 
            'link_video' => 'nullable|string',
        ]);

        $path_foto = null;
        if ($request->hasFile('foto')) {
            $path_foto = $request->file('foto')->store('galeri', 'public');
        }

        // Menggunakan Query Builder sesuai kodingan awalmu
        DB::table('galeris')->insert([
            'tipe'       => $request->tipe,
            'judul'      => $request->judul,
            'foto'       => $path_foto,
            'link_video' => $request->link_video,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Data berhasil ditambahkan!'], 201);
    }

    /**
     * Update data galeri (Foto atau Video)
     */
    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $request->validate([
            'judul'      => 'required|string|max:255',
            'tipe'       => 'required|in:foto,video',
            'foto'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'link_video' => 'nullable|string',
        ]);

        $galeri->judul = $request->judul;
        $galeri->tipe  = $request->tipe;

        // Logika Update Foto
        if ($request->tipe === 'foto' && $request->hasFile('foto')) {
            // Hapus foto lama jika ada di storage
            if ($galeri->foto && Storage::disk('public')->exists($galeri->foto)) {
                Storage::disk('public')->delete($galeri->foto);
            }
            
            // Simpan foto baru
            $path = $request->file('foto')->store('galeri', 'public');
            $galeri->foto = $path;
        }

        // Logika Update Video
        if ($request->tipe === 'video') {
            $galeri->link_video = $request->link_video;
        }

        $galeri->save();

        return response()->json([
            'message' => 'Galeri berhasil diperbarui!',
            'data'    => $galeri
        ]);
    }

    /**
     * Hapus data galeri
     */
    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);

        // Hapus file dari storage jika tipenya foto
        if ($galeri->foto && Storage::disk('public')->exists($galeri->foto)) {
            Storage::disk('public')->delete($galeri->foto);
        }

        $galeri->delete();

        return response()->json(['message' => 'Konten galeri berhasil dihapus']);
    }
}
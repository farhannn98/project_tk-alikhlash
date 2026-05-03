<?php

namespace App\Http\Controllers;

use App\Models\TenagaPendidik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TenagaPendidikController extends Controller
{
    // 1. Mengambil semua data guru (Read)
    public function index()
    {
        $data = TenagaPendidik::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => 'sukses', 'data' => $data]);
    }

    // 2. Menyimpan data guru baru (Create)
    public function store(Request $request)
    {
        $request->validate([
            'nama_lengkap' => 'required|string',
            'jabatan' => 'required|string',
            'nip' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5120', // Max 5MB
        ]);

        $path_foto = null;
        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $nama_file = time() . '_' . $file->getClientOriginalName();
            $path_foto = $file->storeAs('guru', $nama_file, 'public');
        }

        TenagaPendidik::create([
            'nama_lengkap' => $request->nama_lengkap,
            'jabatan' => $request->jabatan,
            'nip' => $request->nip,
            'foto' => $path_foto,
        ]);

        return response()->json(['pesan' => 'Data guru berhasil ditambahkan!'], 201);
    }

    // 3. Mengupdate data guru (Update)
    public function update(Request $request, $id)
    {
        $guru = TenagaPendidik::find($id);
        if (!$guru) return response()->json(['pesan' => 'Data tidak ditemukan'], 404);

        $request->validate([
            'nama_lengkap' => 'required|string',
            'jabatan' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $path_foto = $guru->foto;
        // Jika admin mengupload foto baru saat edit
        if ($request->hasFile('foto')) {
            // Hapus foto lama dari folder
            if ($guru->foto) {
                Storage::disk('public')->delete($guru->foto);
            }
            // Simpan foto baru
            $file = $request->file('foto');
            $nama_file = time() . '_' . $file->getClientOriginalName();
            $path_foto = $file->storeAs('guru', $nama_file, 'public');
        }

        $guru->update([
            'nama_lengkap' => $request->nama_lengkap,
            'jabatan' => $request->jabatan,
            'nip' => $request->nip,
            'foto' => $path_foto,
        ]);

        return response()->json(['pesan' => 'Data guru berhasil diperbarui!']);
    }

    // 4. Menghapus data guru (Delete)
    public function destroy($id)
    {
        $guru = TenagaPendidik::find($id);
        if (!$guru) return response()->json(['pesan' => 'Data tidak ditemukan'], 404);

        // Hapus foto dari folder (kalau ada) sebelum datanya dihapus
        if ($guru->foto) {
            Storage::disk('public')->delete($guru->foto);
        }

        $guru->delete();
        return response()->json(['pesan' => 'Data guru berhasil dihapus!']);
    }
}
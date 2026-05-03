<?php

namespace App\Http\Controllers;

use App\Models\Sarana; // Pastikan ini ada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // INI WAJIB ADA, sering bikin error 500 kalau lupa

class SaranaController extends Controller
{
    public function index()
    {
       $data = Sarana::all(); 
    return response()->json([
        'status' => 'success',
        'data'   => $data
    ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_sarana' => 'required|string|max:255',
                'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]);

            if ($request->hasFile('foto')) {
                // Simpan file ke folder public/sarana
                $path = $request->file('foto')->store('sarana', 'public');

                $sarana = Sarana::create([
                    'nama_sarana' => $request->nama_sarana,
                    'foto' => $path,
                ]);

                return response()->json([
                    'status' => 'sukses',
                    'data' => $sarana
                ], 201);
            }
        } catch (\Exception $e) {
            // Jika error, Laravel akan kasih tau lewat pesan ini daripada cuma 500
            return response()->json([
                'status' => 'error',
                'pesan' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $sarana = Sarana::findOrFail($id);
        
        // Hapus file fisik jika ada
        if ($sarana->foto) {
            Storage::disk('public')->delete($sarana->foto);
        }
        
        $sarana->delete();

        return response()->json(['pesan' => 'Fasilitas berhasil dihapus']);
    }

    public function update(Request $request, $id)
{
    try {
        $sarana = Sarana::findOrFail($id);

        // 1. Validasi - pastikan nama field sesuai yang dikirim Next.js
        $request->validate([
            'nama_sarana' => 'required|string|max:255',
            'foto'        => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // 2. Update Nama (SESUAIKAN DENGAN NAMA KOLOM DI DATABASE KAMU)
        // Jika di DB namanya 'nama', ganti jadi $sarana->nama
        $sarana->nama_sarana = $request->nama_sarana; 

        // 3. Update Foto
        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($sarana->foto && Storage::disk('public')->exists($sarana->foto)) {
                Storage::disk('public')->delete($sarana->foto);
            }
            
            $path = $request->file('foto')->store('sarana', 'public');
            $sarana->foto = $path; // SESUAIKAN JIKA DI DB NAMANYA 'foto_sarana'
        }

        $sarana->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil diperbarui!',
            'data'    => $sarana
        ]);

    } catch (\Exception $e) {
        // Ini kuncinya! Supaya kita tau error aslinya apa
        return response()->json([
            'status' => 'error',
            'pesan' => $e->getMessage()
        ], 500);
    }
}
}
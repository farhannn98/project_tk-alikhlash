<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    // 1. Ambil semua data setting
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key'); 
        // pluck bikin formatnya jadi enak: {"nama_sekolah": "TK Al-Ikhlash", ...}
        return response()->json($settings);
    }

    // 2. Update data setting
    public function update(Request $request)
    {
        try {
        $data = $request->all();

        foreach ($data as $key => $value) {
            // 1. Lewati jika value kosong, tapi jangan lewati jika itu adalah file upload
            if (!$value && !$request->hasFile($key)) continue;

            // 2. LOGIKA UPLOAD: Logo Sekolah ATAU Foto Kepsek
            if (($key == 'logo_sekolah' || $key == 'foto_kepsek') && $request->hasFile($key)) {
                
                // Ambil data lama untuk menghapus file fisik yang lama (biar gak nyampah di storage)
                $oldSetting = Setting::where('key', $key)->first();
                
                if ($oldSetting && $oldSetting->value && !str_contains($oldSetting->value, 'default')) {
                    Storage::disk('public')->delete($oldSetting->value);
                }

                // Simpan file baru ke folder 'identitas'
                $path = $request->file($key)->store('identitas', 'public');
                $value = $path; // Ganti value teks jadi path file yang baru disimpan
            }

            // 3. Simpan atau Update ke Tabel Settings
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return response()->json(['message' => 'Semua pengaturan berhasil diperbarui!']);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Tampilkan semua user (Daftar Guru & Kepsek)
     */
    public function index()
    {
        // Mengambil semua user agar bisa tampil di tabel Next.js
        $users = User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    /**
     * Simpan user baru (Action dari Form Admin)
     */
    public function store(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role'     => 'required|in:admin,guru,kepsek',
        ]);

        // 2. Simpan ke Database
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'role'     => $request->role,
            'password' => Hash::make($request->password), // Enkripsi password
        ]);

        return response()->json([
            'message' => 'Akun berhasil dibuat!',
            'user'    => $user
        ], 201);
    }

    /**
     * Hapus akses user
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Mencegah menghapus diri sendiri (Opsional)
        $user->delete();

        return response()->json([
            'message' => 'Akses user berhasil dicabut.'
        ]);
    }

   public function updatePassword(Request $request)
{
    $user = $request->user();

    // PENGAMAN: Jika user null (tidak terdeteksi login)
    if (!$user) {
        return response()->json(['message' => 'Anda harus login terlebih dahulu.'], 401);
    }

    $request->validate([
        'old_password' => 'required',
        'new_password' => 'required|min:8|confirmed',
    ]);

    // Cek password lama
    if (!\Illuminate\Support\Facades\Hash::check($request->old_password, $user->password)) {
        return response()->json(['message' => 'Password lama salah.'], 422);
    }

    $user->update([
        'password' => \Illuminate\Support\Facades\Hash::make($request->new_password)
    ]);

    return response()->json(['message' => 'Password berhasil diperbarui!']);
}
}
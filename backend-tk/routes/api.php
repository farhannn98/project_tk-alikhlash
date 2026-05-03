<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PendaftaranController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\KegiatanController;
use App\Http\Controllers\TenagaPendidikController;
use App\Http\Controllers\SaranaController;
use App\Http\Controllers\GaleriController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController; // Import UserController
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Controllers\Api\SettingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- AUTENTIKASI ---
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// --- KELOLA USER (Admin Only - Revisi Baru) ---
// Kita taruh di luar middleware dulu biar kamu gampang ngetesnya
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);


// --- PENDAFTARAN ---
Route::post('/pendaftaran', [PendaftaranController::class, 'store']);
Route::get('/pendaftaran', [PendaftaranController::class, 'index']); 
Route::get('/pendaftaran/cetak/{no_reg}', [PendaftaranController::class, 'cetak']);
Route::get('/pendaftaran/cetak-semua', [PendaftaranController::class, 'cetakSemua']);
// Cek Kelulusan sekarang pakai NIK sesuai permintaan Dosen
Route::get('/pendaftaran/cek-kelulusan/{nik}', [PendaftaranController::class, 'cekKelulusan']);


// --- KEGIATAN ---
Route::get('/kegiatan', [KegiatanController::class, 'index']);


// --- TENAGA PENDIDIK ---
Route::get('/tenaga-pendidik', [TenagaPendidikController::class, 'index']);
Route::post('/tenaga-pendidik', [TenagaPendidikController::class, 'store']);
Route::post('/tenaga-pendidik/{id}', [TenagaPendidikController::class, 'update']); 
Route::delete('/tenaga-pendidik/{id}', [TenagaPendidikController::class, 'destroy']);


// --- SARANA ---
Route::get('/sarana', [SaranaController::class, 'index']);
Route::post('/sarana', [SaranaController::class, 'store']);
Route::delete('/sarana/{id}', [SaranaController::class, 'destroy']);
Route::post('/sarana/{id}', [SaranaController::class, 'update']);

// --- GALERI (Foto & Video YouTube) ---
Route::get('/galeri', [GaleriController::class, 'index']);
Route::post('/galeri', [GaleriController::class, 'store']);
Route::delete('/galeri/{id}', [GaleriController::class, 'destroy']);
Route::post('/galeri/{id}', [GaleriController::class, 'update']);


// --- DASHBOARD & TEST ---
Route::get('/dashboard-stats', [DashboardController::class, 'getStats']);
Route::get('/test-pdf', function () {
    $pdf = Pdf::loadHTML('<h1>Halo Bree! PDF Al-Ikhlash Berhasil!</h1>');
    return $pdf->stream();
});


// --- RUTE TERPROTEKSI (Wajib Login/Token) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/pendaftaran/{id}/status', [PendaftaranController::class, 'updateStatus']);
    Route::get('/data-pendaftar', [PendaftaranController::class, 'index']);
    Route::post('/kegiatan', [KegiatanController::class, 'store']);
    Route::post('/user/update-password', [UserController::class, 'updatePassword']);
});

// Grouping biar rapi
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/settings', [SettingController::class, 'update']);
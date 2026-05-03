<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    // WAJIB: Pastikan ini 'pendaftaran' (tanpa s), sesuai dengan yang ada di controllermu
    protected $table = 'pendaftaran'; 

    protected $fillable = [
        'no_registrasi', // Di controllermu namanya no_registrasi
        'jenis_pendaftaran',
        'nama_anak',
        'jenis_kelamin',
        'nik_anak',
        'alamat',
        'kategori_siswa',
        'tempat_lahir',
        'tanggal_lahir',
        'anak_ke',
        'no_akta',
        'bahasa',
        'berat_badan',
        'tinggi_badan',
        'lingkar_kepala',
        'jarak_rumah',
        'hobi',
        'cita_cita',
        'kewarganegaraan',
        'email',
        'tanggal_pendaftaran',
        'pas_foto',
        'status',
    ];
}
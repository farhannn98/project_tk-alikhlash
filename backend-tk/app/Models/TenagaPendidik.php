<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenagaPendidik extends Model
{
    use HasFactory;

    // Menyesuaikan nama tabel karena Laravel biasanya otomatis nambah huruf 's' di belakang
    protected $table = 'tenaga_pendidiks'; 

    protected $fillable = [
        'nama_lengkap',
        'jabatan',
        'nip',
        'foto',
    ];
}
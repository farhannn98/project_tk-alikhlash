<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenaga_pendidiks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->string('jabatan'); // Contoh: Kepala Sekolah, Guru Kelas A, dll
            $table->string('nip')->nullable(); // Boleh kosong kalau guru belum punya NIP
            $table->string('foto')->nullable(); // Untuk menyimpan nama file foto
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenaga_pendidiks');
    }
};

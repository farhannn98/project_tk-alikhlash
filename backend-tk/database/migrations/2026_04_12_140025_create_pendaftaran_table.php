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
        // KITA MENGGUNAKAN SCHEMA::CREATE UNTUK MEMBANGUN TABEL DARI NOL
        Schema::create('pendaftaran', function (Blueprint $table) {
            $table->id();
            $table->string('no_registrasi')->unique();
            
            // --- Data Sesuai Google Form ---
            $table->string('jenis_pendaftaran');
            $table->string('nama_anak');
            $table->enum('jenis_kelamin', ['LAKI-LAKI', 'PEREMPUAN']);
            $table->string('nik_anak', 16);
            $table->text('alamat');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->integer('anak_ke');
            $table->string('no_akta');
            $table->string('bahasa');
            $table->float('berat_badan');
            $table->float('tinggi_badan');
            $table->float('lingkar_kepala');
            $table->float('jarak_rumah');
            $table->string('hobi');
            $table->string('cita_cita');
            $table->string('kewarganegaraan');
            $table->string('email');
            $table->date('tanggal_pendaftaran');
            $table->string('pas_foto')->nullable(); // Boleh kosong sementara saat disubmit jika ada kendala
            
            // --- Status & Timestamps ---
            $table->string('status')->default('menunggu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran');
    }
};
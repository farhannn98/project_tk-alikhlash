<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('pendaftaran', function (Blueprint $table) {
        // Menambahkan kolom kategori_siswa setelah kolom status
        $table->enum('kategori_siswa', ['baru', 'pindahan'])->default('baru')->after('status');
    });
}

public function down()
{
    Schema::table('pendaftaran', function (Blueprint $table) {
        // Menghapus kolom jika migration di-rollback
        $table->dropColumn('kategori_siswa');
    });
}
};

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
    Schema::table('users', function (Blueprint $table) {
        // Kita ubah jadi enum dan tambahkan 'after' biar rapi posisinya di tabel
        $table->enum('role', ['admin', 'guru', 'kepsek'])->default('guru')->after('email');
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('role');
    });
}
};

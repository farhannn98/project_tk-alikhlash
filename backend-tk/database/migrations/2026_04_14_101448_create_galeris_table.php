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
    Schema::create('galeris', function (Blueprint $table) {
        $table->id();
        $table->string('judul');
        $table->enum('tipe', ['foto', 'video']);
        $table->string('foto')->nullable(); // Tambahkan nullable()
        $table->string('link_video')->nullable(); // Tambahkan nullable()
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeris');
    }
};

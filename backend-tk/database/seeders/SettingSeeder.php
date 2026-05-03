<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Setting;
use Illuminate\Database\Seeder;


class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'nama_sekolah', 'value' => 'TK Al-Ikhlash Jepara'],
            ['key' => 'logo_sekolah', 'value' => 'default_logo.png'],
            ['key' => 'hero_title', 'value' => 'Selamat Datang di Masa Depan'],
            ['key' => 'hero_subtitle', 'value' => 'Membentuk generasi cerdas, ceria, dan berakhlak mulia.'],
            ['key' => 'foto_kepsek', 'value' => 'default_kepsek.png'],
            ['key' => 'nama_kepsek', 'value' => 'Sri Endang Tristyaningrum, S.Pd'],
            ['key' => 'sambutan_kepsek_title', 'value' => 'Selamat Datang di TK Al-Ikhlash Pekalongan.'],
            ['key' => 'sambutan_kepsek_body', 'value' => "Assalamualaikum Wr. Wb.\n\nWebsite ini adalah wadah interaktif bagi seluruh komunitas pendidikan TK Al-Ikhlash..."],
            ['key' => 'sambutan_kepsek_quote', 'value' => 'Setiap anak adalah bintang yang menunggu untuk bersinar.'],
            ['key' => 'visi_sekolah', 'value' => 'Terselenggaranya layanan pendidikan untuk membentuk insan Indonesia yang cerdas dan berakhlak mulia.'],
            ['key' => 'misi_sekolah', 'value' => "Meningkatkan layanan pendidikan\nMemperluas keterjangkauan\nMenanamkan kedisiplinan"],
            ['key' => 'wa_number', 'value' => '6281234567890'],
            ['key' => 'email_sekolah', 'value' => 'info@tkal-ikhlash.sch.id'],
            ['key' => 'alamat_sekolah', 'value' => 'Jl. Raya Jepara No. 123, Indonesia'],
            ['key' => 'jam_operasional', 'value' => 'Senin - Jumat: 07:30 - 12:00'], // Data baru
            ['key' => 'google_maps', 'value' => 'https://www.google.com/maps/embed?...'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(['key' => $setting['key']], ['value' => $setting['value']]);
        }
    }
    }


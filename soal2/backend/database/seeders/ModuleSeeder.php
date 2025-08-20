<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('modules')->insert([
            [
                'name' => 'Multi-Event Voting',
                'description' => 'Admin jadwalkan periode voting (start/end otomatis). Dashboard event aktif & arsip event',
            ],
            [
                'name' => 'One-Vote-Per-User',
                'description' => 'Validasi via ID anggota terdaftar (NIK/KTA). CAPTCHA & rate-limiter mencegah bot',
            ],
            [
                'name' => 'Foto Kandidat',
                'description' => 'Saat voting, user ambil foto selfie sebagai bukti kehadiran. Wajah dicocokkan sekilas (face landmark)',
            ],
            [
                'name' => 'Validasi GPS',
                'description' => 'Pastikan user berada dalam radius 50 m dari tempat voting. Simpan koordinat untuk audit',
            ],
            [
                'name' => 'Email Notifikasi',
                'description' => 'Konfirmasi voting ke voter. Notifikasi result ke semua voter setelah event berakhir',
            ],
            [
                'name' => 'Telegram Notification',
                'description' => 'Kirim hasil & pemenang ke grup kandidat via Bot API',
            ],
            [
                'name' => 'AI Insight',
                'description' => 'Analisis pola voting (waktu, lokasi, demografi). Fitur “Why X wins” berdasarkan profil kandidat',
            ],
            [
                'name' => 'Real-Time Dashboard & Alerting',
                'description' => 'Persentase suara per kandidat. Tingkat partisipasi (%) per lokasi dan demografi',
            ],
        ]);
    }
}

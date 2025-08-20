<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::create([
            'title' => 'Pemilihan Ketua BEM 2025',
            'description' => 'Voting untuk memilih Ketua BEM periode 2025-2026',
            'start_time' => now(),
            'end_time' => now()->addDays(3),
            'status' => 'active',
        ]);
    }
}

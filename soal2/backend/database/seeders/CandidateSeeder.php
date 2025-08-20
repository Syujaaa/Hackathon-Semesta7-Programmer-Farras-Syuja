<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Candidate;
use App\Models\Event;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $event = Event::first();

        Candidate::create([
            'event_id' => $event->id,
            'name' => 'Calon 1 - Ahmad Fulan',
            'photo' => 'candidates/ahmad.jpg',
            'vision' => 'Mewujudkan BEM yang transparan',
            'mission' => 'Mengembangkan kegiatan kemahasiswaan yang inovatif dan bermanfaat.',
        ]);

        Candidate::create([
            'event_id' => $event->id,
            'name' => 'Calon 2 - Siti Aminah',
            'photo' => 'candidates/siti.jpg',
            'vision' => 'Membawa perubahan positif',
            'mission' => 'Mendorong partisipasi aktif mahasiswa dalam organisasi.',
        ]);
    }
}

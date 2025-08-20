<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vote;
use App\Models\User;
use App\Models\Event;
use App\Models\Candidate;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();
        $event = Event::first();
        $candidate = Candidate::first();

        Vote::create([
            'user_id' => $user->id,
            'event_id' => $event->id,
            'candidate_id' => $candidate->id,
            'ip_address' => '127.0.0.1',
            'device' => 'Seeder Simulation',
        ]);
    }
}

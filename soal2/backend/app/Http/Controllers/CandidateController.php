<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CandidateController extends Controller
{
    public function store(Request $request, $eventId)
    {
        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event tidak ditemukan',
            ], 404);
        }

        $request->validate([
            'candidates' => 'required|array|min:1',
            'candidates.*.name' => 'required|string|max:255',
            'candidates.*.vision' => 'nullable|string',
            'candidates.*.mission' => 'nullable|string',
            'candidates.*.photo' => 'nullable|image|max:2048',
        ]);

        $saved = [];

        foreach ($request->candidates as $candidateData) {
            $path = null;

            if (isset($candidateData['photo']) && $candidateData['photo'] instanceof \Illuminate\Http\UploadedFile) {
                $path = $candidateData['photo']->store('candidates', 'public');
            }

            $saved[] = Candidate::create([
                'event_id' => $event->id,
                'name' => $candidateData['name'],
                'vision' => $candidateData['vision'] ?? null,
                'mission' => $candidateData['mission'] ?? null,
                'photo' => $path,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Kandidat berhasil ditambahkan',
            'data' => $saved
        ]);
    }

    public function getCandidates($eventId)
    {
        $kandidat = Candidate::where('event_id', $eventId)->get();
        return response()->json([
            'data' => $kandidat
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vote;

class VoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Vote::with(['user', 'event', 'candidate'])->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'event_id' => 'required|exists:events,id',
            'candidate_id' => 'required|exists:candidates,id',
        ]);

        if (Vote::where('user_id', $validated['user_id'])
            ->where('event_id', $validated['event_id'])
            ->exists()) {
            return response()->json(['error' => 'User sudah memilih pada event ini'], 400);
        }

        $vote = Vote::create([
            ...$validated,
            'ip_address' => $request->ip(),
            'device' => $request->header('User-Agent'),
            'voted_at' => now(),
        ]);

        return response()->json($vote, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
         return response()->json(
            Vote::with(['user', 'event', 'candidate'])->findOrFail($id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $vote = Vote::findOrFail($id);
        $vote->delete();
        return response()->json(null, 204);
    }
}

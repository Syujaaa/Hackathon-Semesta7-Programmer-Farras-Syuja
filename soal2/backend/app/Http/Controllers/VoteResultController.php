<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VoteResult;

class VoteResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(VoteResult::with(['event', 'candidate'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'event_id' => 'required|exists:events,id',
            'candidate_id' => 'required|exists:candidates,id',
            'total_votes' => 'required|integer|min:0',
            'percentage' => 'required|numeric|min:0|max:100',
        ]);
        $voteResult = VoteResult::create($data);
        return response()->json($voteResult, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(VoteResult::with(['event', 'candidate'])->findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $voteResult = VoteResult::findOrFail($id);
        $voteResult->update($request->all());
        return response()->json($voteResult);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $voteResult = VoteResult::findOrFail($id);
        $voteResult->delete();
        return response()->json(['message' => 'Vote result deleted']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VotingPeriod;

class VotingPeriodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(VotingPeriod::latest()->first());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date|after:now',
            'end_date' => 'required|date|after:start_date',
        ]);

        VotingPeriod::truncate();

        $period = VotingPeriod::create($request->only('start_date', 'end_date'));

        return response()->json([
            'message' => 'Periode voting berhasil dijadwalkan!',
            'data' => $period
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function check()
    {
        $period = VotingPeriod::latest()->first();

        if (!$period) {
            return response()->json(['status' => 'not_set']);
        }

        $now = Carbon::now();
        if ($now->lt($period->start_date)) {
            return response()->json(['status' => 'not_started']);
        } elseif ($now->between($period->start_date, $period->end_date)) {
            return response()->json(['status' => 'active']);
        } else {
            return response()->json(['status' => 'ended']);
        }
    }
}

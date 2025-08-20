<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $draw = $request->get('draw');
        $start = (int) $request->get('start', 0);
        $length = (int) $request->get('length', 10);
        $search = $request->input('search.value');

        $query = Event::query();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $recordsTotal = Event::count();
        $recordsFiltered = $query->count();


        $columns = ['title', 'description'];
        $orderColumnIndex = $request->input('order.0.column', 0);
        $orderDir = $request->input('order.0.dir', 'asc');

        if (isset($columns[$orderColumnIndex])) {
            $query->orderBy($columns[$orderColumnIndex], $orderDir);
        } else {
            $query->orderBy('id', 'desc');
        }


        $Evens = $query->skip($start)->take($length)->withCount('Kandidat')->get();

        return response()->json([
            'draw' => intval($draw),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $Evens,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after_or_equal:start_date',
        ]);

        $event = Event::create($request->only([
            'title',
            'description',
            'start_at',
            'end_at'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Event berhasil dibuat',
            'data' => $event
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $event
        ], 200);
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
        $event = Event::findOrFail($id);
        $event->delete();

        return response()->json();
    }
}

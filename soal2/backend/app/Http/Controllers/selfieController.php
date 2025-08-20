<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SelfieController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'selfie' => 'required|string',
        ]);

        try {

            $image = $request->input('selfie');


            $image = preg_replace('/^data:image\/\w+;base64,/', '', $image);
            $image = str_replace(' ', '+', $image);


            $imageData = base64_decode($image);


            $filename = 'selfies/' . uniqid() . '.jpg';

          
            Storage::disk('public')->put($filename, $imageData);

            return response()->json([
                'success' => true,
                'message' => 'Selfie berhasil disimpan',
                'path' => Storage::url($filename),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal simpan foto',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

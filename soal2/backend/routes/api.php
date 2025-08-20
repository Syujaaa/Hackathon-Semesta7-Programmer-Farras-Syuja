<?php

use App\Http\Controllers\ModuleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SelfieController;
use App\Http\Controllers\VotingPeriodController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::apiResource('modules', ModuleController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', UserController::class);
Route::apiResource('events', EventController::class);
Route::apiResource('candidates', CandidateController::class);
Route::apiResource('votes', VoteController::class);
Route::apiResource('notifications', NotificationController::class);
Route::apiResource('audit-logs', AuditLogController::class);

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/check-token', function (Request $request) {
        return response()->json([
            'success' => true,
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'role' => $request->user()->role,
            ]
        ]);
    });

});

// Route::get('/events', [EventController::class, 'index']);     // ?scope=active|archived|upcoming|all
// Route::post('/events', [EventController::class, 'store']);
// Route::get('/events/{event}', [EventController::class, 'show']);

// Route::get('/events/datatable', [EventController::class, 'datatable']); // DataTables server-side
// Route::delete('/events/{event}', [EventController::class, 'destroy']);
// Route::middleware(['auth'])->group(function () {
// });

Route::resource('events', EventController::class);
Route::post('/events/{eventId}/candidates', [CandidateController::class, 'store']);
Route::get('/events/{eventId}/candidates', [CandidateController::class, 'getCandidates']);

Route::post('/vote-selfie', function (Request $request) {
    if ($request->hasFile('photo')) {
        $path = $request->file('photo')->store('selfies', 'public');

        return response()->json([
            'success' => true,
            'message' => 'Foto berhasil disimpan',
            'path' => $path
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Tidak ada foto terkirim'
    ], 400);
});

Route::post('/vote/selfie', [SelfieController::class, 'store']);


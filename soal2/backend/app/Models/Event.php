<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\Candidate;

class Event extends Model
{

    protected $fillable = [
        'title',
        'description',
        'start_at',
        'end_at',
        'status',
    ];

    protected $dates = [
        'start_at',
        'end_at',
    ];

    public function getStatusAttribute($value)
    {
        $now = Carbon::now();

        if ($now->lt($this->start_at)) {
            return 'upcoming';
        } elseif ($now->between($this->start_at, $this->end_at)) {
            return 'active';
        } else {
            return 'ended';
        }
    }

    public function Kandidat()
    {
        return $this->hasMany(Candidate::class, 'event_id', 'id');
    }
}

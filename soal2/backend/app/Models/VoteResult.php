<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VoteResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'candidate_id',
        'total_votes',
        'percentage'
    ];

    public function event() {
        return $this->belongsTo(Event::class);
    }

    public function candidate() {
        return $this->belongsTo(Candidate::class);
    }
}

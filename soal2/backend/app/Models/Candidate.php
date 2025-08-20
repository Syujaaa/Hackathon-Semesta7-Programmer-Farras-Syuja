<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'name',
        'photo',
        'vision',
        'mission',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}

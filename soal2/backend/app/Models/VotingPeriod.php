<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VotingPeriod extends Model
{
    protected $fillable = ['start_date', 'end_date'];
    protected $dates = ['start_date', 'end_date'];
}

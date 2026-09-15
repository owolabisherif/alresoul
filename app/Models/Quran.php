<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quran extends Model
{
    protected $casts = [
        'script' => 'array',
    ];
}

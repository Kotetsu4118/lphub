<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Later_flag extends Model
{
    const UPDATED_AT = null;
    use HasFactory;
    protected $table = 'later_flag';
}

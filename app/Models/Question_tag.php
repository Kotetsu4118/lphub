<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question_tag extends Model
{
    protected $table = 'question_tag';
    const UPDATED_AT = null;
    const CREATED_AT = null;
    use HasFactory;
}

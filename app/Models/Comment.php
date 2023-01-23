<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use HasFactory;
    
    protected $fillable = [
      'body',
      'user_id',
      'question_id',
    ];
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function question(){
        return $this->belongsTo(Question::class);
    }
}

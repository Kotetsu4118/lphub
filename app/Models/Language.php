<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = [
      'name',
    ];
    use HasFactory;
    
    public function question(){
        return $this->hasMany(Question::class);
    }
    
    public function tag(){
        return $this->hasMany(Tag::class);
    }
    
}

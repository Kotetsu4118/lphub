<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
      'name',
      'language_id'
    ];
    
    use HasFactory;
    
    public function question(){
        return $this->belongsToMany(Question::class);
    }
    
    public function language(){
        return $this->belongsTo(Language::class);
    }
}

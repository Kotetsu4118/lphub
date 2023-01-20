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
    public $timestamps = false;
    
    public function question(){
        return $this->belongsToMany(Question::class);
    }
    
    public function language(){
        return $this->belongsTo(Language::class);
    }
    
    public function getByTag(int $limit_count=5){
        return $this->question()->with('tag')->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
        
}

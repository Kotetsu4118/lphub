<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
      'title',
      'body',
      'answer',
      'language_id',
      'user_id'
    ];
    use HasFactory;
    
    public function getPaginateByLimit(int $limit_count = 20){
        // orderByの引数を動的に変えるのはどうするんや
        return $this->orderBy('updated_at', 'DESC')->paginate($limit_count);
        
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function tag(){
        return $this->belongsToMany(Tag::class)->using();
    }
    
    public function language(){
        return $this->belongsTo(Language::class);
    }
    
}

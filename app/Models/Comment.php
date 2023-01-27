<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

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
    
    public function g4c_belongs2many(){
        return $this->belongsToMany(User::class, 'good4comments');
    }
    
    public function g4c_hasmany(){
        return $this->hasMany(Good4comment::class);
    }
    
    
    // 関連削除
    public static function boot()
    {
        
        
        parent::boot();
        
        static::deleting(function ($comment) {
            DB::transaction(function () use (&$comment) {
                $comment->g4c_belongs2many()->detach();
            });
        });
    }
    
}

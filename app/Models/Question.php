<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

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
    
    // public function getBySearchword(int $limit_count = 20){
    //     return $this;
    // }
    
    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function complete_flag(){
        return $this->belongsToMany(User::class, 'complete_flag');
    }
    
    public function later_flag(){
        return $this->belongsToMany(User::class, 'later_flag');
    }
    
    public function tag(){
        return $this->belongsToMany(Tag::class);
    }
    
    public function language(){
        return $this->belongsTo(Language::class);
    }
    
    public function comment(){
        return $this->hasMany(Comment::class);
    }
    
    public function level_belongs2many(){
        return $this->belongsToMany(User::class, 'question_levels');
    }
    
    public function level_hasmany(){
        return $this->hasMany(Question_level::class);
    }
    
    public function g4q_belongs2many(){
        return $this->belongsToMany(User::class, 'good4questions');
    }
    
    public function g4q_hasmany(){
        return $this->hasMany(Good4question::class);
    }
    
    public function g4c_belongs2many(){
        return $this->belongsToMany(User::class, 'good4comments');
    }
    
    // public function g4c_hasmany(){
    //     return $this->hasMany(User::class, 'good4comments');
    // }

    
    // 関連削除
    public static function boot()
    {
        
        
        parent::boot();
        
        static::deleting(function ($question) {
            DB::transaction(function () use (&$question) {
                $question->complete_flag()->detach();
                $question->later_flag()->detach();
                $question->level_belongs2many()->detach();
                $question->g4q_belongs2many()->detach();
                $question->comment()->each(function ($comment){
                    $comment->delete();
                });
                $question->tag()->detach();
            
            });
        });
    }
    
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable
{
    use SoftDeletes;
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_icon_path',
        'profile',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    
    
    // リレーション
    public function question(){
        return $this->hasMany(Question::class);
    }
    
    public function complete_flag(){
        return $this->belongsToMany(Question::class, 'complete_flag');
    }
    
    public function later_flag(){
        return $this->belongsToMany(Question::class, 'later_flag');
    }
    
    
    public function comment(){
        return $this->hasMany(Comment::class);
    }
    
    public function level(){
        return $this->belongsToMany(Question::class, 'question_levels');
    }
    
    public function g4q(){
        return $this->belongsToMany(Question::class, 'good4questions');
    }
    
    public function g4c(){
        return $this->belongsToMany(Question::class, 'good4comments');
    }
    
    // 関連削除
    public static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            DB::transaction(function () use (&$user) {
                $user->complete_flag()->detach();
                $user->later_flag()->detach();
                $user->g4q()->detach();
                $user->g4c()->detach();
                $user->level()->detach();
                $user->comment()->each(function ($comment){
                    $comment->delete();
                    
                });
                
                $user->question()->each(function ($question){
                    $question->delete();
                });
                
            });
        });
    }
    
}

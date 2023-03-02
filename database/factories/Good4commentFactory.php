<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Good4comment>
 */
class Good4commentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     
    public function random_user_id(){
        $users = DB::table('users')->where('deleted_at', null)->get();
        $index = random_int(0, count($users) - 1);
        
        return $users[$index]->id;
    }
    
    public function random_comment_id(){
        $comments = DB::table('comments')->where('deleted_at', null)->get();
        $index = random_int(0, count($comments) - 1);
        
        return $comments[$index]->id;
    } 
    
    public function check($user_id, $comment_id){
        if($user_id == DB::table('comments')->find($comment_id)->user_id){
            return true;
        }
        return DB::table('good4comments')->where('user_id', $user_id)->where('comment_id', $comment_id)->exists();
    }
     
    public function definition()
    {
        $user_id = Good4commentFactory::random_user_id();
        $comment_id = Good4commentFactory::random_comment_id();
        
        while(Good4commentFactory::check($user_id, $comment_id)){
            $user_id = Good4commentFactory::random_user_id();
            $comment_id = Good4commentFactory::random_comment_id();
        }
        
        return [
            'user_id'=>$user_id,
            'comment_id'=>$comment_id
        ];
    }
}

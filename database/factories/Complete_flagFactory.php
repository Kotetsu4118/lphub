<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complete_flag>
 */
class Complete_flagFactory extends Factory
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
    
    public function random_question_id(){
        $questions = DB::table('questions')->where('deleted_at', null)->get();
        $index = random_int(0, count($questions) - 1);
        
        return $questions[$index]->id;
    }
    
    public function check($user_id, $question_id){
        if($user_id == DB::table('questions')->find($question_id)->user_id){
            return true;
        }
        return DB::table('question_levels')->where('user_id', $user_id)->where('question_id', $question_id)->exists();
    }
     
    public function definition()
    {
        $user_id = Complete_flagFactory::random_user_id();
        $question_id = Complete_flagFactory::random_question_id();
        
        while(Complete_flagFactory::check($user_id, $question_id)){
            $user_id = Complete_flagFactory::random_user_id();
            $question_id = Complete_flagFactory::random_question_id();
        }
        
        return [
            'user_id'=>$user_id,
            'question_id'=>$question_id,
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
 
class CommentFactory extends Factory
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
     
    public function definition()
    {   

        return [
            'body' => fake()->text($maxNbChars = 390),
            'user_id' => CommentFactory::random_user_id(),
            'question_id' => CommentFactory::random_question_id(),
        ];
    }
    
    
}

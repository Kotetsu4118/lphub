<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
     
    public function random_user_id(int $seed){
        if($seed==0){
            return 1;
        }
        if($seed==1){
            return 17;
        }
        else{
            return 19;
        }
    }
     
    public function definition()
    {   

        return [
            'body' => fake()->text($maxNbChars = 20),
            'user_id' => CommentFactory::random_user_id(mt_rand(0,2)),
            'question_id' => mt_rand(76, 117)
        ];
    }
    
    
}

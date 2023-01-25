<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    
    public function random_language_id(int $seed){
        if($seed==0){
            return mt_rand(1, 2);
        }
        if($seed==1){
            return mt_rand(4, 5);
        }
    }
    
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
            'title' => fake()->word,
            'body' => fake()->text($maxNbChars = 20),
            'answer' => fake()->text($maxNbChars = 20),
            'language_id' => QuestionFactory::random_language_id(mt_rand(0, 1)),
            'user_id' => QuestionFactory::random_user_id(mt_rand(0, 2)),
        ];
    }
}

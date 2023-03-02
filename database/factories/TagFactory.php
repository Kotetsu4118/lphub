<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     
     
    public function random_language_id(){
        $languages = DB::table('languages')->get();
        $index = random_int(0, count($languages) - 1);
        
        return $languages[$index]->id;
    } 
     
     
    public function definition()
    {
        return [
            'name' => fake()->word,
            'language_id' => TagFactory::random_language_id(),
        ];
    }
}

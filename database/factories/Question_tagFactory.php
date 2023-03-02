<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question_tag>
 */
class Question_tagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
     
    public function random_tag_id($language_id){
        $tags = DB::table('tags')->where('language_id', $language_id)->get();
        $index = random_int(0, count($tags) - 1);
        
        return $tags[$index]->id;
    }
    
    public function random_question_id(){
        $questions = DB::table('questions')->where('deleted_at', null)->get();
        $index = random_int(0, count($questions) - 1);
        
        return $questions[$index]->id;
    } 
    
    public function check($tag_id, $question_id){
        return DB::table('question_tag')->where('tag_id', $tag_id)->where('question_id', $question_id)->exists();
    } 
     
    public function definition()
    {
        $question_id = Question_tagFactory::random_question_id();
        $language_id = DB::table('questions')->find($question_id)->language_id;
        $tag_id = Question_tagFactory::random_tag_id($language_id);
        
        while(Question_tagFactory::check($tag_id, $question_id)){
            $question_id = Question_tagFactory::random_question_id();
            $language_id = DB::table('questions')->find($question_id)->language_id;
            $tag_id = Question_tagFactory::random_tag_id($language_id);
        }
        
        return [
            'question_id'=>$question_id,
            'tag_id'=>$tag_id,
        ];
    }
}

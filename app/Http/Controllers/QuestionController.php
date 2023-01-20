<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Language;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\QuestionRequest;

// リクエスト後で作ってuse
// 連携するmodelを後で作ってuse

class QuestionController extends Controller
{
    public function home(Question $question, Language $languages, Tag $tags){
        return view('questions/home')->with([
            'questions'=>$question->getPaginateByLimit(),
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            
        ]);
    }
    
    public function home_search(Question $questions, Language $languages, Tag $tags, Request $request){
        $query = Question::query();
        
        $search_word = $request->search_word;
        $spaceConversion = mb_convert_kana($search_word, 's');
        $wordArraySearched = preg_split('/[\s,]+/', $spaceConversion, -1, PREG_SPLIT_NO_EMPTY);
        
        foreach($wordArraySearched as $word){
            $query->where('title', 'like', '%'.$word.'%')->orwhere('body', 'like', '%'.$word.'%')->orwhere('answer', 'like', '%'.$word.'%');
        }
        
        
        $searced_questions = $query->paginate(20);
        
        return view('questions/home_search')->with([
            'questions'=>$searced_questions,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'search_word'=>$search_word
        ]);
        
    }
    
    public function q_view(Question $question){
        return view('questions/q_view')->with([
            'question'=>$question,
            'tags'=>$question->tag()->get(),
        ]);
    }
    
    public function create_q(Language $languages, Tag $tags){
        return view('questions/create_q')->with([
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get()
        ]);
    }
    
    public function store_q(QuestionRequest $request, Question $question){
        $question->user_id = Auth::user()->id;
        $question->fill($request['question']);
        $question->language_id = $request->language_id;
        $question->save();
        $question->tag()->sync($request['tags']);
        
        return redirect('/questions/'.$question->id);
    }
    
    public function edit_q(Question $question, Language $languages, Tag $tags){
        // くそコードだから、上手く書き直したい（idを配列形式でcheceked_tag）
        $list = [];
        foreach($question->tag()->select('tags.id')->get() as $i){
            array_push($list, $i['id']);
        }
        
        
        return view('questions/edit_q')->with([
            'question'=>$question,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'checked_tag'=>$list,
        ]);
    }
    
    public function update_q(QuestionRequest $request, Question $question){
        
        // $request->validateWithBag('userDeletion', [
        //     'password' => ['required', 'current-password'],
        // ]);
        
        $question->fill($request['question']);
        $question->language_id = $request->language_id;
        $question->tag()->sync($request['tags']);
        $question->save();
        
        return redirect('/questions/'.$question->id);
    }
    
    public function delete_q(QuestionRequest $request, Question $question){
        $question->delete();
        return redirect('/');
    }
    
}

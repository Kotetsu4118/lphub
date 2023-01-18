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
    public function home(Question $question, Language $languages, Tag $tags, User $users){
        return view('products/home')->with([
            'questions'=>$question->getPaginateByLimit(),
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'users'=>$users->get()
            
        ]);
    }
    
    public function q_view(Question $question, Tag $tags){
        return view('products/q_view')->with([
            'question'=>$question,
            'tags'=>$question->tag()->get(),
            // 'user'=>$question->user()->get()
        ]);
    }
    
    public function create_q(Language $languages, Tag $tags){
        if(Auth::user()==NULL){
            return view('auth/login');
        }
        
        return view('products/create_q')->with([
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get()
        ]);
    }
    
    public function store_q(QuestionRequest $request, Question $question){
        $question->user_id = Auth::user()->id;
        $question->fill($request['question']);
        $question->language_id = $request->language_id;
        $question->save();
        $question->tag()->attach($request['tags']);
        
        return redirect('/questions/'.$question->id);
    }
    
    public function edit_q(Question $question, Language $languages, Tag $tags){
        // くそコードだから、上手く書き直したい（idを配列形式でcheceked_tag）
        $list = [];
        foreach($question->tag()->select('tags.id')->get() as $i){
            array_push($list, $i['id']);
        }
        
        
        return view('products/edit_q')->with([
            'question'=>$question,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'checked_tag'=>$list,
        ]);
    }
    
    public function update_q(QuestionRequest $request, Question $question){
        $question->fill($request['question']);
        $question->language_id = $request->language_id;
        $question->save();
        
        return redirect('/questions/'.$question->id);
    }
    
}

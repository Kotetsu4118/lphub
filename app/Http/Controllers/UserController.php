<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Language;
use App\Models\Tag;
use App\Models\User;
use App\Models\Question_level;
use App\Models\Good4question;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    
    public function create_rank(User $user){
        
        $users = $user->withCount('question')->orderBy('question_count', 'desc')->orderBy('created_at', 'desc')->paginate(20);
        
        return view('user_rank/create_rank')->with([
            'users'=>$users,
        ]);
    }
    
    public function g4q_rank(User $user){
        $users = $user->withCount('g4q')->orderBy('g4q_count','desc')->orderBy('created_at', 'desc')->paginate(20);
        
        return view('user_rank/g4q_rank')->with([
            'users'=>$users,
        ]);
    }
    
    public function home_user(Request $request, User $user, Language $languages, Tag $tags, Question_level $question_levels){
        $user_id = $request->user_id;
        
        $questions = $user->find($user_id)->question()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany');
        
        if(Auth::user()){
            $questions = $questions->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }]);
        }
        
        $questions = $questions->orderBy('updated_at', 'DESC')->paginate(20);
        
        return view('questions/home_user')->with([
            'questions'=>$questions,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'user'=>$user->find($user_id, 'name'),
        ]);
    }
}

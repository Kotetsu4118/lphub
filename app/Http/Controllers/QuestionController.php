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
use App\Http\Requests\QuestionRequest;
use App\Http\Requests\DeleteRequest;

// リクエスト後で作ってuse
// 連携するmodelを後で作ってuse

class QuestionController extends Controller
{
    public function home(Question $question, Language $languages, Tag $tags, Question_level $question_levels){
        
        $questions = $question->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany');
        
        if(Auth::user()){
            $questions = $questions->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }]);
        }
        
        $questions = $questions->orderBy('updated_at', 'DESC')->paginate(20);
        
        
        
        return view('questions/home')->with([
            'questions'=>$questions,
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
        
        
        $searced_questions = $query->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->orderBy('updated_at', 'DESC')->paginate(20);
        
        return view('questions/home_search')->with([
            'questions'=>$searced_questions,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'search_word'=>$search_word
        ]);
        
    }
    
    public function q_view(Question $question){
        
        // 難易度系の初期化
        $selected_level=0;
        
        if(Auth::user()){
            $user_id = Auth::user()->id;
            
            // フラグ系
            $complete_flag = $question->complete_flag()->where('users.id', $user_id)->exists();
            $later_flag = $question->later_flag()->where('users.id', $user_id)->exists();
            $good = $question->g4q_belongs2many()->where('users.id', $user_id)->exists();
            
            // 難易度
            $level = $question->level_belongs2many()->where('user_id', $user_id)->pluck('level');
        }
        else{
            $level = false;
            $complete_flag = false;
            $later_flag = false;
            $good = false;
        }
        
        // 難易度が設定されていれば更新
        if($level && count($level)!=0){
            $selected_level=$level[0];
        }
        
        // 選択済み難易度といいね数を追加
        $question_with = $question->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->where('id', $question->id)->get();
        
        
        // コメント
        $comments = $question->comment()->withCount('g4c_hasmany');
        
        if(Auth::user()){
            $comments = $comments->withExists(['g4c_hasmany'=> function ($q){
                    $q->where('user_id', Auth::user()->id);
                }]);
        }
        
        $comments = $comments->orderby('created_at')->get();
        
        return view('questions/q_view')->with([
            'question'=>$question_with[0],
            'tags'=>$question->tag()->get(),
            'comments'=>$comments,
            'complete_flag' => $complete_flag,
            'later_flag' => $later_flag,
            'selected_level' => $selected_level,
            'good' => $good,
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
    
    public function delete_q(DeleteRequest $request, Question $question){
        $question->delete();
        return redirect('/');
    }
    
    
    // フラグ管理
    public function update_flags(Request $request, Question $question){
        $question->complete_flag()->sync($request->complete_flag);
        $question->later_flag()->sync($request->later_flag);
        
        return redirect('/questions/'.$question->id);
    }
    
    
    // マイページ系
    public function mypage(){
        $user = Auth::user();
        $completes = $user->complete_flag()->count();
        $laters = $user->later_flag()->count();
        $creates = $user->question()->count();
        $comments = $user->comment()->count();
        
        return view('mypage/mypage')->with([
            'completes' => $completes,
            'laters' => $laters,
            'creates' => $creates,
            'comments' => $comments,
        ]);
    }
    
    // 完了した問題
    public function my_completes(){
        $user = Auth::user();
        $questions = $user->complete_flag()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->orderBy('updated_at', 'DESC')->paginate(20);
        
        return view('mypage/completes')->with([
            'questions'=>$questions,
            'flag_type'=>'complete',
        ]);
    }
    
    // フラグ選択削除
    public function delete_complete_flags(Request $request){
        $user = Auth::user();
        $user->complete_flag()->detach($request['complete_flags']);
        
        return redirect(route('my_completes'));
    }
    
    // 後で解く問題
    public function my_laters(){
        $user = Auth::user();
        $questions = $user->later_flag()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->orderBy('updated_at', 'DESC')->paginate(20);
        
        return view('mypage/laters')->with([
            'questions'=>$questions,
            'flag_type'=>'later',
        ]);
    }
    
    // フラグ選択削除
    public function delete_later_flags(Request $request){
        $user = Auth::user();
        $user->later_flag()->detach($request['later_flags']);
        
        return redirect(route('my_laters'));
    }
    
    // 作成した問題
    public function my_creates(){
        $user = Auth::user();
        $questions = $user->question()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->orderBy('updated_at', 'DESC')->paginate(20);
        
        return view('mypage/creates')->with([
            'questions'=>$questions,
            'flag_type'=>'delete',
        ]);
    }
    
    // フラグ選択削除
    public function delete_creates(Request $request, Question $question){
        foreach($request['questions'] as $question_id){
            $question->where('id', $question_id)->delete();
        }
        
        return redirect(route('my_creates'));
    }
    
    // コメント
    public function my_comments(Question $question){
        $user = Auth::user();
        $comments = $user->comment()->withCount('g4c_hasmany')->withExists(['g4c_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->orderby('question_id')->get();
        
        
        $comments_group = $comments->groupby('question_id')->toArray();
        
        
        
        $questions = [];
        foreach($comments_group as $group){
            array_push($questions, $question->where('id', $group[0]['question_id'])->get()->toArray()  );
        }
        
        return view('mypage/comments')->with([
            'comments_group'=>$comments_group,
            'questions'=>$questions,
        ]);
    }
    
    
    // 難易度管理
    public function update_level(Question $question, Request $request){
        $id = Auth::user()->id;
        $question->level_belongs2many()->syncWithPivotValues([$id], ['level' => $request->level], false);
        
        return redirect('/questions/'.$question->id);
    }
    
    // 問題へのいいね管理
    public function g4q(Request $request, Question $question){
        $question->g4q_belongs2many()->syncWithoutDetaching($request->good);
        
        return redirect('/');
    }
    
    
    
}

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
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class QuestionController extends Controller
{   
    
    // 戻るなり
    public function back() {

    return back();

    }
    
    
    // home
    public function home(Question $question, Language $languages, Tag $tags,){
        // 'status' => session('status'), いるかどうかわからん

        $questions = $question->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withCount('comment');
        
        if(Auth::user()){
            $questions = $questions->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }]);
            
        }
        
        $questions = $questions->with(['user', 'tag'])->get();

        return Inertia::render('Questions/Home', [
            'questions'=>$questions,
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
        ]);
    }
    
    
    // 問題詳細
    public function view_q(Question $question){
        
        // 難易度系の初期化
        $selected_level=null;
        
        if(Auth::user()){
            $user_id = Auth::user()->id;
            // フラグ系
            $complete_flag = $question->complete_flag()->where('users.id', $user_id)->exists();
            $later_flag = $question->later_flag()->where('users.id', $user_id)->exists();
            $g4q = $question->g4q_belongs2many()->where('users.id', $user_id)->exists();
            
            // 難易度
            $level = $question->level_belongs2many()->where('user_id', $user_id)->pluck('level');
        }
        else{
            $level = false;
            $complete_flag = false;
            $later_flag = false;
            $g4q = false;
        }
        
        // 難易度が設定されていれば更新
        if($level && count($level)!=0){
            $selected_level=$level[0];
        }
        
        // 選択済み難易度といいね数を追加
        $question_with = $question->with('user')->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->find($question->id);
        
        // コメント
        $comments = $question->comment()->withCount('g4c_hasmany');
        
        if(Auth::user()){
            $comments = $comments->withExists(['g4c_hasmany'=> function ($q){
                    $q->where('user_id', Auth::user()->id);
                }]);
        }
        
        $comments = $comments->with('user')->orderby('created_at')->get();
        
        return Inertia::render('Questions/ViewQ', [
            'question'=>$question_with,
            'tags'=>$question->tag()->get(),
            'comments'=>$comments,
            'complete_flag' => $complete_flag,
            'later_flag' => $later_flag,
            'selected_level' => $selected_level,
            'g4q' => $g4q,
        ]);
    }
    
    
    public function create_q(Language $languages, Tag $tags){
        return Inertia::render('Questions/CreateQ',[
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
        ]);
    }
    
    
    public function store_q(QuestionRequest $request, Question $question){
        $question->user_id = Auth::user()->id;
        $question->fill($request->validated());
        $question->language_id = $request->language_id;
        $question->save();
        $question->tag()->sync($request['post_tags']);
        
        return redirect(route('view_q',$question->id));
    }
    
    
    public function edit_q(Question $question, Language $languages, Tag $tags){
        // くそコードだから、上手く書き直したい（idを配列形式でcheceked_tag）
        $list = [];
        foreach($question->tag()->select('tags.id')->get() as $i){
            array_push($list, $i['id']);
        }
        
        
        return Inertia::render('Questions/EditQ',[
            'question'=>$question->with('language')->find($question->id),
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get(),
            'checked_tag'=>$list,
        ]);
    }
    
    public function update_q(QuestionRequest $request, Question $question){
        $question->fill($request->validated());
        $question->language_id = $request->language_id;
        $question->tag()->sync($request['put_tags']);
        $question->save();
        
        return redirect('/questions/'.$question->id);
    }
    
    public function delete_q(DeleteRequest $request, Question $question){
        $question->delete();
        return redirect('/');
    }
    
    
    // フラグ管理
    // 完了
    public function update_complete(Request $request, Question $question){
        if($request->complete){
            $question->complete_flag()->sync(Auth::user()->id);
        }else{
            $question->complete_flag()->detach(Auth::user()->id);
        }
    }
    // 後で
    public function update_later(Request $request, Question $question){
        if($request->later){
            $question->later_flag()->sync(Auth::user()->id);
        }else{
            $question->later_flag()->detach(Auth::user()->id);
        }
    }
    
    
    // マイページ系
    public function mypage(){
        $user = Auth::user();
        $completes = $user->complete_flag()->count();
        $laters = $user->later_flag()->count();
        $creates = $user->question()->count();
        $comments = $user->comment()->count();
        
        return Inertia::render('Mypages/MypageTop', [
            'completes' => $completes,
            'laters' => $laters,
            'creates' => $creates,
            'comments' => $comments,
        ]);
    }
    
    // 完了した問題
    public function my_completes(){
        $user = Auth::user();
        $questions = $user->complete_flag()->with('user')->with('tag')->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withCount('comment')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->get();
        
        return Inertia::render('Mypages/MyPageQuestions', [
            'questions'=>$questions,
            'languages'=> DB::table('languages')->get(),
            'status'=>'completes',
        ]);
    }
    
    // フラグ選択削除
    // 完了
    public function delete_complete_flags(Request $request){
        $user = Auth::user();
        $user->complete_flag()->detach($request['checked']);
        
        return redirect(route('my_completes'));
    }
    
    // 後で解く問題
    public function my_laters(){
        $user = Auth::user();
        $questions = $user->later_flag()->with('user')->with('tag')->withAvg('level_hasmany', 'level')->withCount('comment')->withCount('g4q_hasmany')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->get();
            
        
        return Inertia::render('Mypages/MyPageQuestions', [
            'questions'=>$questions,
            'languages'=> DB::table('languages')->get(),
            'status'=>'laters',
        ]);
    }
    
    // フラグ選択削除
    // 後で
    public function delete_later_flags(Request $request){
        $user = Auth::user();
        $user->later_flag()->detach($request['checked']);
        
        return redirect(route('my_laters'));
    }
    
    // 作成した問題
    public function my_creates(){
        $user = Auth::user();
        $questions = $user->question()->with('tag')->withAvg('level_hasmany', 'level')->withCount('comment')->withCount('g4q_hasmany')->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }])->get();
        
        return Inertia::render('Mypages/MyPageQuestions')->with([
            'questions'=>$questions,
            'languages'=> DB::table('languages')->get(),
            'status'=>'creates',
        ]);
    }
    
    // フラグ選択削除
    // 作成した問題
    public function delete_creates(Request $request, Question $question){
        $question->whereIn('id', $request->checked)->each(function ($q){
                $q->delete();
            });
        
        return redirect(route('my_creates'));
    }
    
    // コメント一覧
    public function my_comments(Question $question){
        $user = Auth::user();
        $comments = $user->comment()->withCount('g4c_hasmany as g4c')
            ->orderby('created_at')->get();
        
        $Q_comments=$user->comment()->withCount('g4c_hasmany as g4c')
            ->orderby('question_id')->orderby('created_at')->get()->groupby('question_id')->toArray();
        
        $questions = $question->whereIn('id', array_keys($Q_comments))->orderby('title')->get();

        return Inertia::render('Mypages/MyComments', [
            'questions'=>$questions,
            'comments'=>$comments,
            'Q_comments'=>$Q_comments,
        ]);
    }
    
    
    // 難易度管理
    public function update_level(Question $question, Request $request){
        $id = Auth::user()->id;
        $question->level_belongs2many()->syncWithPivotValues([$id], ['level' => $request->level], false);
        
        // return redirect('/questions/'.$question->id);
    }
    
    // 問題へのいいね管理
    public function g4q(Request $request, Question $question){
        if($request->g4q){
            // $question->g4q_belongs2many()->syncWithoutDetaching($request->good);
            $question->g4q_belongs2many()->sync(Auth::user()->id);
        }else{
            $question->g4q_belongs2many()->detach(Auth::user()->id);
        }
    }
    
    
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Comment;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\DeleteRequest;
use Inertia\Inertia;


class CommentController extends Controller
{
    public function store_c(CommentRequest $request, Comment $comment, Question $question){
        $comment->body = $request->comment;
        $comment->user_id = Auth::user()->id;
        $comment->question_id = $question->id;
        $comment->save();
        
        return redirect('/questions/'.$question->id);
    }
    
    
    public function edit_c(Comment $comment){
        return Inertia::render('Comments/EditComment', [
            'comment' => $comment->with('question')->find($comment->id),
        ]);
    }
    
    public function update_c(CommentRequest $request, Comment $comment){
        $comment->body = $request->comment;
        $comment->save();
        // $id = $comment->question()->get()[0]->id;
        $id = $comment->question()->id;
        dd($id);
        
        return redirect('/questions/'.$id);
    }
    
    public function destroy_c(DeleteRequest $request, Comment $comment){
        $id = $comment->question()->get()[0]->id;
        $comment->delete();
        return redirect(route('view_q', $id));
    }
    
    public function delete_c(Comment $comment, Request $request){
        $comment->whereIn('id', $request->checked)->delete();
    }
    
    // コメントへのいいね管理
    // コメントへのいいね管理
    public function g4c(Request $request, Comment $comment){
        if($request->g4c){
            $comment->g4c_belongs2many()->sync(Auth::user()->id);
        }else{
            $comment->g4c_belongs2many()->detach(Auth::user()->id);
        }
        
        // $question->g4c_belongs2many()->syncWithoutDetaching($request->good);
        
    }
}

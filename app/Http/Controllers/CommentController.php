<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Question;
use App\Models\Comment;
use App\Http\Requests\CommentRequest;
use App\Http\Requests\DeleteRequest;


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
        return view('comments/edit_c')->with('comment',$comment);
    }
    
    public function update_c(CommentRequest $request, Comment $comment){
        $comment->body = $request->comment;
        $comment->save();
        $id = $comment->question()->get()[0]->id;
        
        return redirect('/questions/'.$id);
    }
    
    public function delete_c(DeleteRequest $request, Comment $comment){
        $id = $comment->question()->get()[0]->id;
        $comment->delete();
        return redirect('/questions/'.$id);
    }
}

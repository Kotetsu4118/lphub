<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Language;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\TagRequest;
use Illuminate\Support\Facades\Auth;


class TagController extends Controller
{   
    public function index_t(Tag $tags, Language $languages){
        return view('tags/index_t')->with([
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get()
        ]);
    }
    
    public function create_t(Language $languages, Tag $tags){
        return view('tags/create_t')->with([
            'languages'=>$languages->get(),
            'tags'=>$tags->get(),
        ]);
    }
    
    public function edit_t(Language $languages, Tag $tag){
        return view('tags/edit_t')->with([
            'languages'=>$languages->get(),
            'tag'=>$tag,
        ]);
    }
    
    public function store_t(TagRequest $request, Tag $tag){
        $tag->name = $request->name;
        $tag->language_id = $request->language_id;
        $tag->save();
        
        return back()->withInput();
    }
    
    public function update_t(TagRequest $request, Tag $tag){
        $tag->name = $request->name;
        $tag->language_id = $request->language_id;
        $tag->save();
        
        return back()->withInput();
    }
    
    public function home_t(Tag $tag){
        
        $questions = $tag->question()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany');
        
        if(Auth::user()){
            $questions = $questions->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }]);
        }
        
        $questions = $questions->orderBy('updated_at', 'DESC')->paginate(20);
        
        
        // $questions = $tag->question()->withAvg('level_hasmany', 'level')->orderBy('updated_at', 'DESC')->paginate(20);
        
        
        return view('tags/home_t')->with([
            'questions'=>$questions,
            'tag_name'=>$tag->name,
            'tags'=>$tag->orderby('name')->get(),
            
        ]);
    }
    
}

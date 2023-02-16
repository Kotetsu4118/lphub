<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Language;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\TagRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class TagController extends Controller
{   
    public function index_t(Tag $tags, Language $languages){
        return Inertia::render('Tags/TagIndex', [
            'languages'=>$languages->get(),
            'tags'=>$tags->orderby('name')->get()
        ]);
    }
    
    public function create_t(Language $languages, Tag $tags){
        return Inertia::render('Tags/CreateTag', [
            'languages'=>$languages->get(),
        ]);
    }
    
    public function edit_t(Language $languages, Tag $tag){
        return Inertia::render('Tags/EditTag', [
            'languages'=>$languages->get(),
            'tag'=>$tag,
        ]);
    }
    
    public function store_t(TagRequest $request, Tag $tag){
        $tag->fill($request->validated());
        // $tag->name = $request->name;
        // $tag->language_id = $request->language_id;
        $tag->save();
        
        return redirect('/');
    }
    
    public function update_t(TagRequest $request, Tag $tag){
        $tag->name = $request->name;
        $tag->language_id = $request->language_id;
        $tag->save();
        
        return back()->withInput();
    }
    
    public function home_t(Tag $tag, Language $languages){
        
        $questions = $tag->question()->withAvg('level_hasmany', 'level')->withCount('g4q_hasmany')->withCount('comment');
        
        if(Auth::user()){
            $questions = $questions->withExists(['g4q_hasmany'=> function ($q){
                $q->where('user_id', Auth::user()->id);
            }]);
            
        }
        
        $questions = $questions->with(['user', 'tag'])->get();
        
        
        // $questions = $tag->question()->withAvg('level_hasmany', 'level')->orderBy('updated_at', 'DESC')->paginate(20);
        
        
        return Inertia::render('Questions/HomeByTag', [
            'questions'=>$questions,
            'tag_name'=>$tag->name,
            'tags'=>$tag->get(),
            'languages'=>$languages->get(),
            
        ]);
    }
    
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use App\Models\Question;
use App\Models\Language;
use Illuminate\Support\Facades\Redirect;


class TagController extends Controller
{
    public function create_t(Request $request, Language $languages, Tag $tags){
        return view('products/create_t')->with([
            'languages'=>$languages->get(),
            'tags'=>$tags->get(),
        ]);
    }
    
    public function store_t(Request $request, Tag $tag){
        $tag->name = $request->name;
        $tag->language_id = $request->language_id;
        $tag->save();
        
        return Redirect::route('home');
    }
}

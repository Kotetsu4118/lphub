<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Support\Facades\DB;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        
        DB::transaction(function () use (&$request){
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            
            event(new Registered($user));
    
            Auth::login($user);
            
            // ユーザアイコンをs3へ保存
            // ユーザアイコンのパスを取得
            $file = $request->icon;
            if($file !=null){
                $new_user = Auth::user();
                $user_id = (string)$new_user->id;
                $file_name = $user_id."_icon.png";
                $file->storeAs('/user_icon', $file_name, 's3', 'public-read');
                $url = Storage::disk('s3')->url('/user_icon/'.$file_name);
                $new_user->user_icon_path = $url;
                $user->save();
            }
        });
        
        
        
        
        
        

        return redirect(RouteServiceProvider::HOME);
    }
}

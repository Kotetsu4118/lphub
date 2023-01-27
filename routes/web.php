<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


Route::controller(QuestionController::class)->middleware(['auth'])->group(function(){
    Route::post('/questions', 'store_q')->name('sotre_q');
    Route::get('/create_q', 'create_q')->name('create_q');
    Route::get('/questions/{question}/edit_q', 'edit_q')->name('edit_q');
    Route::put('/questions/{question}', 'update_q')->name('update_q');
    Route::delete('/questions/{question}', 'delete_q')->name('delete_q');
    Route::put('/questions/{question}/flags', 'update_flags')->name('update_flags');
    Route::put('/questions/{question}/level', 'update_level')->name('update_level');
    Route::put('/questions{question}/good', 'g4q');
    
    // マイページ系
    Route::get('/mypage', 'mypage')->name('mypage');
    Route::get('/mypage/completes', 'my_completes')->name('my_completes');
    Route::get('/mypage/laters', 'my_laters')->name('my_laters');
    Route::get('/mypage/creates', 'my_creates')->name('my_creates');
    Route::get('/mypage/comments', 'my_comments')->name('my_comments');
    Route::put('/mypage/delete_complete_flags', 'delete_complete_flags')->name('delete_complete_flags');
    Route::put('/mypage/delete_later_flags', 'delete_later_flags')->name('delete_later_flags');
    Route::delete('/mypage/delete_creates', 'delete_creates')->name('delete_creates');
});


Route::get('/', [QuestionController::class, 'home'])->name('home');
Route::get('/home_t/{tag}', [TagController::class, 'home_t'])->name('home_t');
Route::get('home_search/{search_word}', [QuestionController::class, 'home_search'])->name('home_search');
Route::get('/questions/{question}', [QuestionController::class, 'q_view'])->name('q_view');

// 認証つけるか迷いどころ
// タグ系
Route::get('/tags', [TagController::class, 'index_t'])->name('index_t');

Route::controller(TagController::class)->middleware(['auth'])->group(function(){
    Route::get('/create_t', 'create_t')->name('create_t');
    Route::get('/tags/{tag}/edit_t', 'edit_t')->name('edit_t');
    Route::post('/create_t', 'store_t')->name('store_t');
    Route::put('/tags/{tag}', 'update_t')->name('update_t');
});



// コメント系
Route::controller(CommentController::class)->middleware(['auth'])->group(function(){
    Route::post('/questions/{question}/comment', 'store_c')->name('store_c');
    Route::get('/comment/{comment}/edit', 'edit_c')->name('edit_c');
    Route::put('/comment/{comment}/update', 'update_c')->name('update_c');
    Route::delete('/comment/{comment}/delete', 'delete_c')->name('delete_c');
    Route::put('/comment/{comment}/good', 'g4c_belongs2many')
;});





Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

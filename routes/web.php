<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;

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

Route::controller(QuestionController::class)->middleware(['auth'])->group(function(){
    Route::post('/questions', 'store_q')->name('sotre_q');
    Route::get('/create_q', 'create_q')->name('create_q');
    Route::get('/questions/{question}/edit_q', 'edit_q')->name('edit_q');
    Route::put('/questions/{question}', 'update_q')->name('update_q');
    Route::delete('/questions/{question}', 'delete_q')->name('delete_q');
    Route::put('/questions/{question}/complete', 'update_complete')->name('update_complete');
    Route::put('/questions/{question}/later', 'update_later')->name('update_later');
    Route::put('/questions/{question}/level', 'update_level')->name('update_level');
    Route::put('/questions{question}/good', 'g4q')->name('update_g4q');
    
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
Route::get('/practice', [QuestionController::class, 'practice'])->name('practice');
Route::get('/back', [QuestionController::class, 'back'])->name('back');
Route::get('/home_t/{tag}', [TagController::class, 'home_t'])->name('home_t');
Route::get('home_search/{search_word}', [QuestionController::class, 'home_search'])->name('home_search');
Route::get('/questions/{question}', [QuestionController::class, 'view_q'])->name('view_q');

Route::post('/test', [QuestionController::class, 'test'])->name('test');

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
    Route::get('/comments/{comment}/edit', 'edit_c')->name('edit_c');
    Route::put('/comments/{comment}/update', 'update_c')->name('update_c');
    Route::delete('/comments/{comment}/destroy', 'destroy_c')->name('destroy_c');
    Route::delete('/comments/delete', 'delete_c')->name('delete_c');
    Route::put('/comments/{comment}/good', 'g4c')->name('update_g4c');
;});






// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

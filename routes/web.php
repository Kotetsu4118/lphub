<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
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


Route::get('/', [QuestionController::class, 'home'])->name('home');
Route::post('/questions', [QuestionController::class, 'store_q'])->name('sotre_q');
Route::get('/questions/{question}', [QuestionController::class, 'q_view'])->name('q_view');
Route::get('/create_q', [QuestionController::class, 'create_q'])->name('create_q');
Route::get('/questions/{question}/edit_q', [QuestionController::class, 'edit_q'])->name('edit_q');
Route::put('/questions/{question}', [QuestionController::class, 'update_q'])->name('update_q');



Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

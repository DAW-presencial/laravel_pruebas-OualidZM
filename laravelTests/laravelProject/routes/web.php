<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContadorControlador;
use Illuminate\Support\Facades\App;

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

Route::get('/', function () {
    // return "ss";
    return view('welcome');
});

Route::get('{lang}/welcome_form', function ($lang) {
    App::setLocale($lang);
    return view('welcome_form');
});


Route::get('sendForm', function () {
    return "dd";
 });

Route::get('profile/{nameProfile}', function ($nameProfile){
    return "hey " . $nameProfile;
});


//si solo tiene un metódo

// Route::get('/',ContadorControlador::class);

//si tenemos mas de  un metódo
Route::get('/visitas/{contador?}',ContadorControlador::class);

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Country;

use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


//  User routes
Route::post('/user', [UserController::class, "store"]);
Route::patch('/user/{user}/update', [UserController::class, "update"]);
Route::delete('/user/{user}/delete', [UserController::class, "destroy"]);

//  Country routes
Route::get('/countries', [CountryController::class, "index"]);

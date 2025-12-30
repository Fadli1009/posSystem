<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/registrasi', [AuthController::class, 'registrasi']);
Route::group(['middleware'=>'auth:sanctum'], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('barang',BarangController::class)->middleware('auth:sanctum');
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CharacterController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']); // Rota responsável por registrar o usuário
Route::post('/login', [AuthController::class, 'login']); // Rota responsável por logar o usuário 

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/characters', [CharacterController::class, 'store']); // Rota responsável por salvar o personagem 
    Route::put('/characters/{id}', [CharacterController::class, 'update']); // Rota responsável por atualizar o personagem 
    Route::delete('/characters/{id}', [CharacterController::class, 'destroy']); // Rota responsável por deletar o personagem 
});

Route::get('/characters', [CharacterController::class, 'index']); // Rota responsável por consultar os personagens
Route::get('/characters/{id}', [CharacterController::class, 'show']); // Rota responsável por consultar os detalhes de um personagem em específico

<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // Aqui é só pra API, sem redirecionar para login web
        if (!$request->expectsJson()) {
            return route('login');
        }
    }
}

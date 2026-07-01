<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to the Laravel Boilerplate API Template',
        'status' => 'Healthy',
        'framework' => 'Laravel 11.x'
    ]);
});

// Interactive API Explorer — test all endpoints from the browser
Route::get('/explorer', function () {
    return response()->file(public_path('api-explorer.html'));
});


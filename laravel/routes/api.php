<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ItemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider or the bootstrap configuration
| within a group which is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public Authentication Endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Fallback unauthenticated route for browsers/HTML clients redirecting to 'login'
Route::get('/login', function () {
    return response()->json([
        'success' => false,
        'message' => 'Unauthenticated.'
    ], 401);
})->name('login');

// Public demo endpoint for immediate browser testing of database hydration and pagination
Route::get('/demo-items', [ItemController::class, 'index']);

// Authenticated Endpoints
Route::middleware('auth:sanctum')->group(function () {
    // Current user profile
    Route::get('/me', [AuthController::class, 'me']);
    
    // Revoke token
    Route::post('/logout', [AuthController::class, 'logout']);

    // RESTful Items resources
    Route::apiResource('items', ItemController::class);
});

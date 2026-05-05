<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\GalleryController;
use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\NewsController;
use App\Http\Controllers\ContactController;

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Admin CRUD Routes (Protected)
    Route::apiResource('blogs', BlogController::class)->except(['index', 'show']);
    Route::apiResource('gallery', GalleryController::class)->except(['index', 'show']);
    Route::apiResource('events', EventController::class)->except(['index', 'show']);
    Route::apiResource('news', NewsController::class)->except(['index', 'show']);
});

// Public Routes
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{blog}', [BlogController::class, 'show']);
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/{galleryItem}', [GalleryController::class, 'show']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{newsItem}', [NewsController::class, 'show']);

Route::post('/contact', [ContactController::class, 'submit'])->middleware('throttle:3,1');
Route::get('/status', [ContactController::class, 'status']);

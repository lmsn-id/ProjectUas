<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [

    ]);
});
Route::get('/admin/dashboard', function () {
    return redirect(filament()->getUrl());
})->name('admin.dashboard');


Route::post('/admin/logout', function () {
    Auth::logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect('/admin/login');
})->name('filament.admin.auth.logout');


require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Models\UserInterface;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $homeData = UserInterface::where('page', 'home')
        ->where('status', true)
        ->orderBy('urutan')
        ->get();

    return Inertia::render('Home', [
        'homeData' => $homeData->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'text' => $item->text,
                'description' => $item->description,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'layout' => $item->layout,
                'position' => $item->position,
                'urutan' => $item->urutan,
            ];
        }),
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

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FilamentLoginController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->isMethod('post')) {
            return $this->store($request);
        }

        return $this->create();
    }

    public function create()
    {
        if (Auth::check()) {
            $user = Auth::user();

            if (method_exists($user, 'canAccessPanel') && $user->canAccessPanel(filament()->getCurrentPanel())) {

                return redirect()->to(filament()->getUrl());
            }

            Auth::logout();
        }

        return Inertia::render('Auth/Login', [
            'canResetPassword' => false,
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginType = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (!Auth::attempt([$loginType => $request->login, 'password' => $request->password], $request->boolean('remember'))) {
            return back()->withErrors([
                'login' => 'The provided credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();

        $user = Auth::user();

        if ($user && $user->role === 'admin') {
            return redirect()->to(filament()->getUrl() . '?forceRefresh=' . now()->timestamp);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login')->withErrors([
            'login' => 'You do not have permission to access the admin panel.',
        ]);


    }


    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

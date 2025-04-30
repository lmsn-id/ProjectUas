<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use App\Models\UserInterface;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'navbarData' => UserInterface::whereRaw("LOWER(TRIM(layout)) = 'navbar'")
                ->where('status', true)
                ->orderBy('urutan')
                ->get()
                ->map(function ($item) {
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
        ];


    }
}

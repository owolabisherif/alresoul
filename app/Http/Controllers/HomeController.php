<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Event;
use App\Models\Guide;
use App\Models\Scholar;
use App\Services\TimezoneService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return Inertia::render('guest/welcome', [
            "timezones" => TimezoneService::get(),
            "articles" => Inertia::defer(fn() => Article::latest()->take(6)->get()),
            "scholars" => Inertia::defer(fn() => Scholar::inRandomOrder()->take(4)->get()),
            "events" => Inertia::defer(fn() => Event::inRandomOrder()->take(4)->get()),
            "programs" => Inertia::defer(fn() => Guide::whereStatus(1)->orderBy('time_start')->get()),
            "features" => Inertia::defer(fn() => Guide::where(["status" => 1, "is_featured" =>1 ])->inRandomOrder()->take(5)->get())
        ]);
    }
}

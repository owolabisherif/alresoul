<?php

use App\Http\Controllers\AllNewsController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FrontendMediaController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\HisnulMuslimController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\PillarsOfIslamController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\QuranController;
use App\Http\Controllers\ScholarController;
use App\Http\Controllers\SermonController;
use App\Http\Controllers\SermonsController;
use App\Services\AudioService;
use Illuminate\Support\Facades\Route;



Route::get('/', HomeController::class)->name('home');
Route::inertia('/more', 'guest/more')->name('more');
Route::inertia('/about', 'guest/about')->name('about');
Route::inertia('/events', 'guest/event', ["page" => url("/") . "/api/all/events"])->name('event');
Route::inertia('/news', 'guest/news', ["page" => url("/") . "/api/all/articles"])->name('news');
Route::inertia('/program/guides', 'guest/programs', ["page" => url("/") . "/api/all/guides"])->name('programs');
Route::inertia('/all/scholars-sheikhs', 'guest/scholars', ["page" => url("/") . "/api/all/scholars"])->name('sheikhs');
Route::get("pillars/islam/{slug}", [PillarsOfIslamController::class, "show"])->name("pillars.show");
Route::get('medias', [FrontendMediaController::class, "index"])->name("media.index");
Route::get('medias/playlist/{slug?}', [FrontendMediaController::class, "show"])->name("media.show");
Route::inertia('/contact', 'guest/contact')->name('contact');
require __DIR__ . '/settings.php';

Route::get("/sermon/audio", fn() => AudioService::handle())->name("sermon.audio");



Route::prefix("services/")->group(function () {
    Route::get("quran/surahs", [QuranController::class, "index"])->name("quran.index");
    Route::get("quran/{slug}", [QuranController::class, "show"])->name("quran.show");
    Route::inertia('quran', 'guest/quran')->name('quran');
    Route::inertia('hisnul-muslim', 'guest/hisnul-muslim')->name('hisnul');
    Route::inertia('asma-al-husna', 'guest/asma-al-husna')->name('husna');
    Route::get('calendar', [CalendarController::class, "index"])->name('calendar');
    Route::get('sermons', [SermonsController::class, "index"])->name('sermon');
});

Route::prefix("quran/")->as("quran.")->group(function() {
    Route::get("verses/{chapter}", [QuranController::class, "verses"])->name("verses");
});

Route::prefix("hisnul-muslim/")->as("hisnul.")->group(function () {
    Route::get("{slug}", [HisnulMuslimController::class, "show"])->name("category");
});

Route::prefix("sermons/")->as("sermon.")->group(function () {
    Route::get("{month?}/{year?}", [SermonsController::class, "show"])->name("podcast");
});

Route::post("newsletter/create", [NewsletterController::class, "store"])->name("newsletter.store");



Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix("admin/")->group(function() {

        Route::inertia('dashboard', 'dashboard')->name('dashboard');
        Route::inertia('about-us', 'about-us')->name('aboutus');
    
        Route::get('event', [EventController::class, "index"])->name('program');
        Route::get('event/create/{slug?}', [EventController::class, "create"])->name('program.create');
        Route::match(['post', 'put'], 'event/create', [EventController::class, "store"])->name('program.store');
    
        Route::get('article', [ArticleController::class, "index"])->name('article');
        Route::get('article/create/{slug?}', [ArticleController::class, "create"])->name('article.create');
        Route::match(['post', 'put'], 'article/create', [ArticleController::class, "store"])->name('article.store');
    
        Route::get('scholars', [ScholarController::class, "index"])->name('scholars');
        Route::get('scholar/create/{slug?}', [ScholarController::class, "create"])->name('scholar.create');
        Route::match(['post', 'put'], 'scholar/create', [ScholarController::class, "store"])->name('scholar.store');
    
        Route::get('sermon/list', [SermonController::class, "index"])->name('sermons');
        Route::get('sermon/create/{slug?}', [SermonController::class, "create"])->name('sermons.create');
        Route::match(['post', 'put'], 'sermon/create', [SermonController::class, "store"])->name('sermons.store');
    
        Route::get('author', [AuthorController::class, "index"])->name('author');
        Route::get('author/create/{slug?}', [AuthorController::class, "create"])->name('author.create');
        Route::match(['post', 'put'], 'author/create', [AuthorController::class, "store"])->name('author.store');
    
        Route::get('guide', [GuideController::class, "index"])->name('guide');
        Route::get('guide/create/{slug?}', [GuideController::class, "create"])->name('guide.create');
        Route::match(['post', 'put'], 'guide/create', [GuideController::class, "store"])->name('guide.store');
    
        Route::get('pillars', [PillarsOfIslamController::class, "index"])->name('pillars.index');
        Route::get('pillars/create/{slug?}', [PillarsOfIslamController::class, "create"])->name('pillars.create');
        Route::match(['post', 'put'], 'pillars/create', [PillarsOfIslamController::class, "store"])->name('pillars.store');

        Route::get('media', [MediaController::class, "index"])->name('medias.index');
        Route::get('media/create/{slug?}', [MediaController::class, "create"])->name('medias.create');
        Route::match(['post', 'put'], 'media/create', [MediaController::class, "store"])->name('medias.store');

        Route::get('playlist', [PlaylistController::class, "index"])->name('playlist.index');
        Route::get('playlist/create/{slug?}', [PlaylistController::class, "create"])->name('playlist.create');
        Route::match(['post', 'put'], 'playlist/create', [PlaylistController::class, "store"])->name('playlist.store');
    });
});


Route::get('/scholar-and-sheikh/{type}/{slug}', [ScholarController::class, 'show'])->name("scholar.show");
Route::get('/event/{slug}', [EventController::class, 'show'])->name("program.show");
Route::get('/program/guide/{slug}', [GuideController::class, 'show'])->name("guide.show");
Route::get('/{type}/{slug}', [ArticleController::class, 'show'])->name("article.show");



<?php

use App\Http\Controllers\AllEventsController;
use App\Http\Controllers\AllGuidesController;
use App\Http\Controllers\AllNewsController;
use App\Http\Controllers\AllScholarsController;
use App\Http\Controllers\Api\QuranChaptersController;
use App\Http\Controllers\Api\QuranScriptController;
use App\Http\Controllers\AsmaAlHusnaController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\HisnulMuslimController;
use App\Http\Controllers\PrayerTimesController;
use App\Http\Controllers\QuranRecitersController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::as("api.")->group(function() {
    Route::prefix("quran/")->as("quran.")->group(function () {
        Route::get("chapters", QuranChaptersController::class)->name("chapters");
        Route::get("reciters", [QuranRecitersController::class, "reciters"])->name("reciters");
        Route::get("recitations/{reciter}", [QuranRecitersController::class, "recitations"])->name("recitations");
        Route::get("script/{chapter}/{juz}/{page}", QuranScriptController::class)->name("script");
    });

    Route::prefix("calendar/")->as("calendar.")->group(function() {
        Route::get("/hijri/{month}/{year}", [CalendarController::class, "show"])->name("hijri");
    });

    Route::prefix("hisnul/")->as("hisnul.")->group(function () {
        Route::get("", [HisnulMuslimController::class, "index"])->name("index");
    });

    Route::prefix("hasma/")->as("hasma.")->group(function () {
        Route::get("", [AsmaAlHusnaController::class, "index"])->name("index");
    });

    Route::prefix("prayer")->as("prayer.")->group(function () {
        Route::get("/{type}/{date?}", PrayerTimesController::class)->name("timings");
    });

    Route::prefix("all/")->as("all.")->group(function(){
        Route::get("articles", AllNewsController::class)->name("articles");
        Route::get("guides", AllGuidesController::class)->name("guides");
        Route::get("events", AllEventsController::class)->name("events");
        Route::get("scholars", AllScholarsController::class)->name("scholarss");
    });


    Route::get("server/time", fn() => Carbon::now())->name("server.time");
});

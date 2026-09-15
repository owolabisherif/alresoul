<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendMediaController extends Controller
{
    public function index()
    {
        // return Playlist::withWhereHas("medias", function ($q) {
        //     $q->where(["parent_id" => null]);
        // })->get();

        return Inertia::render("guest/media", [
            'playlists' => Inertia::defer(fn() => Playlist::withWhereHas("medias", function ($q) {
                $q->where(["parent_id" => null]);
            })->get())
        ]);
    }


    public function show(string $slug) {
        if(!Media::whereSlug($slug)->exists()) abort(404);

        return Inertia::render("guest/media-category", [
            'playlist' => Inertia::defer(fn() => Media::whereSlug($slug)->with("medias", function ($q) {
                $q->where("parent_id", "!=", null);
            })->first())
        ]);
    }
}

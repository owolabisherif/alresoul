<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index() {
        return Inertia::render("media", [
            "medias" => Inertia::defer(fn() => Media::latest()->paginate(10))
        ]);
    }

    public function create(string | null $slug = null) {
        return Inertia::render('create-media', [
            'media' => $slug ? Media::whereSlug($slug) : null,
            'medias' => Inertia::defer(fn() => Media::whereNull("parent_id")->get()),
            'playlists' => Inertia::defer(fn() => Playlist::orderBy("title", "ASC")->get()),
        ]);
    }

    public function store(Request $request) {
        $rules = [
            'title' => ['required'],
            'playlist_id' => ['required'],
            'parent_id' => ['nullable'],
            'video_url' => ['required'],
            'description' => ['required'],
            'season' => ['required'],
            'episode' => ['required'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
            'status' => ['boolean'],
            'cover' => ['nullable', 'file', 'mimetypes:image/jpeg,image/png,image/jpg,image/tif,image/svg,image/avif,image/webpg|max:1048']
        ];

        $validated = Validator::make($request->all(), $rules);


        if ($validated->fails()) {
            return redirect()->back()->withErrors($validated)->withInput();
        };

        try {
            $image = null;

            if ($request->file("cover")) {
                $ext = $request->file("cover")->getClientOriginalExtension();
                $name = time() . ".$ext";
                $request->file("cover")->storeAs("medias", $name, 'public');
                $image = $name;
            } else {
                $article = Media::find($request->id, ["cover"]);
                $image = $article->getRawOriginal('cover');
            }

            Media::updateOrCreate(["id" => $request->id], [...$request->all(), "cover" => $image]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

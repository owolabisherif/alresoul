<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    public function index()
    {
        return Inertia::render("playlist", [
            "medias" => Inertia::defer(fn() => Playlist::latest()->paginate(10))
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => ['required'],
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
                $article = Playlist::find($request->id, ["cover"]);
                $image = $article->getRawOriginal('cover');
            }

            Playlist::updateOrCreate(["id" => $request->id], [...$request->all(), "cover" => $image]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

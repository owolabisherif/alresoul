<?php

namespace App\Http\Controllers;

use App\Models\Scholar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class ScholarController extends Controller
{
    public function index()
    {
        return Inertia::render("scholar", [
            "scholars" => Inertia::defer(fn() => Scholar::latest()->paginate(10))
        ]);
    }

    public function show(string $type, string $slug)
    {

        return Inertia::render("guest/show-scholar", [
            "scholar" => Inertia::defer(fn() => Scholar::whereSlug($slug)->first())
        ]);
    }

    public function create(string | null $slug = null)
    {

        return Inertia::render("create-scholar", [
            "scholar" => $slug ? Scholar::whereSlug($slug)->first() : null
        ]);
    }


    public function store(Request $request)
    {

        $rules = [
            'name' => ['required'],
            'type' => ['required'],
            'about' => ['required'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
            'status' => ['boolean'],
            'image' => ['nullable', 'file', 'mimetypes:image/jpeg,image/png,image/jpg,image/tif,image/svg,image/avif,image/webpg|max:1048']
        ];

        $validated = Validator::make($request->all(), $rules);


        if ($validated->fails()) {
            return redirect()->back()->withErrors($validated)->withInput();
        };

        try {
            $image = null;

            if ($request->file("image")) {
                $ext = $request->file("image")->getClientOriginalExtension();
                $name = time() . ".$ext";
                $request->file("image")->storeAs($request->type, $name, 'public');
                $image = $name;
            } else {
                $article = Scholar::find($request->id, ["image"]);
                $image = $article->getRawOriginal('image');
            }

            Scholar::updateOrCreate(["id" => $request->id], [...$request->all(), "image" => $image]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

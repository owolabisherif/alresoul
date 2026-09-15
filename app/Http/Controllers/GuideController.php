<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GuideController extends Controller
{
    public function index()
    {
        return Inertia::render("program", [
            "programs" => Inertia::defer(fn() => Guide::latest()->paginate(10))
        ]);
    }

    public function show(string $slug)
    {

        return Inertia::render("guest/show-program", [
            "program" => Inertia::defer(fn() => Guide::whereSlug($slug)->first())
        ]);
    }

    public function create(string | null $slug = null)
    {

        return Inertia::render("create-program", [
            "program" => $slug ? function () use ($slug) {
                $data =  Guide::whereSlug($slug)->first();
                $time_start = Carbon::parse($data->time_start)->format("H:i:s");
                $time_end = Carbon::parse($data->time_end)->format("H:i:s");

                $data = [...$data->toArray()];

                $data["time_start"] = $time_start;
                $data["time_end"] = $time_end;

                return $data;
            } : null
        ]);
    }


    public function store(Request $request)
    {

        $rules = [
            'title' => ['required'],
            'about' => ['required'],
            'date_start' => ['required'],
            'date_end' => ['required'],
            'time_start' => ['required'],
            'time_end' => ['required'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
            'is_featured' => ['boolean'],
            'status' => ['boolean'],
            'image' => ['nullable', 'file', 'mimetypes:image/jpeg,image/png,image/jpg,image/tif,image/svg,image/avif,image/webpg|max:1048'],
            'video' => ['nullable' , 'url']
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
                $request->file("image")->storeAs('guides', $name, 'public');
                $image = $name;
            } else {
                $article = Guide::find($request->id, ["image"]);
                $image = $article->getRawOriginal('image');
            }

            Guide::updateOrCreate(["id" => $request->id], [...$request->all(), "image" => $image]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

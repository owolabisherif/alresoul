<?php

namespace App\Http\Controllers;

use App\Models\Sermon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SermonController extends Controller
{
    public function index()
    {
        return Inertia::render("sermon", [
            "sermons" => Sermon::latest()->paginate(10)
        ]);
    }

    public function create(string | null $slug = null)
    {
        return Inertia::render("create-sermon", [
            "sermon" => $slug ? Sermon::whereSlug($slug)->first() : null
        ]);
    }


    public function store(Request $request)
    {

        $validated = Validator::make($request->all(), [
            'title' => ['required'],
            'type' => ['nullable'],
            'cover' => ['nullable'],
            'partner' => ['nullable'],
            'source' => ['nullable'],
            'url' => ['required'],
            'date' => ['required'],
            'status' => ['boolean'],
        ]);

        if ($validated->fails()) return redirect()->back()->withErrors($validated)->withInput();

        try {

            $cover = null;

            if ($request->file("cover")) {
                $ext = $request->file("cover")->getClientOriginalExtension();
                $name = time() . ".$ext";
                $request->file("cover")->storeAs('sermons', $name, 'public');
                $cover = $name;
            } else {
                $article = Sermon::find($request->id, ["cover"]);
                $cover = $article->getRawOriginal('cover');
            }

            Sermon::updateOrCreate(["id" => $request->id], [...$request->all(), "cover" => $cover]);

            return redirect()->back();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

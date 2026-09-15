<?php

namespace App\Http\Controllers;

use App\Models\Pillars;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class PillarsOfIslamController extends Controller
{
    public function index() {
        $row = request()->input('row');

        return Inertia::render('pillars', [
            'pillars' => Pillars::latest()->paginate($row ?? 10)
        ]);
    }

    public function show(string $slug) {
        $pillar = Pillars::whereSlug($slug)->first();

        if(!$pillar) abort(404);

        return Inertia::render('guest/show-pillar', ['pillar' => $pillar]);
    }

    public function create(string | null $slug = null)
    {
        return Inertia::render("create-pillar", [
            "pillar" => $slug ? Pillars::whereSlug($slug)->first() : null
        ]);
    }


    public function store(Request $request)
    {
        $rules = [
            'slug' => ['required'],
            'title' => ['required'],
            'body' => ['required'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
        ];

        $validated = Validator::make($request->all(), $rules);


        if ($validated->fails()) {
            return redirect()->back()->withErrors($validated)->withInput();
        };

        try {

            
            Pillars::updateOrCreate(["id" => $request->id], [...$request->all()]);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

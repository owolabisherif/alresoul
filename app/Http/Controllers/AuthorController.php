<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index()
    {
        return Inertia::render("author", [
            "authors" => Author::latest()->paginate(10)
        ]);
    }

    public function create(string | null $slug = null)
    {
        return Inertia::render("create-author", [
            "author" => $slug ? Author::whereSlug($slug)->first() : null
        ]);
    }


    public function store(Request $request)
    {

        $validated = Validator::make($request->all(), [
            'name' => ['required'],
            'type' => ['required'],
            'email' => ['nullable'],
            'phone' => ['nullable'],
            'website' => ['nullable'],
            'status' => ['boolean'],
        ]);

        if ($validated->fails()) return redirect()->back()->withErrors($validated)->withInput();

        try {
            Author::updateOrCreate(["id" => $request->id], [...$request->all()]);

            return redirect()->back();
        
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

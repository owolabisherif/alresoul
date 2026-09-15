<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class HisnulMuslimController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index()
    {
        $data = file_get_contents(Storage::disk("local")->path("hisnul/hisnul-muslim.json"));

        return response()->json($data);
    }

    /**
     * Handle the incoming request.
     */
    public function show(string $slug)
    {
        $data = json_decode(file_get_contents(Storage::disk("local")->path("hisnul/hisnul-muslim.json")));

        $category = collect($data->categories)->first(fn ($item) => $item->slug == $slug);

        if(!$category) abort(Response::HTTP_NOT_FOUND);

        $supplications = collect($data->supplications)->filter(fn($item) => $item->categoryId == $category->id);

        return Inertia::render('guest/hisnul-muslim', [
            "cat" => $category,
            "sups" => $supplications->values()->toArray()
        ]);
    }
}

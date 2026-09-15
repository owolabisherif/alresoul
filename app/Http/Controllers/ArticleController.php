<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Author;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ArticleController extends Controller
{
    public function index()
    {
        return Inertia::render("article", [
           "articles" => Inertia::defer(fn() => Article::latest()->paginate(10))
        ]);
    }

    public function show(string $type, string $slug) {
        
        return Inertia::render("guest/show-article", [
            "article" => Inertia::defer(fn() => Article::whereSlug($slug)->first())
        ]);
    }

    public function create(string | null $slug = null)
    {

        return Inertia::render("create-article", [
            "authors" => Author::whereType('author')->get()->map(fn($item) => ["id" => $item->id, "name" => $item->name]),
            "article" => $slug ? Article::whereSlug($slug)->first() : null
        ]);
    }


    public function store(Request $request) {
        
        $rules = [
            'title' => ['required'],
            'video' => ['nullable', 'required_if:type,video','file', 'mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime|max:2048'],
            'type' => ['required'],
            'body' => ['required'],
            'author_id' => ['nullable'],
            'listing_type' => ['required'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
            'status' => ['boolean'],
        ];



        
        if($request->isMethod('POST')) {
            $rules = [...$rules, 'image' => ['required', 'file', 'mimetypes:image/jpeg,image/png,image/jpg,image/tif,image/svg,image/webpg|max:1048']];
        }

        $validated = Validator::make($request->all(), $rules);

        // $file = $request->file('video');

        // Log::error([
        //     'file' => $file,
        //     'error' => $file?->getError(),
        //     'error_message' => $file?->getErrorMessage(),
        //     'size' => $file?->getSize(),
        // ]);

        if($validated->fails()) return redirect()->back()->withErrors($validated)->withInput();

        try {
            $image = null;
            $video = null;
            
            if($request->file("image")) {
                $ext = $request->file("image")->getClientOriginalExtension();
                $name = time().".$ext";
                $request->file("image")->storeAs($request->listing_type, $name, 'public');
                $image = $name;
            } else {
                $article = Article::find($request->id, ["image"]);
                $image = $article->getRawOriginal('image');
            }

            if($request->file("video")) {
                $ext = $request->file("video")->getClientOriginalExtension();
                $name = time().".$ext";

                $request->file("video")->storeAs("{$request->listing_type}/video", $name, 'public');
                $video = $name;
            } else {
                $article = Article::find($request->id, ["video"]);
                $video = $article?->getRawOriginal('video');
            }

            Article::updateOrCreate(["id" => $request->id], [...$request->all(), "author_id" => $request->author_id ?? 0, "image" => $image, "video" => $video]);

            return redirect()->back();

        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

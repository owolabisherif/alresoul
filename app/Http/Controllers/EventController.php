<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index() {
        return Inertia::render("event", [
            "events" => Inertia::defer(fn() => Event::latest()->paginate(10)),
        ]);
    }

    public function create(string | null $slug = null)
    {
        
        return Inertia::render("create-event", [
            "organizers" => Author::whereType('organizer')->get()->map(fn($item) => ["id" => $item->id, "name" => $item->name]),
            "event" => $slug ? function() use($slug) {
                $data =  Event::whereSlug($slug)->first();
                $time_start = Carbon::parse($data->time_start)->format("H:i:s");
                $time_end = Carbon::parse($data->time_end)->format("H:i:s");

                $data = [...$data->toArray()];

                $data["time_start"] = $time_start;
                $data["time_end"] = $time_end;

                return $data;
            } : null
        ]);
    }

    public function show(string $slug)
    {

        return Inertia::render("guest/show-event", [
            "event" => Inertia::defer(fn() => Event::whereSlug($slug)->first())
        ]);
    }

    public function store(Request $request)
    {

        $rules = [
            'title' => ['required'],
            'sub_title' => ['nullable'],
            'type' => ['required'],
            'body' => ['required'],
            'mode' => ['required'],
            'days' => ['nullable'],
            'date_start' => ['required'],
            'date_end' => ['required'],
            'time_start' => ['required'],
            'time_end' => ['required'],
            'location' => ['required'],
            'locale' => ['required'],
            'sessions' => ['nullable'],
            'cost' => ['nullable'],
            'currency' => ['nullable'],
            'organizer_id' => ['nullable'],
            'meta_title' => ['nullable'],
            'meta_desc' => ['nullable'],
            'tags' => ['nullable'],
            'status' => ['boolean'],
        ];


        if($request->isMethod("POST")) {
            $rules['image'] = ['required', 'file', 'mimetypes:image/jpeg,image/png,image/jpg,image/tif,image/svg,image/webpg,image/avif|max:1048']; 
        }


        $validated = Validator::make($request->all(), $rules);


        if ($validated->fails()) {
            Log::info(json_encode($validated->errors()));
            return redirect()->back()->withErrors($validated)->withInput();
        };

        try {
            $image = null;

            if ($request->file("image")) {
                $ext = $request->file("image")->getClientOriginalExtension();
                $name = time() . ".$ext";
                $request->file("image")->storeAs("events", $name, 'public');
                $image = $name;
            } else {
                $article = Event::find($request->id, ["image"]);
                $image = $article->getRawOriginal('image');
            }

            $data = [...$request->all()];
            $data["organizer_id"] = $request->organizer_id ?? 0;
            $data["image"] = $image;

            Event::updateOrCreate(["id" => $request->id], $data);

            return redirect()->back();
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->withErrors(["message" => $e->getMessage()]);
        }
    }
}

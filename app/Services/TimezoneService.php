<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class TimezoneService {

    /**
     * Handle the incoming request.
     */
    public static function get()
    {
        $data = json_decode(file_get_contents(Storage::disk("local")->path("timezones.json")));

        $data = collect($data)->map(fn ($value, $key) => ["id" => $key + 1, ...(array)$value])->sortBy('name')->values()->toArray();

        return $data;
    }
}
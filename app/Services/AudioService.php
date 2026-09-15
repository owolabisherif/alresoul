<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AudioService {

    public static function handle () {
        try {
            $url = request()->input('path');

            $response = Http::withOptions([
                'stream' => true,
            ])->get($url)->throw();

            $contentLength = $response->header('Content-Length');
            $contentType = $response->header('Content-Type');
    
            if ($response->failed()) {
                abort($response->status(), 'Unable to fetch audio.');
            }
    
            return response()->stream(function () use ($response) {
                $body = $response->toPsrResponse()->getBody();
    
                while (!$body->eof()) {
                    echo $body->read(8192);
                    flush();
                }
            }, 200, [
                'Content-Type' => $contentType,
                'Content-Length' => $contentLength,
                'Content-Disposition' => 'inline',
                'Accept-Ranges' => 'bytes',
                'Cache-Control' => 'public, max-age=3600',
            ]);
        } catch (\Exception $e) {
            Log::error($e);
        }
    }
}
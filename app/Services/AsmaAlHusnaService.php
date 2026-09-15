<?php

namespace App\Services;

use App\Models\AsmaUlUsna;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use ArPHP\I18N\Arabic;


class AsmaAlHusnaService {

    public static function getNames() {
        try {
            $asma = AsmaUlUsna::limit(1)->first();

            if($asma) {

                $names = $asma->payload;
                
                return $names["data"];
            }

            $res = Http::api()->get("https://api.aladhan.com/v1/asmaAlHusna")->throw();

            $data = [];

            $names =  collect($res->json());

            if(empty($names)) return $data;

            $asma = new AsmaUlUsna();
            $asma->payload = $names;
            $asma->save();

            return $names["data"];


        } catch (\Throwable $th) {
            Log::error($th);

            throw $th;
        }
    }
}
<?php

namespace App\Services;

use App\Models\Sermon;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use ArPHP\I18N\Arabic;


class SermonService {


    public static function calendar() {

        $calender = [];

        $prev_year = "2015";
        $last_year = Carbon::now()->year;

        $last = Carbon::create($last_year, Carbon::DECEMBER)->lastOfMonth();

        $years = CarbonPeriod::between(Carbon::parse("{$prev_year}-1-1"), $last);

       

        foreach ($years as $year) {
            
            $dt = Carbon::parse($year);

            $month_name = strtolower($dt->monthName);

            $calender[] = [
                "id" => "{$month_name}/{$dt->year}",
                "isActive" => Carbon::now()->month == $dt->month && Carbon::now()->year == $dt->year,
                "month" => [
                    "id" => $dt->month,
                    "name" => $dt->monthName,
                ],
                "year" => $dt->year
            ];
        }
        

        $calender = collect($calender)->sortByDesc(function($item) {
            return $item["year"];
        })->groupBy("id")->map(function ($items) {
            return $items[0];
        })->values()->toArray();


        return $calender;
    }


    public static function getSermon(string $month = "none", int $year = 0) {
        try {

            if ($month == "none") $system_month = Carbon::now("asia/qatar");
            if ($year == 0) $year = Carbon::now("asia/qatar")->year;

            $sermon_local = Sermon::whereMonth('date', $month == "none"  ? $system_month?->month : $month)->whereYear('date', $year)->get();

            if($sermon_local->count()) return $sermon_local;

            $res = Http::api()->get("https://sermons.islamic.network/api/uae-awqaf/{$year}.json")->throw();

            $data = [];

            $sermons =  collect($res->json())->filter(fn($item) => strtolower($item["month"]["name"]) == strtolower($month == "none"  ? $system_month?->monthName : $month))->map(function ($item) {
                return $item["sermons"];
            });

            if(empty($sermons)) return $data;

            $ar = new Arabic();



            foreach ($sermons->flatten(1)->values()->toArray() as $index => $sermon) {

                $localeEdition = collect($sermon["editions"])->first(fn($item) => $item["language"] == "ar");


                $data[] = [
                    "id" => $index + 1,
                    "title" => $ar->en2ar($sermon["title"]),
                    "cover" => "/assets/images/islamic-network.svg",
                    "partner" => $ar->en2ar("Islamic Network"),
                    "source" => implode(" ", explode("-", $sermon["source"])),
                    "type" => $sermon["type"] == "friday" ? "Juma'at" : $sermon["type"],
                    "url" => $localeEdition ? $localeEdition["url"] : null,
                ];
            }

            return $data;
        } catch (\Throwable $th) {
            Log::error($th);

            throw $th;
        }
    }
}
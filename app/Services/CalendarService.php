<?php

namespace App\Services;

use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;


class CalendarService {

    public static function gToHCalendar(int | null $month = 0, int | null $year = 0) {
        try {
            if ($month == 0) $month = Carbon::now("asia/qatar")->month;
            if ($year == 0) $year = Carbon::now("asia/qatar")->year;

            return Cache::rememberForever("month-$month-year-$year", function() use($month, $year) {
                $res = Http::api()->get("https://api.aladhan.com/v1/gToHCalendar/{$month}/{$year}")->throw();
    
                return $res->json();
            });

        } catch (\Throwable $e) {
            Log::error($e);

            throw $e;
        }
    }

    public static function calendar() {

    
        $calender = [];

        $prev_year = Carbon::now()->subYears(5)->year;
        $last_year = Carbon::now()->addYears(5)->year;

        $last = Carbon::create($last_year, Carbon::DECEMBER)->lastOfMonth();

        $years = CarbonPeriod::between(Carbon::parse("{$prev_year}-1-1"), $last);

        foreach ($years as $year) {
            
            $dt = Carbon::parse($year);

            $month_name = strtolower($dt->month);

            $calender[] = [
                "id" => "{$month_name}-{$dt->year}",
                "isActive" => Carbon::now()->month == $dt->month && Carbon::now()->year == $dt->year,
                "month" => [
                    "id" => $dt->month,
                    "name" => $dt->monthName,
                ],
                "year" => $dt->year
            ];
        }
        

        $calender = collect($calender)->groupBy("id")->map(function ($items) {
            return $items[0];
        })->values()->toArray();


        return $calender;
    }
}
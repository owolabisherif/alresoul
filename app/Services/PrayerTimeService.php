<?php

namespace App\Services;

use App\Enums\PrayerTimeMethod;
use App\Enums\PrayerTimeType;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use ArPHP\I18N\Arabic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class PrayerTimeService {

    public string $base_url = "https://api.aladhan.com/v1/";
    

    public function __construct(public Request $request, public PrayerTimeType $type)
    {
        
    }

    public static function init(Request $request, PrayerTimeType $type): static {
        return new static($request, $type);
    }

    public function getPrayerTimings(string | null $date) {
        try {
            $timezone = $this->request->timezone && $this->request->timezone != 'null' ? $this->request->timezone : 'Asia/Qatar';
            
            $city = $this->request->city && $this->request->city != 'null' ? $this->request->city : 'Doha';
            $state = $this->request->state && $this->request->state != 'null' ? $this->request->state : 'Doha';
            $country = $this->request->country && $this->request->country != 'null' ? $this->request->country : 'QA';
            $timezoneSlug = Str::slug($timezone);
            $dt = $date && $date != "null" ? $date : Carbon::now()->format("Y-m-d");

            $params = [
                "city" => $city,
                "state" => $state,
                "country" => $country,
                'latitude' => $this->request->latitude && $this->request->latitude != 'null' ? $this->request->latitude : '25.264982564290243',
                'longitude' => $this->request->longitude && $this->request->longitude != 'null' ? $this->request->longitude : '51.499367418431596',
                'method' => $this->request->method && $this->request->method != 'null' ? $this->request->method : PrayerTimeMethod::MuslimWorldLeague->value,
                'shafaq' => 'general',
                'tune' => '5%2C3%2C5%2C7%2C9%2C-1%2C0%2C8%2C-6',
                'school' => '0',
                'midnightMode' => '0',
                'timezonestring' => $timezone,
                'latitudeAdjustmentMethod' => '1',
                'calendarMethod' => 'UAQ',
                'iso8601' => 'false'
            ];


            if ($this->type == PrayerTimeType::NextPrayerByAddress ){
                $data = json_decode(file_get_contents(Storage::disk("local")->path("timezones.json")));
                $countries = collect($data)->map(fn($value, $key) => ["id" => $key + 1, ...(array)$value])->sortBy('name');

                $country = $countries->first(fn($item) => $item["country_code"] == $country);
                
                $city = @$country["capital"];
                $country = @$country["name"];

                $address = "$city, $country";

                $params["address"] = $address;


                return Cache::remember("next-prayer-time-$timezoneSlug-$dt", now()->addMinutes(10), function() use($date, $timezone, $params) {

                    $res = Http::api()->withQueryParameters($params)->get("{$this->base_url}/{$this->type->value}/$date")->throw();
    
                    $timings =  collect($res->json());
    
                    return $timings["data"];
                });

            }
            
            
            return Cache::rememberForever("prayer-time-$timezoneSlug-$dt", function() use($date, $timezone, $params) {
                
                $date = $date && $date != "null" ? Carbon::parse($date)->setTimezone($timezone)->format("d-m-Y") : Carbon::now()->setTimezone($timezone)->format("d-m-Y");

                $res = Http::api()->withQueryParameters($params)->get("{$this->base_url}/{$this->type->value}/$date")->throw();

                $data = [];

                $timings =  collect($res->json());

                if (empty($timings)) return $data;


                return $timings["data"];
            });
            
        } catch (\Throwable $th) {
            Log::error($th);

            throw $th;
        }
    }
}
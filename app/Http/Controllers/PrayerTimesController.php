<?php

namespace App\Http\Controllers;

use App\Enums\PrayerTimeType;
use App\Services\PrayerTimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class PrayerTimesController extends Controller
{
    public function __invoke(Request $request, PrayerTimeType $type, string | null $date = null)
    {
        try {

            return PrayerTimeService::init($request, $type)->getPrayerTimings($date);
        } catch (\Exception $e) {

            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

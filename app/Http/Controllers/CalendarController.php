<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CalendarController extends Controller
{
    public function index() {
        return Inertia::render('guest/calendar', [
            "calendar" => CalendarService::calendar()
        ]);
    }

    public function show(int | null $month = 0, int | null $year = 0) {

        try {

            return CalendarService::gToHCalendar($month, $year);

        } catch (\Exception $e) {

            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

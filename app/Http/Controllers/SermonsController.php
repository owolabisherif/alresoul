<?php

namespace App\Http\Controllers;

use App\Services\SermonService;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SermonsController extends Controller
{
    public function index()
    {
        return Inertia::render('guest/sermon', [
            "calendar" => SermonService::calendar()
        ]);
    }

    public function show(string $month = "none", int $year = 0)
    {
        try {
            return SermonService::getSermon($month, $year);
        } catch (\Exception $e) {

            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

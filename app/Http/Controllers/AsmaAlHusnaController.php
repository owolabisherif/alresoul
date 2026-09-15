<?php

namespace App\Http\Controllers;

use App\Services\AsmaAlHusnaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;


class AsmaAlHusnaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index()
    {
        try {
            return AsmaAlHusnaService::getNames();
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

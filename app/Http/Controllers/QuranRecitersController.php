<?php

namespace App\Http\Controllers;

use App\Services\QuranicService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class QuranRecitersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function reciters(Request $request)
    {
        try {
            $quran_service = QuranicService::geInstance();

            $reciters = $quran_service->reciters();

            return response()->json($reciters);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Handle the incoming request.
     */
    public function recitations(int $reciter)
    {
        try {
            $quran_service = QuranicService::geInstance();

            $recitation = $quran_service->recitation($reciter);

            return response()->json($recitation);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

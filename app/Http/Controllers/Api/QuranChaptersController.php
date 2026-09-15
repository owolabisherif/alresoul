<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\QuranicService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class QuranChaptersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $quran_service = QuranicService::geInstance();

            $data = $quran_service->chapters();

            return response()->json([
                "chapters" => $data["chapters"]["chapters"], 
                "verses" => $data["chapters"]["chapters"], 
                "juzs" => [], //collect($data["juzs"]["juzs"])->unique('juz_number')->values(), 
                "pages" => [], //$data["pages"]["pages"]
            ]);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(["message" => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\QuranicService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class QuranScriptController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $chapter = "0", string $juz = "0", string $page = "0")
    {
        try {
            $quran_service = QuranicService::geInstance();

            $scrpts = $quran_service->script(chapter: $chapter, juz: $juz, page: $page);

            // $quran_service->chapter_info();

            return response()->json($scrpts);

        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

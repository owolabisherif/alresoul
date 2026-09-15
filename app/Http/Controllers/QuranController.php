<?php

namespace App\Http\Controllers;

use App\Services\QuranicService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class QuranController extends Controller
{
    public function index() {
        return Inertia::render("guest/quran_chapters", []);
    }
    
    public function show(string $slug) {
        return Inertia::render('guest/quran', [
            "slug" => $slug
        ]);
    }

    public function verses(int $chapter) {
        try {
            $quran_service = QuranicService::geInstance();

            $verses = $quran_service->verse($chapter);

            return response()->json($verses);

        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

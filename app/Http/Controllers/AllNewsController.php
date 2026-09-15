<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AllNewsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke() 
    {
        try {
            $row = request()->input('row');

            return response()->json(Article::latest()->paginate($row ?? 10));
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(["data" => "An error occured."], 500);
        }
    }
}

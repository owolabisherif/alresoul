<?php

namespace App\Services;

use App\Models\Quran;
use App\Models\QuranChapter;
use Error;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\Pool;

class QuranicService {


    private static mixed $instance = null;
    private string $token = "";
    private string $auth_base_url = "";
    private string $quran_base_url = "";

    protected function __construct(){
        $this->auth_base_url = env("OAUTH_END_POINT");
        $this->quran_base_url = env("QURAN_END_POINT");
        $this->getToken();
    }

    protected function __clone(){}

    public function __wakeup()
    {
        throw new \Exception('Cannot unserialize a singleton');
    }

    public static function geInstance(): QuranicService {

        if(self::$instance == null) {
            self::$instance = new static();
        }

        return self::$instance;
    }


    private function getToken() {
        try {
            $response = Http::api()->withBasicAuth(env("CLIENT_ID"), env("CLIENT_SECRET"))
                ->asForm()->post("{$this->auth_base_url}/oauth2/token", [
                    "grant_type" => "client_credentials",
                    "scope" => "content",
                ])->throw();

            $this->token = $response["access_token"];

        } catch (\Exception $e) {
            Log::error($e);
        }
    }


    public function chapters() {
        try {
            $chapter = QuranChapter::limit(1)->first();

            if($chapter)  return  ["chapters" => $chapter->payload, "verses" => $chapter->payload, "juzs" => [], "pages" => []];

            $response = Http::pool(fn(Pool $pool) => [
                $pool->quran()->withHeaders([
                    'x-auth-token' => $this->token,
                    'x-client-id' => env("CLIENT_ID"),
                ])->get("{$this->quran_base_url}/chapters", [
                    'language' => 'en',
                ]),
                $pool->quran()->withHeaders([
                    'x-auth-token' => $this->token,
                    'x-client-id' => env("CLIENT_ID"),
                ])->get("{$this->quran_base_url}/juzs", [
                    'language' => 'ar',
                ]),
                $pool->quran()->withHeaders([
                    'x-auth-token' => $this->token,
                    'x-client-id' => env("CLIENT_ID"),
                ])->get("{$this->quran_base_url}/pages", [
                    'language' => 'ar',
                ]),
            ]);
            
            // Http::api()->withHeaders([
            //     'x-auth-token'=> $this->token,
            //     'x-client-id' => env("CLIENT_ID"),
            // ])->get("{$this->quran_base_url}/chapters", [
            //     'language' => 'ar',
            // ])->throw();

            $chapter = new QuranChapter();
            $chapter->payload = $response[0]->json();
            $chapter->save();

            return ["chapters" => $response[0]->json(), "verses" => $response[0]->json(), "juzs" => $response[1]->json(), "pages" => $response[2]->json()];

        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }

    public function script(string $script = "text_uthmani", string $chapter = "0", string $juz = "0", $page = "0") {
        
        try {

            $data = [
                "language" => "en",
                "fields" => $script,
            ];

            $url = $page != "0" ? "{$this->quran_base_url}/verses/by_page/$page" : "{$this->quran_base_url}/verses/by_chapter/$chapter";

            $quran = Quran::find($page);

            if($quran) return $quran->script;

            $response =  Http::api()->withHeaders([
                'x-auth-token'=> $this->token,
                'x-client-id' => env("CLIENT_ID"),
            ])->get($url, $data)->throw();

            $quran = new Quran();
            $quran->id = $page;
            $quran->page = $page;
            $quran->script = $response->json();
            $quran->save();

            return $response->json();
        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }



    public function chapter_info() {
        try {
            $response = Http::api()->withHeaders([
                'x-auth-token' => $this->token,
                'x-client-id' => env("CLIENT_ID"),
            ])->get("{$this->quran_base_url}/resources/chapter_infos", [
                'language' => 'ar',
                "words" => "true"
            ])->throw();

            return $response->json();
        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }

    public function verse(int $chapter_number) {

        // https://api-docs.quran.foundation/docs/content_apis_versioned/verses-by-chapter-number/

        try {
            $response = Http::api()->withHeaders([
                'x-auth-token'=> $this->token,
                'x-client-id' => env("CLIENT_ID"),
            ])->get("{$this->quran_base_url}/verses/by_chapter/{$chapter_number}", [
                'language' => 'ar',
                "words" => "true"
            ])->throw();

            

            return $response->json();
        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }

    public function reciters() {
        try {
            $response = Http::api()->withHeaders([
                'x-auth-token'=> $this->token,
                'x-client-id' => env("CLIENT_ID"),
            ])->get("{$this->quran_base_url}/resources/recitations", [
                'language' => 'en',
            ])->throw();

            return $response->json();
        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }

    public function recitation(int $recitation_id) {
        try {
            $response = Http::api()->withHeaders([
                'x-auth-token'=> $this->token,
                'x-client-id' => env("CLIENT_ID"),
            ])->get("{$this->quran_base_url}/quran/recitations/{$recitation_id}", [
                'language' => 'en',
            ])->throw();

            return $response->json();
        } catch (\Exception $e) {
            Log::error($e);

            throw new Error($e->getMessage());
        }
    }
}
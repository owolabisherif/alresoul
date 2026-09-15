<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Illuminate\Http\Client\PendingRequest;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();

        date_default_timezone_set("Asia/Qatar");
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );

        Http::macro('api', function() {
            return Http::withOptions([
                "verify" => app()->isProduction() ,
                "timeout" => 30,
                'connect_timeout' => 10,
            ]);
        });

        PendingRequest::macro('quran', function() {
            return $this->withOptions([
                "verify" => app()->isProduction() ,
                "timeout" => 30,
                'connect_timeout' => 10,
            ])->acceptJson();
        });
    }
}

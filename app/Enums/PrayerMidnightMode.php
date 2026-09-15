<?php

namespace App\Enums;


enum PrayerMidnightMode {
    case Standard;
    case Jafari;

    public function text() {
        return match($this) {
            self::Standard => "Standard (Mid Sunset to Sunrise)",
            self::Jafari => "Jafari (Mid Sunset to Fajr)",
        };
    }
}
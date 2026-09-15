<?php

namespace App\Enums;


enum PrayerTimeSchool {
    case Shafi;
    case Hanafi;

    public function text() {
        return match($this) {
            self::Shafi => "Shafi",
            self::Hanafi => "Hanafi",
        };
    }
}
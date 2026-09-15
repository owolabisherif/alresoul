<?php

namespace App\Enums;


enum PrayerTimeLatitudeAdjustmentMethod {
    case MiddleNight;
    case OneSeventh;
    case AngleBased;

    public function text() {
        return match($this) {
            self::MiddleNight => "Middle of the Night",
            self::OneSeventh => "One Seventh",
            self::AngleBased => "OAngle Based",
        };
    }
}
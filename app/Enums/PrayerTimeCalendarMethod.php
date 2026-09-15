<?php

namespace App\Enums;


enum PrayerTimeCalendarMethod: string {
    case HJCoSA = "HJCoSA";
    case UAQ = "UAQ";
    case DIYANET = "DIYANET";
    case MATHEMATICAL = "MATHEMATICAL";
}
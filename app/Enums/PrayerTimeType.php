<?php

namespace App\Enums;

enum PrayerTimeType: string {
    case Timings = "timings";
    case TimingsByAddress = "timingsByAddress";
    case TimingsByCity = "timingsByCity";
    case NextPrayer = "nextPrayer";
    case NextPrayerByAddress = "nextPrayerByAddress";
}
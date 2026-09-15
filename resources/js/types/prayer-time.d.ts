import { HijriData } from './hijri';

export interface Timing {
    date: {
        gregorian: HijriData;
        hijri: HijriData;
        readable: string;
        timestamp: string;
    };
    meta: {
        latitude: number;
        latitudeAdjustmentMethod: string;
        longitude: number;
        method: {};
        midnightMode: string;
        offset: {};
        school: string;
        timezone: string;
    };
    timings: {
        Asr: string;
        Dhuhr: string;
        Fajr: string;
        Firstthird: string;
        Imsak: string;
        Isha: string;
        Lastthird: string;
        Maghrib: string;
        Midnight: string;
        Sunrise: string;
        Sunset: string;
    };
}

export interface PrayerItem {
    title: string;
    actualTime: string;
    callTime: string;
    prayerTime: string;
    isNext: boolean;
    callPrayer: boolean;
}

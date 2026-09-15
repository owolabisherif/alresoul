import { HijriData } from '@/types/hijri';
import { PrayerItem, Timing } from '@/types/prayer-time';
import {
    AudioFile,
    AudioFiles,
    Chapter,
    Juz,
    Page,
    QuranResource,
    Reciter,
    Reciters,
    TabType,
} from '@/types/quran';
import { type UsePermissionState } from '@reactuses/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Coord = GeolocationCoordinates;
type PrayerSettings = {
    country: string | null;
    city: string | null;
    state: string | null;
    method: string | null;
    shafaq: string | null;
    tune: string | null;
    school: string | null;
    midnightMode: string | null;
    timezone: string | null;
    latitudeAdjustmentMethod: string | null;
    calendarMethod: string | null;
    iso8601: string | null;
};

interface PrayerTimeProp {
    coordinate: Coord | null;
    settings: PrayerSettings | null;
    permissionState: UsePermissionState | null;
    hasTzone: boolean;
    timings: Timing | null;
    callPrayer: boolean;
    updateCallPrayer: (st: boolean) => void;
    setTimings: (timings: Timing) => void;
    setHasTzone: (st: boolean) => void;
    setPermissionState: (permissionState: UsePermissionState) => void;
    setCoordinate: (state: Coord) => void;
    updateSettings: (state: PrayerSettings) => void;
}

const usePrayerTimeStore = create<PrayerTimeProp>()(
    persist(
        (set, get) => ({
            coordinate: null,
            settings: null,
            permissionState: null,
            hasTzone: false,
            timings: null,
            callPrayer: false,
            updateCallPrayer: (st: boolean) => set((_) => ({ callPrayer: st })),
            setTimings: (timings: Timing) => set((_) => ({ timings })),
            setHasTzone: (st: boolean) => set((_) => ({ hasTzone: st })),
            setPermissionState: (permissionState: UsePermissionState) =>
                set((_) => ({ permissionState: permissionState })),
            setCoordinate: (state: Coord) =>
                set((_) => ({ coordinate: state })),
            updateSettings: (state: PrayerSettings) =>
                set((_) => ({ settings: state })),
        }),
        {
            name: 'prayer-time-store',
        },
    ),
);

export default usePrayerTimeStore;

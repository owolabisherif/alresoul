export type HijriData = {
    date: string;
    day: string;
    adjustedHolidays?: string[];
    holidays?: string[];
    method?: string;
    designation: {
        abbreviated: string;
        expanded: string;
    };
    format: string;
    lunarSighting: boolean;
    month: {
        en: string;
        number: number;
        ar?: string;
        days?: number;
    };
    weekday: {
        en: string;
        ar?: string;
    };
    year: string;
};

export interface Hijri {
    gregorian: HijriData;
    hijri: HijriData;
}

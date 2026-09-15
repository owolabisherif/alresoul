export type MonthType =
    | 'january'
    | 'february'
    | 'march'
    | 'april'
    | 'may'
    | 'june'
    | 'july'
    | 'august'
    | 'september'
    | 'october'
    | 'november'
    | 'december';

export type DayType =
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday';

export const useMonth = (text: MonthType) => {
    const months = {
        january: 'يناير',
        february: 'فبراير',
        march: 'مارس',
        april: 'أبريل',
        may: 'مايو',
        june: 'يونيو',
        july: 'يوليو',
        august: 'أغسطس',
        september: 'سبتمبر',
        october: 'أكتوبر',
        november: 'نوفمبر',
        december: 'ديسمبر',
    };

    return months[text.toLowerCase() as MonthType];
};

export const useDay = (text: DayType) => {
    const days = {
        sunday: 'الأحد',
        monday: 'الاثنين',
        tuesday: 'الثلاثاء',
        wednesday: 'الأربعاء',
        thursday: 'الخميس',
        friday: 'الجمعة',
        saturday: 'السبت',
    };

    return days[text.toLowerCase() as DayType];
};

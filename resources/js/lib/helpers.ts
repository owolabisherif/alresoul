import {
    about,
    calendar,
    contact,
    event,
    hisnul,
    home,
    husna,
    news,
    programs,
    quran,
    sermon,
} from '@/routes';
import { index as quranChapters } from '@/routes/quran';

export type NavLink = {
    label: string;
    href: string;
    isDropdown?: boolean;
    children?: {
        label: string;
        href: string;
    }[];
};

export function navLinks(): NavLink[] {
    return [
        { label: 'الرئيسية', href: home().url },
        { label: 'من نحن', href: about().url },
        {
            label: 'الخدمات',
            isDropdown: true,
            href: '#',
            children: [
                { label: 'القرآن الكريم', href: quranChapters().url },
                { label: 'حصن المسلم', href: hisnul().url },
                { label: 'أسماء الله الحسنى​', href: husna().url },
                { label: 'التقويم', href: calendar().url },
                { label: 'الخُطَب', href: sermon().url },
            ],
        },
        { label: 'الفعاليات', href: event().url },
        { label: 'الأخبار', href: news().url },
        { label: 'برنامج ', href: programs().url },
        // { label: 'اتصل بن', href: contact().url },
    ];
}

export function quickLinks(): { label: string; href: string }[] {
    return [
        { label: 'البرنامج المباشر', href: '#live' },
        { label: 'مواقيت الصلاة', href: '#prayer-time' },
        { label: 'أركان الإسلام', href: '#pillars' },
        { label: 'آخر الأخبار والمقالات', href: '#news' },
        { label: 'العلماء والمشايخ', href: '#scholars' },
        { label: 'شراء الكتب الإسلامية', href: '#books' },
        { label: 'الأحداث القادمة', href: '#events' },
        { label: 'الاشتراك في النشرة الإخبارية', href: '#newsletter' },
    ];
}

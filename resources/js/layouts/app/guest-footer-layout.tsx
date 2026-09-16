import { useCurrentUrl } from '@/hooks/use-current-url';
import { navLinks, quickLinks } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import {
    FacebookIcon,
    InstagramIcon,
    LucideYoutube,
    XIcon,
} from 'lucide-react';
import MobileFooter from './mobile-footer';

export default function GuestFooterLayout() {
    const { isCurrentUrl } = useCurrentUrl();

    const socials = [
        {
            name: 'youtube',
            color: 'hover:text-red-500',
            icon: <LucideYoutube />,
            url: 'https://www.youtube.com/channel/UCJXB10aiEiIgwaFcUp6W64A',
        },
        {
            name: 'facebook',
            color: 'hover:text-blue-500',
            icon: <FacebookIcon />,
            url: 'https://www.facebook.com/rassoultv/',
        },
        {
            name: 'x',
            color: 'hover:text-white/80',
            icon: <XIcon />,
            url: 'https://twitter.com/Rassoultv',
        },
        {
            name: 'instagram',
            color: 'hover:text-pink-500',
            icon: <InstagramIcon />,
            url: 'https://www.instagram.com/rassoultv/',
        },
    ];

    return (
        <div className="relative">
            <footer className="border-t border-border/40 bg-black text-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div dir="rtl">
                            <Link href={home()} className="flex w-42">
                                <img
                                    src="/assets/svgs/logo-main-header.svg"
                                    className="h-full w-full"
                                />
                            </Link>
                            <p className="mt-4 text-sm text-white">
                                دليلك للإسلام والصلاة والمجتمع المسلم.
                            </p>
                        </div>

                        <div dir="rtl">
                            <h3 className="mb-4 text-sm font-semibold text-brand-primary">
                                روابط سريعة
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks().map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-white transition-colors hover:text-brand-secondary"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div dir="rtl">
                            <h3 className="mb-4 text-sm font-semibold text-brand-primary">
                                الصفحات
                            </h3>
                            <ul className="space-y-3">
                                {navLinks().map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                'text-sm text-white transition-colors hover:text-brand-secondary',
                                                isCurrentUrl(link.href) &&
                                                    'text-brand-secondary',
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div dir="rtl">
                            <h3 className="mb-4 text-sm font-semibold text-brand-primary">
                                تواصل معنا
                            </h3>
                            <div className="flex gap-3">
                                {socials.map((social, index) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        className={cn(
                                            'flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-brand-accent transition-colors hover:bg-brand-accent-50 dark:hover:text-emerald-400',
                                            social.color,
                                        )}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-5">
                                <h3 className="text-xl font-bold text-brand-primary">
                                    حمّل تطبيقنا للهواتف المحمولة
                                </h3>

                                <div className="flex gap-x-3">
                                    <a
                                        href="https://play.google.com/store/apps/details?id=echomedia.com.alrasool&hl=en"
                                        target="_blank"
                                        className="block h-24 flex-1"
                                    >
                                        <img
                                            className="h-full w-full object-contain object-center"
                                            src="/assets/images/google-app.png"
                                            alt="Alresoul Google App"
                                        />
                                    </a>
                                    <a
                                        href="https://apps.apple.com/om/app/alresoul-channel-%D9%82%D9%86%D8%A7%D8%A9-%D8%A7%D9%84%D8%B1%D8%B3%D9%88%D9%84/id1440591235"
                                        target="_blank"
                                        className="block h-24 flex-1"
                                    >
                                        <img
                                            className="h-full w-full object-contain object-center"
                                            src="/assets/images/apple-app.png"
                                            alt="Alresoul IOS App"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-border/40 pt-5 text-center text-sm text-white">
                        <p>
                            &copy; {new Date().getFullYear()} الرسول — جميع
                            الحقوق محفوظة
                        </p>
                    </div>
                </div>
            </footer>
            <MobileFooter />
        </div>
    );
}

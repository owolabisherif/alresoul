import Live from '@/assets/live';
import LogoPrimary from '@/assets/logo-primary';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { navLinks } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { home, login, register } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, TvMinimalPlay } from 'lucide-react';
import { useGeolocation, usePermission } from '@reactuses/core';
import usePrayerTimeStore from '@/stores/prayertime';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import axios from 'axios';
import server from '@/routes/api/server';
import { format } from 'date-fns';
import { index } from '@/routes/media';

export default function GuestHeaderLayout({
    breadcrumbs = [],
    title = 'Alresoul - Your Guide to Islamic Life',
}: {
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();
    const state = usePermission({ name: 'geolocation' });
    const { coordinates, locatedAt, error } = useGeolocation();
    const {
        permissionState,
        callPrayer,
        updateCallPrayer,
        setCoordinate,
        setPermissionState,
        setHasTzone,
    } = usePrayerTimeStore();
    const [err, showErr] = useState<boolean>(false);
    const [currentTime, updateCurrentTime] = useState(new Date());
    const player = useRef<HTMLAudioElement>(null);
    const [canPlayer, setCanPlay] = useState(false);

    useEffect(() => {
        setHasTzone(false);

        window.addEventListener('click', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            player.current?.removeEventListener('ended', handlePlayerEvent);
        };
    }, []);

    useEffect(() => {
        if (player.current)
            player.current.addEventListener('ended', handlePlayerEvent);
    }, [player]);

    useEffect(() => {
        handlePermission();
    }, [state]);

    const handleInteraction = () => {
        setCanPlay(true);
    };

    const handlePermission = useCallback(() => {
        setPermissionState(state);

        if (state == 'denied' || permissionState == 'denied') return;

        setHasTzone(false);
        setCoordinate(coordinates);
    }, [state]);

    useEffect(() => {
        if (callPrayer) handleCallToPrayer();
    }, [callPrayer]);

    const handlePlayerEvent = (event: Event) => {
        if (!player.current) return;

        player.current.pause();

        updateCallPrayer(false);
    };

    const handleCallToPrayer = () => {
        if (player.current && player.current.paused && canPlayer)
            player.current.play();
    };

    return (
        <>
            <audio
                id="myAudio"
                preload="auto"
                src="/storage/adhan.mp3"
                autoPlay={false}
                ref={player}
                className="hidden"
            ></audio>

            {callPrayer && (
                <div className="fixed bottom-5 left-5 size-18 rounded-md bg-brand-accent-50 shadow-md transition-normal">
                    <img
                        src="/assets/images/adzan.png"
                        alt="adzan"
                        className="h-full w-full"
                    />
                </div>
            )}
            {/* <Dialog open={err} modal={false}>
                <DialogContent>
                    <DialogTitle>Location Error</DialogTitle>
                    <DialogDescription>
                        {error && error.message}
                    </DialogDescription>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button
                                variant="secondary"
                                onClick={() => showErr(false)}
                            >
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}

            <Head title={title}>
                <meta
                    name="description"
                    content="Alresoul is your comprehensive guide to Islamic faith — prayer times, pillars of Islam, Islamic events, and spiritual blogs. Deepen your connection with Allah."
                />
                <meta
                    name="keywords"
                    content="islam, prayer times, pillars of islam, salah, fasting, ramadan, hajj, zakat, islamic events, muslim, quran"
                />
                <meta
                    property="og:title"
                    content="Alresoul - Your Guide to Islamic Life"
                />
                <meta
                    property="og:description"
                    content="Prayer times, pillars of Islam, Islamic events, and spiritual growth resources."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="/" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'Alresoul',
                            description:
                                'Your comprehensive guide to Islamic faith — prayer times, pillars of Islam, Islamic events, and spiritual blogs.',
                            url: '/',
                            sameAs: [],
                        }),
                    }}
                />
            </Head>
            <header className="fixed top-0 z-200 w-full border-b border-border/40 bg-brand-accent/80 backdrop-blur-md backdrop-hue-rotate-30">
                <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href={home()} className="flex w-42">
                        <img
                            src="/assets/svgs/logo-main-header.svg"
                            className="h-full w-full"
                        />
                    </Link>

                    <nav
                        className="hidden items-center gap-6 md:flex"
                        dir="rtl"
                    >
                        {navLinks().map((link) =>
                            link.isDropdown ? (
                                <DropdownMenu key={link.label} modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            key={link.label}
                                            className={cn(
                                                'p flex cursor-pointer items-center border-b-4 border-transparent text-white outline-0 transition-colors hover:border-b-brand-secondary',
                                                isCurrentOrParentUrl(
                                                    link.href,
                                                ) && 'border-b-brand-secondary',
                                            )}
                                        >
                                            <span className="text-lg font-bold">
                                                {link.label}
                                            </span>
                                            <ChevronDown />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56 bg-brand-accent/80 backdrop-blur-md"
                                        align="start"
                                        dir-
                                    >
                                        <div dir="rtl">
                                            {link.children &&
                                                link.children.length > 0 &&
                                                link.children.map((lnk) => (
                                                    <Link
                                                        key={lnk.label}
                                                        href={lnk.href}
                                                        className={cn(
                                                            'block border-b-4 border-transparent pb-0.5 text-lg font-bold text-white transition-colors hover:border-b-brand-secondary',
                                                            isCurrentUrl(
                                                                lnk.href,
                                                            ) &&
                                                                'border-b-brand-secondary',
                                                        )}
                                                    >
                                                        {lnk.label}
                                                    </Link>
                                                ))}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={cn(
                                        'border-b-4 border-transparent pb-0.5 text-lg font-bold text-white transition-colors hover:border-b-brand-secondary',
                                        isCurrentUrl(link.href) &&
                                            'border-b-brand-secondary',
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ),
                        )}
                    </nav>

                    <div className="hidden items-center md:flex">
                        <>
                            <Link
                                href={index()}
                                className="flex w-fit items-center justify-center gap-x-2 rounded-md border border-white bg-gradient-to-br from-red-500 via-red-600 to-red-800 p-1.5 text-sm font-bold text-white"
                            >
                                <p className="">ألرسول ميديا</p>
                                <TvMinimalPlay className="sizemd:size-5" />
                            </Link>
                        </>
                    </div>
                </div>
            </header>
        </>
    );
}

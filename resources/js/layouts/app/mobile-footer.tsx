import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { about, event, home, more, news, programs } from '@/routes';
import { index as media } from '@/routes/media';
import { Link } from '@inertiajs/react';
import {
    Handshake,
    HomeIcon,
    MenuIcon,
    MessageSquareText,
    NewspaperIcon,
    TrophyIcon,
    TvIcon,
    TvMinimalPlay,
} from 'lucide-react';

export default function MobileFooter() {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <div className="fixed right-0 bottom-1 left-0 z-50 block h-15 px-1 md:hidden">
            <div className="relative flex h-full w-full justify-between gap-x-2 rounded-md border-white bg-linear-to-t from-brand-accent to-brand-accent-45 px-1 dark:from-neutral-800 dark:to-neutral-700">
                <div
                    className={cn(
                        'absolute -top-12 right-2 transition-all',
                        isCurrentUrl(media().url) ? 'hidden' : 'block',
                    )}
                >
                    <Link
                        href={media()}
                        className="flex h-full w-full justify-center"
                    >
                        <div className="flex aspect-auto size-10 shrink-0 flex-col items-center justify-center rounded-full bg-linear-to-br from-red-500 via-red-600 to-red-800 p-2 shadow-md backdrop-blur-3xl dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-neutral-900">
                            <TvMinimalPlay className="size-full text-white" />
                        </div>
                    </Link>
                </div>
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <Link
                        href={home()}
                        className="flex flex-col items-center justify-center"
                    >
                        <HomeIcon className="w-5 text-white" />
                        <p className="text-xs font-bold text-white">الرئيسية</p>
                    </Link>
                </div>
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <Link
                        href={about()}
                        className="flex flex-col items-center justify-center"
                    >
                        <MessageSquareText className="w-5 text-white" />
                        <p className="text-xs font-bold text-white">من نحن</p>
                    </Link>
                </div>

                <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <Link
                        href={event()}
                        className="flex flex-col items-center justify-center"
                    >
                        <NewspaperIcon className="w-5 text-white" />
                        <p className="text-xs font-bold text-white">
                            الفعاليات
                        </p>
                    </Link>
                </div>
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <Link
                        href={news()}
                        className="flex flex-col items-center justify-center"
                    >
                        <Handshake className="w-5 text-white" />
                        <p className="text-xs font-bold text-white">الأخبار</p>
                    </Link>
                </div>
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <Link
                        href={more()}
                        className="flex flex-col items-center justify-center"
                    >
                        <MenuIcon className="w-5 text-white" />
                        <p className="text-xs font-bold text-white">الخدمات</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

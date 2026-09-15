import X from '@/components/icons/x';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { home, event as eventRoute } from '@/routes';
import { show } from '@/routes/program';
import { EventTypeProp, SocialType } from '@/types/global';
import { Head } from '@inertiajs/react';
import {
    IconBrandTelegram,
    IconBrandTwitter,
    IconBrandWhatsapp,
    IconCashBanknote,
    IconHandLoveYou,
} from '@tabler/icons-react';
import {
    Calendar,
    CalendarClock,
    CalendarDaysIcon,
    FacebookIcon,
    HeartHandshakeIcon,
    LinkedinIcon,
    LucideGlobeLock,
    MapPin,
    SpeechIcon,
    UsersIcon,
    WalletIcon,
    type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Prop = {
    event: EventTypeProp;
};

export default function ShowEvent({ event }: Prop) {
    const [socials, setSocials] = useState<SocialType[]>([]);

    useEffect(() => {
        if (event) {
            setSocials([
                {
                    label: 'Facebook',
                    icon: FacebookIcon,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50  hover:shadow-md',
                    url: `https://www.facebook.com/sharer/sharer.php?u=${show({ slug: event.slug }).url}&title=${
                        event.title
                    }&description=${event.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Whatsapp',
                    icon: IconBrandWhatsapp,
                    hoverColor:
                        'hover:text-green-300 bg-green-50 hover:shadow-md',
                    url: `https://api.whatsapp.com/send?text=${
                        event.title
                    }%0D%0A${show({ slug: event.slug }).url}%0D%0A${event.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Telegram',
                    icon: IconBrandTelegram,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50 hover:shadow-md',
                    url: `https://t.me/share/url?url=${show({ slug: event.slug }).url}&text=${
                        event.title
                    }%0D%0A${event.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'LinkedIn',
                    icon: LinkedinIcon,
                    hoverColor:
                        'hover:text-blue-400 bg-blue-50 hover:shadow-md',
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${show({ slug: event.slug }).url}`,
                },
                {
                    label: 'Twitter',
                    icon: IconBrandTwitter,
                    hoverColor: 'hover:text-black bg-gray-50 hover:shadow-md',
                    url: `https://twitter.com/intent/tweet?text=${event.title}&url=${show({ slug: event.slug }).url}`,
                },
            ]);
        }
    }, [event]);

    return (
        <>
            <Head title={event?.title} />
            {event ? (
                <div className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
                    <div className="mb-16 grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-12" dir="rtl">
                            <div className="mb-5 h-44 w-full overflow-hidden rounded-md border border-gray-100 md:h-96">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>

                            <h1 className="mb-1 text-2xl font-bold">
                                {event.title}
                            </h1>
                            <h2 className="mb-2 text-xl">{event.sub_title}</h2>

                            {/* <div className="flex">
                                <div className="rounded-md bg-brand-accent px-2 font-bold text-brand-primary">
                                    <p>
                                        {event.type == 'paid'
                                            ? 'مدفوع'
                                            : 'مجاني'}
                                    </p>
                                </div>
                            </div> */}

                            <div className="my-10 flex w-full flex-wrap justify-end gap-5">
                                {socials.length > 0 &&
                                    socials.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <a
                                                href={item.url}
                                                key={item.label}
                                                className={cn(
                                                    'flex h-10 w-10 items-center justify-center rounded-md border border-green-50 shadow-sm',
                                                    item.hoverColor,
                                                )}
                                                target="_blank"
                                            >
                                                {item.label == 'Twitter' ? (
                                                    <X />
                                                ) : (
                                                    <Icon />
                                                )}
                                            </a>
                                        );
                                    })}
                            </div>
                            <div className="my-5">
                                <h3 className="text-2xl font-bold">
                                    نبذة عن البرنامج.
                                </h3>
                            </div>
                            <div className="mb-5 w-full rounded-md p-2 shadow-md">
                                <div className="grid grid-cols-12 gap-y-5">
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <Calendar className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.date_start} -{' '}
                                            {event.date_end}
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex gap-x-2 md:col-span-3">
                                        <CalendarClock className="w-5 text-brand-accent" />
                                        <p className="font-bold">
                                            {event.time_start}
                                        </p>
                                        <p className="font-bold">-</p>
                                        <p className="font-bold">
                                            {event.time_end}
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <CalendarDaysIcon className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.days}
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <HeartHandshakeIcon className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.type == 'paid'
                                                ? 'مدفوع'
                                                : 'مجاني'}
                                        </p>
                                    </div>
                                    {event.type == 'paid' && (
                                        <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                            <WalletIcon className="w-5 text-brand-accent" />
                                            <p className="flex-1 font-bold">
                                                {event.cost} {event.currency}
                                            </p>
                                        </div>
                                    )}
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <LucideGlobeLock className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.mode == 'online'
                                                ? 'أونلاين'
                                                : 'حضوري'}
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <SpeechIcon className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.locale}
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <UsersIcon className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.sessions} الجلسات
                                        </p>
                                    </div>
                                    <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                        <MapPin className="w-5 text-brand-accent" />
                                        <p className="flex-1 font-bold">
                                            {event.location}
                                        </p>
                                    </div>
                                    {event.organizer && (
                                        <div className="col-span-12 flex items-center gap-x-2 md:col-span-3">
                                            <MapPin className="w-5 text-brand-accent" />
                                            <p className="flex-1 font-bold">
                                                {event.organizer?.name ??
                                                    'None'}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: event.body,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </>
    );
}

ShowEvent.layout = ({ event }: Prop) => {
    if (event) {
        return {
            breadcrumbs: [
                {
                    title: 'الرئيسية',
                    href: home().url,
                },
                {
                    title: 'الفعاليات',
                    href: eventRoute().url,
                },
                {
                    title: event.title,
                    href: show({
                        slug: event.slug,
                    }),
                },
            ],
        };
    }

    return {
        breadcrumbs: [],
    };
};

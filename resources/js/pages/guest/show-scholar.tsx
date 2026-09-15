import X from '@/components/icons/x';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { show } from '@/routes/scholar';
import { ScholarTypeProp, ScholarType, SocialType } from '@/types/global';
import {
    IconBrandTelegram,
    IconBrandTwitter,
    IconBrandWhatsapp,
} from '@tabler/icons-react';
import { FacebookIcon, LinkedinIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Prop = {
    scholar: ScholarTypeProp;
};

export default function ShowScholar({ scholar }: Prop) {
    const [socials, setSocials] = useState<SocialType[]>([]);

    useEffect(() => {
        if (scholar) {
            setSocials([
                {
                    label: 'Facebook',
                    icon: FacebookIcon,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50  hover:shadow-md',
                    url: `https://www.facebook.com/sharer/sharer.php?u=${show({ type: scholar.type, slug: scholar.slug }).url}&title=${
                        scholar.name
                    }&description=${scholar.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Whatsapp',
                    icon: IconBrandWhatsapp,
                    hoverColor:
                        'hover:text-green-300 bg-green-50 hover:shadow-md',
                    url: `https://api.whatsapp.com/send?text=${
                        scholar.name
                    }%0D%0A${show({ type: scholar.type, slug: scholar.slug }).url}%0D%0A${scholar.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Telegram',
                    icon: IconBrandTelegram,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50 hover:shadow-md',
                    url: `https://t.me/share/url?url=${show({ type: scholar.type, slug: scholar.slug }).url}&text=${
                        scholar.name
                    }%0D%0A${scholar.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'LinkedIn',
                    icon: LinkedinIcon,
                    hoverColor:
                        'hover:text-blue-400 bg-blue-50 hover:shadow-md',
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${show({ type: scholar.type, slug: scholar.slug }).url}`,
                },
                {
                    label: 'Twitter',
                    icon: IconBrandTwitter,
                    hoverColor: 'hover:text-black bg-gray-50 hover:shadow-md',
                    url: `https://twitter.com/intent/tweet?text=${scholar.name}&url=${show({ type: scholar.type, slug: scholar.slug }).url}`,
                },
            ]);
        }
    }, [scholar]);

    return (
        <>
            {scholar ? (
                <div className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
                    <div className="mb-16 grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-12" dir="rtl">
                            <div className="mb-5 h-44 w-full overflow-hidden rounded-md border border-gray-100 md:h-96">
                                <img
                                    src={
                                        scholar.image ??
                                        '/assets/images/placeholder.avif'
                                    }
                                    alt={scholar.name}
                                    className="h-full w-full rounded-md object-cover"
                                />
                            </div>

                            <h1 className="mb-1 text-xl font-bold">
                                {scholar.name}
                            </h1>

                            <div className="flex">
                                <div className="rounded-md bg-brand-accent px-2 font-bold text-brand-primary">
                                    <p>
                                        {scholar.type == 'sheikh'
                                            ? 'شيخ'
                                            : 'عالم ديني'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 flex w-full flex-wrap justify-end gap-5">
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

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: scholar.about,
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

ShowScholar.layout = ({ scholar }: Prop) => {
    if (scholar) {
        return {
            breadcrumbs: [
                {
                    title: 'Home',
                    href: home().url,
                },
                {
                    title: `${scholar.type == 'sheikh' ? 'شيخ' : 'عالم ديني'}`,
                    href: '#',
                },
                {
                    title: scholar.name,
                    href: show({
                        type: scholar.type,
                        slug: scholar.slug,
                    }),
                },
            ],
        };
    }

    return {
        breadcrumbs: [],
    };
};

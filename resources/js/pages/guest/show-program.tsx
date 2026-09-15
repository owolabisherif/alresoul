import X from '@/components/icons/x';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import { show } from '@/routes/guide';
import { programs } from '@/routes';
import { ProgramType, SocialType, ProgramTypeProp } from '@/types/global';
import {
    IconBrandTelegram,
    IconBrandTwitter,
    IconBrandWhatsapp,
} from '@tabler/icons-react';
import { FacebookIcon, LinkedinIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Loader from '@/components/loader';

type Prop = {
    program: ProgramTypeProp;
};

export default function ShowProgram({ program }: Prop) {
    const [socials, setSocials] = useState<SocialType[]>([]);

    useEffect(() => {
        if (program) {
            setSocials([
                {
                    label: 'Facebook',
                    icon: FacebookIcon,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50  hover:shadow-md',
                    url: `https://www.facebook.com/sharer/sharer.php?u=${show({ slug: program.slug }).url}&title=${
                        program.title
                    }&description=${program.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Whatsapp',
                    icon: IconBrandWhatsapp,
                    hoverColor:
                        'hover:text-green-300 bg-green-50 hover:shadow-md',
                    url: `https://api.whatsapp.com/send?text=${
                        program.title
                    }%0D%0A${show({ slug: program.slug }).url}%0D%0A${program.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Telegram',
                    icon: IconBrandTelegram,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50 hover:shadow-md',
                    url: `https://t.me/share/url?url=${show({ slug: program.slug }).url}&text=${
                        program.title
                    }%0D%0A${program.about.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'LinkedIn',
                    icon: LinkedinIcon,
                    hoverColor:
                        'hover:text-blue-400 bg-blue-50 hover:shadow-md',
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${show({ slug: program.slug }).url}`,
                },
                {
                    label: 'Twitter',
                    icon: IconBrandTwitter,
                    hoverColor: 'hover:text-black bg-gray-50 hover:shadow-md',
                    url: `https://twitter.com/intent/tweet?text=${program.title}&url=${show({ slug: program.slug }).url}`,
                },
            ]);
        }
    }, [program]);

    return (
        <>
            {program ? (
                <div className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
                    <div className="mb-16 grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-12" dir="rtl">
                            <div
                                className={cn(
                                    'mb-5 h-44 w-full overflow-hidden rounded-md border border-gray-100',
                                    program.video ? 'md:h-fit' : 'md:h-96',
                                )}
                            >
                                {program.video ? (
                                    <video
                                        className="h-full w-full"
                                        controls
                                        autoPlay
                                        style={{
                                            width: '100%',
                                            aspectRatio: '16 / 9',
                                        }}
                                    >
                                        <source src={program.video} />
                                    </video>
                                ) : (
                                    <img
                                        src={
                                            program.image ??
                                            '/assets/images/placeholder.avif'
                                        }
                                        alt={program.title}
                                        className="h-full w-full rounded-md object-cover"
                                    />
                                )}
                            </div>

                            <h1 className="mb-1 text-3xl font-bold">
                                {program.title}
                            </h1>

                            {Boolean(program.is_featured) && (
                                <div className="flex">
                                    <div className="rounded-md bg-brand-accent px-2 font-bold text-brand-primary">
                                        <p>مُميّز</p>
                                    </div>
                                </div>
                            )}

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
                                    __html: program.about,
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

ShowProgram.layout = ({ program }: Prop) => {
    if (program) {
        return {
            breadcrumbs: [
                {
                    title: 'الرئيسية',
                    href: home().url,
                },
                {
                    title: 'برنامج ',
                    href: programs().url,
                },
                {
                    title: program.title,
                    href: show({
                        slug: program.slug,
                    }),
                },
            ],
        };
    }

    return {
        breadcrumbs: [],
    };
};

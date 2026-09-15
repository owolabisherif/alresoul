import X from '@/components/icons/x';
import Loader from '@/components/loader';
import { cn } from '@/lib/utils';
import { home, news } from '@/routes';
import { show } from '@/routes/article';
import { ArticleNewsTypeProp, SocialType } from '@/types/global';
import {
    IconBrandTelegram,
    IconBrandTwitter,
    IconBrandWhatsapp,
} from '@tabler/icons-react';
import { FacebookIcon, LinkedinIcon, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Prop = {
    article: ArticleNewsTypeProp;
};

export default function ShowArticle({ article }: Prop) {
    const [socials, setSocials] = useState<SocialType[]>([]);

    useEffect(() => {
        if (article) {
            setSocials([
                {
                    label: 'Facebook',
                    icon: FacebookIcon,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50  hover:shadow-md',
                    url: `https://www.facebook.com/sharer/sharer.php?u=${show({ type: article.listing_type, slug: article.slug }).url}&title=${
                        article.title
                    }&description=${article.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Whatsapp',
                    icon: IconBrandWhatsapp,
                    hoverColor:
                        'hover:text-green-300 bg-green-50 hover:shadow-md',
                    url: `https://api.whatsapp.com/send?text=${
                        article.title
                    }%0D%0A${show({ type: article.listing_type, slug: article.slug }).url}%0D%0A${article.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'Telegram',
                    icon: IconBrandTelegram,
                    hoverColor:
                        'hover:text-blue-500 bg-blue-50 hover:shadow-md',
                    url: `https://t.me/share/url?url=${show({ type: article.listing_type, slug: article.slug }).url}&text=${
                        article.title
                    }%0D%0A${article.body.replace(/<[^>]*>/g, '').slice(0, 30)}...`,
                },
                {
                    label: 'LinkedIn',
                    icon: LinkedinIcon,
                    hoverColor:
                        'hover:text-blue-400 bg-blue-50 hover:shadow-md',
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${show({ type: article.listing_type, slug: article.slug }).url}`,
                },
                {
                    label: 'Twitter',
                    icon: IconBrandTwitter,
                    hoverColor: 'hover:text-black bg-gray-50 hover:shadow-md',
                    url: `https://twitter.com/intent/tweet?text=${article.title}&url=${show({ type: article.listing_type, slug: article.slug }).url}`,
                },
            ]);
        }
    }, [article]);

    const getVideo = (article: ArticleNewsTypeProp) => {
        return article.video
            ? `<source src="${article.video}" type="video/${
                  article.video.toString().split('.')[1]
              }" />`
            : '#';
    };

    return (
        <>
            {article ? (
                <div className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
                    <div className="mb-16 grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-12" dir="rtl">
                            <div className="mb-5 h-44 w-full overflow-hidden rounded-md border border-gray-100 md:h-96">
                                {article.type == 'image' ? (
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="h-full w-full rounded-md object-cover"
                                    />
                                ) : (
                                    <video
                                        className="h-full w-full"
                                        controls
                                        muted
                                        autoPlay={true}
                                        dangerouslySetInnerHTML={{
                                            __html: getVideo(article),
                                        }}
                                    ></video>
                                )}
                            </div>

                            <h1 className="mb-1 text-xl font-bold">
                                {article.title}
                            </h1>

                            <div className="flex">
                                <div className="rounded-md bg-brand-accent px-2 font-bold text-brand-primary">
                                    <p>
                                        {article.listing_type == 'article'
                                            ? 'مقال'
                                            : 'الأخبار'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex justify-center gap-5">
                                <div className="w-full">
                                    <p className="text-sm font-bold">
                                        {article.author
                                            ? article.author.name
                                            : ''}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {article.created_at}
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
                                    __html: article.body,
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

ShowArticle.layout = ({ article }: Prop) => {
    if (article) {
        return {
            breadcrumbs: [
                {
                    title: 'الرئيسية',
                    href: home().url,
                },
                {
                    title: `${
                        article.listing_type == 'article' ? 'مقال' : 'الأخبار'
                    }`,
                    href: news().url,
                },
                {
                    title: article.title,
                    href: show({
                        type: article.listing_type,
                        slug: article.slug,
                    }),
                },
            ],
        };
    }

    return {
        breadcrumbs: [],
    };
};

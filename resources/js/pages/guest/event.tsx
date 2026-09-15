import { event, home } from '@/routes';
import GuestLayout from '@/layouts/guest-layout';
import { BreadcrumbItem } from '@/types';
import { useElementVisibility } from '@reactuses/core';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ArticleNewsTypeProp, EventTypeProp } from '@/types/global';
import NewsCard from '@/components/news-card';
import { show } from '@/routes/program';
import { Head, Link } from '@inertiajs/react';
import EventCard from '@/components/event-card';

type Prop = {
    page: string;
};

export default function Event({ page }: Prop) {
    const ref = useRef<HTMLDivElement>(null);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pages, updatePages] = useState<EventTypeProp[]>([]);
    const [nextPage, setNextPage] = useState<string | null>();
    const [prevPage, setPrevPage] = useState<string | null>();
    const [visible, stop] = useElementVisibility(ref);

    useEffect(() => {
        return () => {
            stop();
        };
    }, []);

    const getPages = async (url: string | null) => {
        try {
            setLoading(true);
            const res = await axios.get(url ?? page);

            console.log(res.data);
            setNextPage(res.data.next_page_url);
            setPrevPage(res.data.prev_page_url);

            updatePages([...pages, ...res.data.data]);

            setShowLoader(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page) {
            getPages(null);
        }
    }, []);

    useEffect(() => {
        if (!pages.length) return;

        if (visible && nextPage) {
            setShowLoader(true);
            getPages(nextPage);
        }
    }, [visible, pages]);

    return (
        <>
            <Head title="الفعاليات" />
            <div className="mx-5 my-10 max-w-7xl md:mx-auto" dir="rtl">
                {Boolean(pages.length) ? (
                    <div className="grid grid-cols-12 gap-5">
                        {pages.map((item) => (
                            <div
                                className="col-span-12 md:col-span-4"
                                key={item.slug}
                            >
                                <Link
                                    href={show({ slug: item.slug })}
                                    className="col-span-12 md:col-span-3"
                                    key={item.id}
                                >
                                    <EventCard {...item} />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        ref={ref}
                        className="flex h-3 w-full justify-center bg-transparent"
                    >
                        <div className="loader"></div>
                    </div>
                )}
                <div
                    ref={ref}
                    className="flex h-3 w-full justify-center bg-transparent"
                >
                    {showLoader && <div className="loader"></div>}
                </div>
            </div>
        </>
    );
}

Event.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'الفعاليات',
            href: event().url,
        },
    ],
};

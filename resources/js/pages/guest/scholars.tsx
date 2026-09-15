import { useElementVisibility } from '@reactuses/core';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { home } from '@/routes';
import { ScholarTypeProp } from '@/types/global';
import ScholarsCard from '@/components/scholars-card';

type Prop = {
    page: string;
};

export default function Scholars({ page }: Prop) {
    const ref = useRef<HTMLDivElement>(null);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pages, updatePages] = useState<ScholarTypeProp[]>([]);
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
        <div className="mx-5 my-10 max-w-7xl md:mx-auto" dir="rtl">
            {Boolean(pages.length) ? (
                <div className="grid grid-cols-12 gap-5">
                    {pages.map((item) => (
                        <div
                            className="col-span-12 md:col-span-4"
                            key={item.slug}
                        >
                            <ScholarsCard {...item} />
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
    );
}

Scholars.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'العلماء والشيوخ المسلمون',
            href: '#',
        },
    ],
};

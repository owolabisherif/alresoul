import { home } from '@/routes';
import { chapters } from '@/routes/api/quran';
import useQuranStore from '@/stores/quran';
import { QuranResource, TabType } from '@/types/quran';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { useArabicDigit } from '../hooks/use-arabic-digits';
import { Link } from '@inertiajs/react';
import { useGSAP } from '@gsap/react';
import { show } from '@/routes/quran';
import { useSlug } from '../hooks/use-slug';

export default function QuranChapters() {
    const [searchText, setSeachText] = useState('');
    const { data, isPending, isError, error } = useQuery<QuranResource>({
        queryKey: ['quran_resource'],
        queryFn: async () => {
            const response = await fetch(chapters().url);

            if (!response.ok) throw new Error('Network error');

            return response.json();
        },
    });

    useGSAP(() => {
        gsap.utils.toArray('.surah').forEach((ring: any, index) => {
            gsap.from(ring, {
                stagger: index % 2 === 0 ? 0.2 : 0.5,
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.15,
            });
        });
    }, [data]);

    const {
        chapter,
        activeTab,
        setIsError,
        setIsPending,
        setActiveTab,
        setData,
    } = useQuranStore();

    const tabs: TabType[] = ['chapters', 'verses']; //['chapters', 'verses', 'juzs', 'pages'];

    useEffect(() => {
        setActiveTab(activeTab);
    }, [activeTab]);

    useEffect(() => {
        setIsPending(isPending);
    }, [isPending]);

    useEffect(() => {
        setIsError(isError);
    }, [isError]);

    useEffect(() => {
        if (data) setData(data);
    }, [data]);

    const surahs = useMemo(() => {
        if (!data) return [];

        if (!searchText) return data.chapters;

        let searchedSurahs = data.chapters.filter(
            (item) =>
                item.name_arabic.includes(searchText.toLowerCase()) ||
                item.name_complex.includes(searchText.toLowerCase()),
        );

        return searchedSurahs;
    }, [data, searchText]);

    return (
        <section className="mx-5 my-0 max-w-7xl overflow-x-hidden md:mx-auto md:my-10">
            <div className="group relative mb-10 h-64 w-full overflow-hidden rounded-md shadow-md md:h-105">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/assets/images/quran_cover.png"
                        alt="Hisnul Muslim"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/30">
                    <p
                        className="text-4xl font-bold text-brand-accent-100"
                        dir="rtl"
                    >
                        القرآن الكريم
                    </p>
                </div>
            </div>

            {surahs ? (
                <div className="">
                    <div className="grid grid-cols-12 gap-2" dir="rtl">
                        <div className="col-span-12 h-10">
                            <input
                                onChange={(e) => setSeachText(e.target.value)}
                                type="text"
                                className="h-full w-full rounded-md bg-gray-100 px-2 outline-0 placeholder:font-bold active:outline-0"
                                placeholder="بحث عن سورة"
                                dir="rtl"
                            />
                        </div>
                        <>
                            {surahs.map((chap) => (
                                <Link
                                    href={`${show({ slug: encodeURI(useSlug(chap.name_simple.toLowerCase())) }).url}`}
                                    className="surah col-span-12 flex items-center gap-x-2 rounded-md p-1 shadow-md transition-colors hover:shadow-brand-accent-50 md:col-span-2"
                                    dir="rtl"
                                    key={chap.name_simple}
                                >
                                    <div className="h-16 w-16 overflow-hidden rounded-md border border-brand-accent/10">
                                        <img
                                            src="/assets/images/quran_cover.png"
                                            alt="Alresoul Quran cover"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="arabic-text text-xl font-bold">
                                            {chap.name_arabic}
                                        </h2>
                                        <p className="text-xs text-muted-foreground">
                                            {chap.name_complex}
                                        </p>
                                    </div>
                                    <div className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent">
                                        <p className="text-xs font-bold text-white">
                                            {useArabicDigit(chap.verses_count)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </>
                    </div>
                </div>
            ) : (
                <section className="mx-5 my-0 max-w-7xl overflow-x-hidden md:mx-auto md:my-10">
                    <div className="mb-5 flex w-full items-center justify-center">
                        <h1 className="quran-text animate-pulse">
                            بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                        </h1>
                    </div>
                </section>
            )}
        </section>
    );
}

QuranChapters.layout = () => ({
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'القرآن الكريم',
            href: '#',
        },
    ],
});

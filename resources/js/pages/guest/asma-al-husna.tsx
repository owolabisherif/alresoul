import Loader from '@/components/loader';
import { event, home } from '@/routes';
import { index } from '@/routes/api/hasma';
import { useQuery } from '@tanstack/react-query';

type AsmaAlHusnaType = {
    number: number;
    en: {
        meaning: string;
    };
    name: string;
    transliteration: string;
};

export default function AsmaAlHusna() {
    const { data, isPending, isError, error } = useQuery<AsmaAlHusnaType[]>({
        queryKey: ['asma_al_husna'],
        queryFn: async () => {
            const response = await fetch(index().url);

            if (!response.ok) throw new Error('Network error');

            return response.json();
        },
    });

    if (isPending)
        return (
            <div className="flex min-h-screen w-full animate-pulse items-center justify-center bg-gray-200">
                <Loader />
            </div>
        );

    if (isError)
        return (
            <div className="flex min-h-screen w-full animate-pulse items-center justify-center bg-gray-200">
                <p>{error.message}</p>
            </div>
        );

    return (
        <>
            <div className="mx-5 my-5 flex min-h-fit max-w-7xl flex-col md:mx-auto">
                <div className="mb-5 flex w-full justify-center">
                    <h1 className="quran-text">
                        بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </h1>
                </div>

                <div className="grid grid-cols-12 gap-y-5 md:gap-5" dir="rtl">
                    {data.length > 0 &&
                        data.map((hasmaUl) => (
                            <div
                                key={hasmaUl.number}
                                className="hasma col-span-12 flex h-44 flex-col items-center justify-center rounded-md bg-white p-3 shadow-md backdrop-blur-md md:col-span-2"
                                dir="rtl"
                            >
                                <p className="quran-text text-3xl font-bold text-black">
                                    {hasmaUl.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {hasmaUl.transliteration}
                                </p>
                                <p className="text-center text-xs text-brand-accent">
                                    ( {hasmaUl.en.meaning})
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

AsmaAlHusna.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'أسماء الله الحسنى',
            href: event().url,
        },
    ],
};

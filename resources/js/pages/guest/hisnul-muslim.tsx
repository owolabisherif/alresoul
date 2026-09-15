import { cn } from '@/lib/utils';
import { index } from '@/routes/api/hisnul';
import { category } from '@/routes/hisnul';
import { useGSAP } from '@gsap/react';
import { useQuery } from '@tanstack/react-query';
import { Book, Grid2X2, List, PauseIcon, PlayIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link } from '@inertiajs/react';
import { Supplication } from '@/types/hisnul';
import SupplicationList from '@/components/supplication-list';
import { hisnul, home } from '@/routes';
import Loader from '@/components/loader';

type Category = {
    id: number;
    slug: string;
    name: string;
    imageUrl: string;
};

interface HisnulMuslimType {
    categories: Category[];
    supplications: Supplication[];
}

type ViewType = 'category' | 'list';

type Prop = {
    cat?: Category;
    sups?: Supplication[];
};

export default function HisnulMuslim({ cat, sups }: Prop) {
    const player = useRef<HTMLAudioElement>(null);
    const [view, setView] = useState<ViewType>('category');

    const { data, isPending, isError, error } = useQuery<HisnulMuslimType>({
        queryKey: ['hisnul-muslim'],
        queryFn: async () => {
            const response = await fetch(index().url);

            if (!response.ok) throw new Error('Network error');

            let data = await response.json();

            return JSON.parse(data);
        },
    });

    useGSAP(() => {
        gsap.utils.toArray('.supplication').forEach((ring: any, index) => {
            gsap.from(ring, {
                stagger: index % 2 === 0 ? 0.2 : 0.5,
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.15,
            });
        });
    }, [data, view]);

    if (cat)
        return (
            <div
                className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto"
                dir="rtl"
            >
                <div className="group relative mb-10 h-64 w-full overflow-hidden rounded-md shadow-md md:h-105">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/30">
                        <p className="text-4xl font-bold text-brand-accent-100">
                            {cat.name}
                        </p>
                    </div>
                </div>

                <div>
                    {sups && sups.length > 0 ? (
                        <SupplicationList supplications={sups} />
                    ) : (
                        <div>
                            <p>لا توجد أدعية في هذه الفئة.</p>
                        </div>
                    )}
                </div>
            </div>
        );

    return (
        <>
            <audio
                id="myAudio"
                preload="auto"
                ref={player}
                className="hidden"
                controls
            ></audio>

            <div
                className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto"
                dir="rtl"
            >
                {/* <div className="w-full rounded-md bg-brand-accent p-5 text-lg text-white md:text-2xl">
                    <p className="arabic-text mb-2">
                        "حصن المسلم" هو كتاب للأدعية والأذكار، ألّفه سعيد بن علي
                        بن وهف القحطاني. ويُشير العنوان الإنجليزي للكتاب
                        (Fortress of the Muslim) إلى مجموعة مختارة من الأدعية
                        والأذكار الصحيحة المأثورة عن النبي محمد ﷺ.
                    </p>
                    <p className="arabic-text">
                        يُعرف هذا الكتاب بتصنيفه للأدعية التي تغطي العديد من
                        المواقف المألوفة التي قد نجد أنفسنا فيها، والتي تزداد
                        جمالاً وبهاءً بذكر الله (سبحانه وتعالى)؛ إذ يهدف الكتاب
                        إلى تعزيز الإيمان، وبث الأمل والسكينة في نفوس المهمومين،
                        وانتشال الداعي من براثن اليأس والعزلة.
                    </p>
                </div> */}
                <div className="group relative h-64 w-full overflow-hidden rounded-md shadow-md md:h-105">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src="/assets/images/hisnul/fortress.jpg"
                            alt="Hisnul Muslim"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/30">
                        <p
                            className="text-4xl font-bold text-brand-accent-100"
                            dir="rtl"
                        >
                            حصن المسلم
                        </p>
                    </div>
                </div>

                <div className="my-5 flex gap-x-5">
                    <button onClick={() => setView('list')}>
                        <List
                            className={cn(
                                'size-8 cursor-pointer',
                                view == 'list'
                                    ? 'text-brand-accent-100'
                                    : 'text-brand-accent-25',
                            )}
                        />
                    </button>
                    <button onClick={() => setView('category')}>
                        <Grid2X2
                            className={cn(
                                'size-8 cursor-pointer',
                                view == 'category'
                                    ? 'text-brand-accent-100'
                                    : 'text-brand-accent-25',
                            )}
                        />
                    </button>
                </div>

                {isError ? (
                    <div>
                        <p>{error.message}</p>
                    </div>
                ) : isPending ? (
                    <div>
                        <Loader />
                    </div>
                ) : view == 'category' ? (
                    <div className="grid grid-cols-12 gap-y-5 md:gap-5">
                        {data.categories?.map((item) => (
                            <Link
                                className="group supplication relative col-span-3 h-48 w-full overflow-hidden rounded-md shadow-md"
                                key={item.id}
                                href={category({ slug: item.slug })}
                            >
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/30">
                                    <p className="text-xl font-bold text-brand-accent-100">
                                        {item.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <SupplicationList supplications={data.supplications} />
                )}
            </div>
        </>
    );
}

HisnulMuslim.layout = ({ cat, sups }: Prop) => ({
    breadcrumbs: cat
        ? [
              {
                  title: 'الرئيسية',
                  href: home().url,
              },
              {
                  title: 'حصن المسلم',
                  href: hisnul().url,
              },
              {
                  title: cat.name,
                  href: category({ slug: cat.slug }).url,
              },
          ]
        : [
              {
                  title: 'الرئيسية',
                  href: home().url,
              },
              {
                  title: 'حصن المسلم',
                  href: hisnul().url,
              },
          ],
});

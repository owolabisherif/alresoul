import Undderliner from '@/components/ui/underliner';
import { useScrollReveal } from '@/hooks/use-scrollreveal';
import { about, home } from '@/routes';
import { Pillar } from '@/types/global';
import { Head } from '@inertiajs/react';
import { useRef, useEffect, useCallback } from 'react';

type Prop = {
    pillar: Pillar;
};

export default function ShowPillar({ pillar }: Prop) {
    const images: { [key: string]: string } = {
        hajj: '/assets/images/pillars/hajj.jpg',
        zakat: '/assets/images/pillars/zakat.jpg',
        sawm: '/assets/images/pillars/sawm.jpg',
        salat: '/assets/images/pillars/salat.jpg',
        shahada: '/assets/images/pillars/shahada.jpg',
    };

    const getImage = useCallback(() => images[pillar.slug], [pillar]);

    return (
        <>
            <Head title={pillar.title} />

            <div
                className="mx-5 my-10 flex max-w-7xl flex-col justify-start md:mx-auto"
                dir="rtl"
            >
                <div className="group relative mb-10 h-64 w-full overflow-hidden rounded-md shadow-md md:h-105">
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={getImage()}
                            alt={pillar.title}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 group-hover:bg-black/30">
                        <h1
                            className="text-4xl font-bold text-brand-accent-100"
                            dir="rtl"
                        >
                            {pillar.title}
                        </h1>
                    </div>
                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: pillar.body ?? '<p>-----------------</p>',
                    }}
                ></div>
            </div>
        </>
    );
}

ShowPillar.layout = ({ pillar }: Prop) => ({
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: pillar.title,
            href: '#',
        },
    ],
});

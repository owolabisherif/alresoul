import { Link } from '@inertiajs/react';
import ScholarsCard from '../scholars-card';
import Undderliner from '../ui/underliner';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScholarTypeProp } from '@/types/global';
import { show } from '@/routes/scholar';
import { sheikhs } from '@/routes';

type Prop = {
    scholars: ScholarTypeProp[];
};

export default function Scholars({ scholars }: Prop) {
    const container = useRef(null);

    useGSAP(
        () => {
            gsap.utils.toArray('.animated').forEach((ring: any, index) => {
                gsap.from(ring, {
                    scrollTrigger: {
                        trigger: container.current,
                        toggleActions: 'restart',
                    },
                    stagger: index % 2 === 0 ? 0.1 : 0.3,
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'expo.out',
                    delay: index * 0.15,
                });
            });
        },
        { scope: container },
    );

    return (
        <div
            className="mx-5 flex w-full max-w-7xl flex-col items-center justify-center gap-y-5 pt-10 md:mx-auto md:py-20"
            id="scholars"
            ref={container}
        >
            <div className="animated">
                <Undderliner
                    title="العلماء والشيوخ المسلمون"
                    className="text-xl md:text-2xl"
                />
            </div>

            <div className="animated">
                <div className="grid grid-cols-12 gap-y-5 md:gap-x-5">
                    {scholars.map((item, index) => (
                        <Link
                            href={show({ slug: item.slug, type: item.type })}
                            className="col-span-12 pr-10 md:col-span-3 md:pr-0"
                            key={item.id}
                        >
                            <ScholarsCard {...{ ...item, index }} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="animated mt-5 pr-10 md:pr-0">
                <Link
                    href={sheikhs()}
                    className="cursor-pointer rounded-md bg-brand-accent px-5 py-3 font-bold text-white hover:bg-brand-accent/80"
                >
                    تصفّح الكل
                </Link>
            </div>
        </div>
    );
}

import { Deferred, Link } from '@inertiajs/react';
import HomeProgramCard from '../home-program-card';
import NewsCard from '../news-card';
import { Button } from '../ui/button';
import Undderliner from '../ui/underliner';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArticleNewsTypeProp } from '@/types/global';
import { Card } from '../ui/card';
import { news } from '@/routes';

type Prop = {
    articles: ArticleNewsTypeProp[];
};

export default function HomeNews({ articles }: Prop) {
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
        <div className="mx-5 max-w-7xl md:mx-auto">
            <div
                className="flex w-full flex-col items-center justify-center gap-y-5 bg-brand-accent-100/5 pt-10 md:py-20"
                id="news"
                ref={container}
            >
                <div className="animated">
                    <Undderliner title="آخر الأخبار والمقالات" className="" />
                </div>
                <Deferred
                    data="articles"
                    fallback={
                        <div className="animated grid h-44 w-full grid-cols-12 gap-y-5 md:gap-x-5">
                            {Array.from(
                                { length: 6 },
                                (i: number, v: any) => i,
                            ).map((item, index) => (
                                <div
                                    className="col-span-12 h-full w-full animate-pulse rounded-md bg-gray-300 md:col-span-4"
                                    key={index}
                                ></div>
                            ))}
                        </div>
                    }
                >
                    {articles && articles.length > 0 && (
                        <>
                            <div className="animated grid w-full grid-cols-12 gap-y-5 md:gap-x-5">
                                {articles.map((item) => (
                                    <div
                                        className="col-span-12 md:col-span-4"
                                        key={item.slug}
                                    >
                                        <NewsCard {...item} />
                                    </div>
                                ))}
                            </div>

                            <div className="animated mt-5">
                                <Link
                                    href={news()}
                                    className="cursor-pointer rounded-md bg-brand-accent px-5 py-3 font-bold text-white hover:bg-brand-accent/80"
                                >
                                    تصفّح الكل
                                </Link>
                            </div>
                        </>
                    )}
                </Deferred>
            </div>
        </div>
    );
}

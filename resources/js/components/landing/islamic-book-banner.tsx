import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type Prop = {
    cover: string;
    url: string;
};

export default function IslamicBookBanner() {
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
            className="mx-5 max-w-7xl py-10 md:mx-auto md:py-20"
            id="books"
            ref={container}
        >
            <div
                className="h-auto w-full overflow-hidden rounded-md bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/images/mosque.jpg')` }}
            >
                <div className="items-center justify-center bg-linear-to-r from-blue-900 to-blue-900 px-5 py-20 md:flex md:px-25">
                    <div className="grid grid-cols-12 gap-y-10 md:gap-y-0">
                        <div className="animated col-span-12 flex items-center justify-center md:col-span-6 md:hidden">
                            <div className="w-full">
                                <img
                                    src="/assets/images/mutamim2.png"
                                    alt="mutamim"
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 flex flex-col items-center justify-center text-center md:col-span-6">
                            <h2 className="animated pb-3 text-3xl font-extrabold text-white">
                                كتب إسلامية خالدة لإثراء إيمانك
                            </h2>
                            <p className="animated text-white">
                                اكتشف المعرفة الإسلامية الأصيلة مع مجموعة مختارة
                                بعناية من الكتب في مكتبة متمم.
                            </p>
                            <div className="animated mt-10">
                                <a
                                    href="https://mutamim.com"
                                    className="bg cursor-pointer rounded-md bg-[#028D8D] px-5 py-3 font-bold text-white hover:bg-[#028D8D]/80"
                                >
                                    تسوّق الآن
                                </a>
                            </div>
                        </div>
                        <div className="animated col-span-12 hidden items-center justify-center md:col-span-6 md:flex">
                            <div className="w-64">
                                <img
                                    src="/assets/images/mutamim2.png"
                                    alt="mutamim"
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

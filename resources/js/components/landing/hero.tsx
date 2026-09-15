import HeroBg from '@/assets/hero-bg';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Hero() {
    const container = useRef(null);

    useGSAP(
        () => {
            gsap.utils.toArray('.text').forEach((ring: any, index) => {
                gsap.from(ring, {
                    stagger: index % 2 === 0 ? 0.1 : 0.3,
                    y: 80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.15,
                });
            });

            gsap.utils.toArray('.fade').forEach((ring: any, index) => {
                gsap.from(ring, {
                    opacity: 0,
                    duration: 0.6,
                    delay: 0.3,
                });
            });
        },
        { scope: container },
    );

    return (
        <div
            className="relative mt-24 h-[30vh] overflow-hidden md:h-[60vh]"
            ref={container}
        >
            <HeroBg className="fade absolute indent-0 text-[#f4ea9d] md:min-h-100" />

            <div className="absolute inset-0">
                <div className="flex h-full flex-col justify-center px-10 pb-5 md:max-w-1/2">
                    <h2
                        className="text text-2xl font-bold text-brand-accent md:mb-5 md:text-7xl"
                        dir="rtl"
                    >
                        حُسن سيرة النبي محمد
                    </h2>
                    <p
                        className="text mb-5 leading-snug md:mb-10 md:block md:text-3xl"
                        dir="rtl"
                    >
                        استكشف أقوال وأوامر وتعاليم النبي محمد (صلى الله عليه
                        وسلم) الإنسانية، واكتشف إرشادات خالدة للإيمان والأخلاق
                        والحياة اليومية.
                    </p>
                    <div dir="rtl">
                        <Link href="#">
                            <Button
                                size="lg"
                                dir="rtl"
                                className="text cursor-pointer bg-brand-accent hover:bg-brand-accent/80"
                            >
                                اقرأ المزيد
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

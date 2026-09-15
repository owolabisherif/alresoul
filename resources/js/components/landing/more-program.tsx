import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Card, CardContent } from '@/components/ui/card';
import { SwiperPortal, SwiperSlideWidget } from '@/components/ui/swiper';
import Undderliner from '../ui/underliner';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ProgramTypeProp } from '@/types/global';
import { Link } from '@inertiajs/react';
import { show } from '@/routes/guide';
import ProgramCard from '../program-card';

export default function MoreProgram({
    features,
}: {
    features: ProgramTypeProp[];
}) {
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
        <div className="mx-5 mt-10 h-fit max-w-7xl md:mx-auto" ref={container}>
            <div className="animated mb-10 flex justify-end">
                <Undderliner
                    title="البرامج المميزة"
                    position="start"
                    className="justify-start"
                />
            </div>

            <SwiperPortal
                className="animated"
                slidesPerView={1}
                spaceBetween={30}
                autoplay={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
            >
                {features.map((program) => (
                    <SwiperSlide key={program.id}>
                        <ProgramCard program={program} />
                    </SwiperSlide>
                ))}
            </SwiperPortal>
        </div>
    );
}

import { Link } from '@inertiajs/react';
import Undderliner from '../ui/underliner';
import EventCard from '../event-card';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { EventTypeProp } from '@/types/global';
import { show } from '@/routes/program';
import { event } from '@/routes';

type Prop = {
    events: EventTypeProp[];
};

export default function Events({ events }: Prop) {
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
            className="mx-5 flex w-full max-w-7xl flex-col items-center justify-center gap-y-5 overflow-hidden py-10 md:mx-auto md:py-20"
            id="events"
            ref={container}
        >
            <div className="animated">
                <Undderliner title="الفعاليات القادمة" />
            </div>

            <div className="animated mx-auto max-w-7xl pr-10 md:pr-0">
                <div className="grid grid-cols-12 gap-y-5 md:gap-x-5">
                    {events.map((item, index) => (
                        <Link
                            href={show({ slug: item.slug })}
                            className="col-span-12 md:col-span-3"
                            key={item.id}
                        >
                            <EventCard {...item} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="animated mt-5 pr-10 md:pr-0">
                <Link
                    href={event()}
                    className="cursor-pointer rounded-md bg-brand-accent px-5 py-3 font-bold text-white hover:bg-brand-accent/80"
                >
                    تصفّح الكل
                </Link>
            </div>
        </div>
    );
}

import { useEffect, useRef } from 'react';
import HomeProgramCard from '../home-program-card';
import Underliner from '../ui/underliner';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TwitchPlayer from '../twitch-player';
import { ProgramTypeProp } from '@/types/global';
import { FastForwardIcon, PlayCircleIcon } from 'lucide-react';
import {
    IconPlayerSkipBack,
    IconPlayerSkipBackFilled,
    IconPlayerSkipForward,
    IconPlayerSkipForwardFilled,
} from '@tabler/icons-react';

export default function LiveProgram({
    programs,
}: {
    programs: ProgramTypeProp[];
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
        <div id="live" ref={container}>
            <div className="animated mb-10">
                <Underliner title="البرامج المباشرة" className="" />
            </div>
            <div className="animated mx-5 h-130 max-w-7xl overflow-y-hidden rounded-md border shadow-sm md:mx-auto">
                <div className="grid w-full grid-cols-12">
                    <div className="col-span-12 md:col-span-6">
                        <div className="flex w-full md:h-full" id="player">
                            {/* <iframe
                                src="https://player.twitch.tv/?channel=alrassoulchannel&parent=127.0.0.1&muted=true&autoplay=true"
                                className="h-60 w-full md:h-130"
                                allowFullScreen
                            ></iframe> */}
                            <TwitchPlayer channel="alrassoulchannel" />
                        </div>
                    </div>
                    <div className="col-span-12 h-130 bg-brand-accent-50 md:col-span-6">
                        <div className="flex h-10 w-full items-center justify-end bg-brand-accent px-5 md:h-20">
                            <h2
                                className="text-xl font-bold text-white md:text-2xl"
                                dir="rtl"
                            >
                                البرامج القادمة
                            </h2>
                        </div>
                        <div className="h-full w-full scrollbar-none scrollbar-gutter-stable space-y-5 overflow-y-auto px-5 pt-5 md:pb-28">
                            {programs && programs.length > 0 ? (
                                programs.map((item) => (
                                    <HomeProgramCard {...item} key={item.id} />
                                ))
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center">
                                    <div className="w-1/2">
                                        <img
                                            src="/assets/svgs/logo-main-header.svg"
                                            className="h-full w-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="animated mx-5 mt-5 max-w-7xl shadow-sm md:mx-auto md:hidden">
                <div className="animated col-span-12 flex h-32 max-h-32 w-full flex-col items-center justify-center rounded-md bg-brand-accent-25 p-1">
                    <h3 className="text-2xl font-bold text-white">الخُطَب</h3>
                    <div className="flex items-center justify-center text-white">
                        <IconPlayerSkipBack className="size-15" />
                        <PlayCircleIcon className="size-20" />
                        <IconPlayerSkipForward className="size-15" />
                    </div>
                </div>
            </div> */}
        </div>
    );
}

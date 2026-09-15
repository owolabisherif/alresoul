import Shahada from '@/assets/shahada';
import Underliner from '../ui/underliner';
import PillarRingOdd from '@/assets/pillar-ring-odd';
import PillarRingEven from '@/assets/pillar-ring-even';
import PillarRing from '@/assets/pillar-ring';
import PillarIslam from '@/assets/pillar-islam';
import Salah from '@/assets/salah';
import Sawm from '@/assets/sawm';
import Zakat from '@/assets/zakat';
import Hajj from '@/assets/hajj';
import CurveDown from '@/assets/curve-down';
import CurveLeft from '@/assets/curve-left';
import { Link } from '@inertiajs/react';
import CurveUp from '@/assets/curve-up';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { Pillar } from '@/types/global';
import { show } from '@/routes/pillars';

export default function PillarsOfIslam() {
    const container = useRef(null);

    useGSAP(
        () => {
            gsap.utils.toArray('.ring').forEach((ring: any, index) => {
                gsap.from(ring, {
                    scrollTrigger: {
                        trigger: container.current,
                        toggleActions: 'restart',
                        start: 'top 90%',
                    },
                    stagger: index % 2 === 0 ? 0.1 : 0.3,
                    x: -80,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.15,
                });
            });

            gsap.utils.toArray('.line').forEach((ring: any, index) => {
                gsap.from(ring, {
                    scrollTrigger: {
                        trigger: container.current,
                        toggleActions: 'restart',
                        start: 'top 90%',
                    },
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.19,
                });
            });
        },
        { scope: container },
    );
    const pillars: Pillar[] = [
        {
            slug: 'shahada',
            title: 'الشهادة',
            icon: <Shahada className="w-20 text-white" />,
            url: show({ slug: 'shahada' }).url,
        },
        {
            slug: 'salat',
            title: 'الصلاة',
            icon: <Salah className="w-20 text-white" />,
            url: show({ slug: 'salat' }).url,
        },
        {
            slug: 'sawm',
            title: 'الصوم',
            icon: <Sawm className="w-20 text-white" />,
            url: show({ slug: 'sawm' }).url,
        },
        {
            slug: 'zakat',
            title: 'الزكاة',
            icon: <Zakat className="w-20 text-white" />,
            url: show({ slug: 'zakat' }).url,
        },
        {
            slug: 'hajj',
            title: 'الحج',
            icon: <Hajj className="w-20 text-white" />,
            url: show({ slug: 'hajj' }).url,
        },
    ];

    const rings = [<PillarRing />, <PillarRingOdd />, <PillarRingEven />];

    return (
        <div id="pillars">
            <div
                className="h-auto w-full bg-cover bg-center"
                style={{ backgroundImage: `url('/assets/images/mosque.jpg')` }}
                ref={container}
            >
                <div className="flex flex-col items-center justify-center bg-brand-accent/83 px-10 py-20">
                    <div className="pb-10">
                        <Underliner
                            title="أركان الإسلام"
                            className="text-white"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {pillars.map(({ title, icon, url }, index) => (
                            <div
                                className="flex flex-col items-center justify-center md:flex-row"
                                key={index}
                            >
                                <Link
                                    preserveState
                                    href={url}
                                    className="group flex flex-col items-center"
                                >
                                    <div className="relative col-span-6 flex overflow-hidden rounded-full bg-linear-to-r ring transition-colors group-hover:bg-brand-primary group-hover:from-brand-accent group-hover:to-brand-primary md:col-span-2">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {icon}
                                        </div>
                                        <div className="h-64 w-64 rounded-full">
                                            <img
                                                src="/assets/svgs/pillar-ring.svg"
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="flex items-center justify-center text-lg font-bold text-white uppercase">
                                            {title}
                                        </p>
                                    </div>
                                </Link>
                                {index + 1 != pillars.length ? (
                                    (index + 1) % 2 == 0 ? (
                                        <>
                                            <CurveUp className="line hidden md:block" />
                                            <CurveLeft className="line block md:hidden" />
                                        </>
                                    ) : (
                                        <>
                                            <CurveDown className="line hidden md:block" />
                                            <CurveLeft className="line block -rotate-180 md:hidden" />
                                        </>
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

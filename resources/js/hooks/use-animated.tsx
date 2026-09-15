import { useGSAP } from '@gsap/react';
import { RefObject } from 'react';
import gsap from 'gsap';

type Prop = {
    container: any;
};

export default function useAnimated(container: RefObject<any>) {
    return useGSAP(
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
}

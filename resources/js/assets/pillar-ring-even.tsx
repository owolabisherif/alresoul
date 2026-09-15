import './css/pillar-ring-even.css';
import { cn } from '@/lib/utils';

export default function PillarRingEven({ className }: { className?: string }) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 176.78 128.67"
        >
            <defs>
                <clipPath id="clippath">
                    <rect className="cls-2" width="176.78" height="128.67" />
                </clipPath>
                <linearGradient
                    id="linear-gradient"
                    x1="21.44"
                    y1="-472.33"
                    x2="22.44"
                    y2="-472.33"
                    gradientTransform="translate(-2711.7219 -59690.7134) scale(126.512 -126.512)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#ffd686" />
                    <stop offset=".49" stop-color="#b78e4c" />
                    <stop offset="1" stop-color="#815b23" />
                </linearGradient>
            </defs>
            <g className="cls-5">
                <path
                    className="cls-4"
                    d="M64.33,126.93v-1c34.02-.06,61.53-27.58,61.6-61.59-.06-34.02-27.58-61.53-61.6-61.6C30.32,2.8,2.8,30.32,2.74,64.34c.06,34.02,27.58,61.53,61.59,61.6v1s0,1,0,1c-35.12,0-63.59-28.47-63.6-63.59C.74,29.21,29.21.74,64.33.74c35.12,0,63.59,28.47,63.59,63.6,0,35.12-28.47,63.59-63.6,63.6h0v-1Z"
                />
                <path
                    className="cls-3"
                    d="M174.29,61.05c-2.79-8.59-10.23-15.09-19.35-16.52"
                />
                <path
                    className="cls-3"
                    d="M143.61,45.42c-8.59,2.79-15.09,10.23-16.52,19.35"
                />
                <path
                    className="cls-1"
                    d="M126.79,68.58h0M151.14,44.23h0M175.48,68.58h0"
                />
            </g>
        </svg>
    );
}

// import './css/hero-bg.css';
import { cn } from '@/lib/utils';

export default function HeroBg({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 1209.1 383.74"
            className={cn('h-full w-full fill-current', className)}
            preserveAspectRatio="none"
        >
            <defs>
                <clipPath id="wave">
                    <path
                        fill="#f4ea9d"
                        d="M0,0v362.79s93.1-57.67,316.1,0c75.06,19.41,152.89,6.44,241.61-6.54,104-15.21,222.97-30.42,370.02,6.54,187.57,47.14,281.38,0,281.38,0V0H0Z"
                    />
                </clipPath>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="#f4ea9d"
                clipPath="url(#wave)"
            />

            <image
                href="/assets/images/hero-image.png"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#wave)"
            />
        </svg>
    );
}

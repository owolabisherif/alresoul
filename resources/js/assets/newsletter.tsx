import { cn } from '@/lib/utils';

export default function Newsletter({ className }: { className?: string }) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 15 16"
            className={cn('fill-current', className)}
        >
            <g>
                <path d="M14,11H1v-6h3v3c0,.55.45,1,1,1s1-.45,1-1v-3h8v6ZM8,15h-1v-3h1v3ZM14,4H6v-1h1.5c.83,0,1.5-.67,1.5-1.5s-.67-1.5-1.5-1.5h-2.5c-.55,0-1,.45-1,1v3H1c-.55,0-1,.45-1,1v6c0,.55.45,1,1,1h5v4h4v-4h4c.55,0,1-.45,1-1v-6c0-.55-.45-1-1-1" />
            </g>
            <g>
                <rect
                    x="-180.02"
                    y="-125.28"
                    width="1265.27"
                    height="904.78"
                    transform="translate(-98.24 235.36) rotate(-26.4)"
                />
            </g>
        </svg>
    );
}

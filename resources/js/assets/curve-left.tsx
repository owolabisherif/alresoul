import './css/pillar-ring-even.css';
import { cn } from '@/lib/utils';

export default function CurveLeft({ className }: { className?: string }) {
    return (
        <svg
            width="150"
            height="60"
            viewBox="0 0 170 300"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('fill-current', className)}
        >
            <path
                d="M140 0 A140 130 0 0 0 150 300"
                fill="none"
                stroke="#fff"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="1 30"
            />
        </svg>
    );
}

import './css/pillar-ring-even.css';
import { cn } from '@/lib/utils';

export default function CurveDown({ className }: { className?: string }) {
    return (
        <svg
            width="60"
            height="150"
            viewBox="0 0 300 150"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('fill-current', className)}
        >
            <path
                d="M0 0 A130 150 0 0 1 300 0"
                fill="none"
                stroke="#fff"
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray="1 30"
            />
        </svg>
    );
}

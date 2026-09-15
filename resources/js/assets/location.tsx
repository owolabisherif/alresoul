import { cn } from '@/lib/utils';

export default function Location({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16.94 24.49"
            className={cn('fill-current', className)}
        >
            <g>
                <path d="M8.47,12.02c-1.69,0-3.06-1.37-3.06-3.06s1.37-3.06,3.06-3.06,3.06,1.37,3.06,3.06-1.37,3.06-3.06,3.06M8.47,0C5.08,0,0,2.81,0,8.97c0,5.32,6.78,12.45,8.47,15.53,1.69-3.08,8.47-10.12,8.47-15.53C16.94,2.81,11.86,0,8.47,0" />
            </g>
        </svg>
    );
}

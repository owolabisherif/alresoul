import { cn } from '@/lib/utils';
import './css/pillar-ring.css';

export default function PillarRing({ className }: { className?: string }) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 127.19 127.19"
        >
            <defs>
                <style></style>
                <linearGradient
                    id="linear-gradient"
                    x1="386.47"
                    y1="-206.08"
                    x2="387.47"
                    y2="-206.08"
                    gradientTransform="translate(-48893.1211 -26008.433) scale(126.512 -126.512)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#ffd686" />
                    <stop offset=".49" stop-color="#b78e4c" />
                    <stop offset="1" stop-color="#815b23" />
                </linearGradient>
            </defs>
            <path
                className="cls-1"
                d="M63.6,126.19v-1c34.02-.06,61.53-27.58,61.6-61.59-.06-34.02-27.58-61.53-61.6-61.6C29.58,2.06,2.06,29.58,2,63.6c.06,34.02,27.58,61.53,61.59,61.6v1s0,1,0,1C28.47,127.19,0,98.72,0,63.6,0,28.47,28.47,0,63.6,0c35.12,0,63.59,28.47,63.59,63.6,0,35.12-28.47,63.59-63.6,63.6h0v-1Z"
            />
        </svg>
    );
}

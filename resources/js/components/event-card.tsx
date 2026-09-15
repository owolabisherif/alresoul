import { cn } from '@/lib/utils';
import { EventTypeProp } from '@/types/global';

type Prop = {
    id: number;
    title: string;
    cover: string;
    url: string;
    date: string;
};

export default function EventCard({ id, title, image, slug }: EventTypeProp) {
    return (
        <div className="relative h-80 w-full rounded-md">
            <div className="flex h-full w-full flex-col overflow-hidden">
                <div className="w-full flex-1 overflow-hidden rounded-md hover:shadow-md hover:shadow-brand-primary">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div
                    className="flex w-full flex-col items-center gap-y-1"
                    dir="rtl"
                >
                    <p className="flex-1 text-lg font-bold">{title}</p>
                    {/* <div className="rounded-full bg-brand-accent px-2 py-1 text-white">
                        <p className="text-xs font-bold">{date}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

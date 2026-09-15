import { cn } from '@/lib/utils';
import { ScholarTypeProp } from '@/types/global';

type Prop = {
    index: number;
    name: string;
    cover: string;
    url: string;
    type: string;
};

export default function ScholarsCard({
    name,
    image,
    type,
    index,
}: ScholarTypeProp) {
    return (
        <div className="relative h-64 w-full rounded-md md:h-96">
            <div className="flex h-full w-full flex-col overflow-hidden">
                <div className="w-full flex-1 overflow-hidden rounded-md">
                    <img
                        src={image ?? '/assets/images/placeholder.avif'}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="h-10 w-full"></div>
            </div>
            <div className="absolute bottom-0 h-24 w-full px-5">
                <div
                    className={cn(
                        'h-full w-full rounded-2xl p-5 shadow-md',
                        index == 0 ? 'bg-brand-accent' : 'bg-white',
                    )}
                >
                    <div
                        className={cn(
                            'mb-1 border-b pb-1',
                            index == 0 ? 'border-white' : 'border-brand-accent',
                        )}
                    >
                        <p
                            className={cn(
                                'text-center text-sm font-bold',
                                index == 0 ? 'text-white' : 'text-brand-accent',
                            )}
                        >
                            {name}
                        </p>
                    </div>
                    <p
                        className={cn(
                            'text-center text-xs',
                            index == 0 ? 'text-white' : 'text-black',
                        )}
                    >
                        {type == 'sheikh' ? 'شيخ' : 'عالم ديني'}
                    </p>
                </div>
            </div>
        </div>
    );
}

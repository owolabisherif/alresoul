import { ProgramTypeProp } from '@/types/global';
import { Card, CardContent } from './ui/card';

type Prop = {
    title: string;
    about: string;
    time: string;
    cover: string;
};

export default function HomeProgramCard({
    title,
    about,
    time_start,
    image,
}: ProgramTypeProp) {
    return (
        <Card className="py-2 md:py-6">
            <CardContent className="px-2 md:px-6">
                <div
                    className="flex w-full flex-col justify-center md:flex-row md:gap-x-2"
                    dir="rtl"
                >
                    <div className="overflow-hidden rounded-sm md:h-28 md:w-28">
                        <img
                            src={image!}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <h2 className="mb-1 text-xl font-bold text-brand-accent">
                            {title}
                        </h2>
                        <p className="">
                            {about.replace(/<[^>]*>/g, '').slice(0, 30)}...
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-bold md:text-xl">
                            {time_start}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

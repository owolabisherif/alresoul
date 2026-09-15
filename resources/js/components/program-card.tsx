import { show } from '@/routes/guide';
import { Link } from '@inertiajs/react';
import { Card, CardContent } from './ui/card';
import { ProgramTypeProp } from '@/types/global';

export default function ProgramCard({ program }: { program: ProgramTypeProp }) {
    return (
        <Link href={show({ slug: program.slug })}>
            <Card className="overflow-hidden p-0">
                <CardContent className="overflow-hidden p-0">
                    <div className="h-56 w-full select-none">
                        <img src={program.image!} alt={program.title} />
                    </div>
                </CardContent>
            </Card>
            <div className="flex flex-col items-start" dir="rtl">
                <h2 className="mt-2 text-sm font-bold">{program.title}</h2>
                {/* <p className="text-xs">
                                    {program.timeStart} - {program.timeEnd}
                                </p> */}
            </div>
        </Link>
    );
}

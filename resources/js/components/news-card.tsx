import { Link } from '@inertiajs/react';
import { Card, CardContent } from './ui/card';
import { ArticleNewsTypeProp } from '@/types/global';
import { show } from '@/routes/article';

type Prop = ArticleNewsTypeProp;

export default function NewsCard({
    id,
    slug,
    title,
    body,
    image,
    created_at,
    listing_type,
    type,
}: Prop) {
    return (
        <Card className="w-full">
            <CardContent className="w-full">
                <div className="flex w-full justify-center gap-x-2" dir="rtl">
                    <div className="h-28 w-28 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={image}
                            alt={title!}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-1 flex-col">
                        <div className="flex-1">
                            <p className="text-sm text-brand-primary">
                                {created_at}
                            </p>
                            <h2 className="line-clamp-1 text-xl font-bold text-brand-accent">
                                {title}
                            </h2>
                            <div className="flex items-center">
                                <div className="rounded-md bg-brand-accent px-1 py-0.5 font-bold text-brand-primary">
                                    <p className="text-xs">
                                        {listing_type == 'article'
                                            ? 'مقال'
                                            : 'الأخبار'}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>{`${body.replace(/<[^>]*>/g, '').slice(0, 30)}...`}</p>
                            </div>
                        </div>
                        <Link
                            className="font-bold text-brand-secondary hover:text-brand-accent hover:underline"
                            href={show({ type: listing_type, slug: slug })}
                        >
                            اقرأ المزيد
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

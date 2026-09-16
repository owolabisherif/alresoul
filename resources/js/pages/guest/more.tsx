import Undderliner from '@/components/ui/underliner';
import { useScrollReveal } from '@/hooks/use-scrollreveal';
import { moreLinks } from '@/lib/helpers';
import { about, home, more, programs } from '@/routes';
import { Link } from '@inertiajs/react';
import { useRef, useEffect } from 'react';

export default function More() {
    const slideItemLeft = useRef(null);
    const slideItemRight = useRef(null);

    useEffect(() => {
        if (!slideItemLeft.current) return;

        useScrollReveal('left', slideItemLeft.current);
        useScrollReveal('right', slideItemRight.current);
    }, []);

    return (
        <div className="mx-5 my-10 flex max-w-7xl md:mx-auto" dir="rtl">
            <div className="flex w-full flex-col space-y-3">
                <Link
                    href={programs()}
                    className="rounded-md border border-brand-accent/20 p-1 font-bold shadow-md"
                >
                    برنامج
                </Link>
                {moreLinks.map((item) => (
                    <Link
                        href={item.href}
                        key={item.label}
                        className="rounded-md border border-brand-accent/20 p-1 font-bold shadow-md"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

More.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'الخدمات',
            href: more().url,
        },
    ],
};

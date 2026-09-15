import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { about, aboutus, dashboard } from '@/routes';

export default function AboutUs() {
    return (
        <>
            <Head title="About Us" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </>
    );
}

AboutUs.layout = {
    breadcrumbs: [
        {
            title: 'About Us',
            href: aboutus(),
        },
    ],
};

import { BreadcrumbItem } from '@/types';
import GuestHeaderLayout from './app/guest-header-layout';
import GuestFooterLayout from './app/guest-footer-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';

export default function GuestLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <>
            <GuestHeaderLayout />

            <main className="">
                {breadcrumbs.length > 0 && (
                    <div className="mx-5 mt-28 max-w-7xl md:mx-auto" dir="rtl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                {children}
            </main>
            <GuestFooterLayout />
        </>
    );
}

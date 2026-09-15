import QuranLayoutTemplate from '@/layouts/app/quran-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function QuranLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <QuranLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
        </QuranLayoutTemplate>
    );
}

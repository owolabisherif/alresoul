import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { QuranSidebar } from '@/components/quran-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Chapter, QuranResource, TabType } from '@/types/quran';
import { chapters } from '@/routes/api/quran';
import useQuranStore from '@/stores/quran';
import GuestHeaderLayout from './guest-header-layout';
import GuestFooterLayout from './guest-footer-layout';
import { SidebarQuranTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function QuranSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const { data, isPending, isError, error } = useQuery<QuranResource>({
        queryKey: ['quran_resource'],
        queryFn: async () => {
            const response = await fetch(chapters().url);

            if (!response.ok) throw new Error('Network error');

            return response.json();
        },
    });

    const {
        chapter,
        activeTab,
        setIsError,
        setIsPending,
        setActiveTab,
        setData,
    } = useQuranStore();
    const tabs: TabType[] = ['chapters', 'verses']; //['chapters', 'verses', 'juzs', 'pages'];

    useEffect(() => {
        setActiveTab(activeTab);
    }, [activeTab]);

    useEffect(() => {
        setIsPending(isPending);
    }, [isPending]);

    useEffect(() => {
        setIsError(isError);
    }, [isError]);

    useEffect(() => {
        if (data) setData(data);
    }, [data]);

    return (
        <div className="mt-14 flex flex-col overflow-y-hidden">
            <GuestHeaderLayout />

            <div className="flex-1">
                <AppShell variant="sidebar">
                    <QuranSidebar />
                    <AppContent
                        variant="sidebar"
                        className="mt-14 overflow-x-hidden"
                    >
                        <div
                            className={cn(
                                'mx-5 flex max-w-3xl overflow-hidden bg-brand-accent px-2 py-2.5 md:mx-auto md:w-full',
                                chapter ? 'rounded-t-md' : 'rounded-md',
                            )}
                        >
                            <div>
                                <SidebarQuranTrigger className="rounded-full border border-brand-accent-25 px-10 py-5 font-bold text-white hover:bg-brand-accent-25 hover:text-white">
                                    <span>
                                        {chapter
                                            ? `${(chapter as Chapter).id}. ${(chapter as Chapter).name_simple}`
                                            : 'Select surah'}
                                    </span>
                                </SidebarQuranTrigger>
                            </div>
                        </div>
                        {children}
                        <GuestFooterLayout />
                    </AppContent>
                </AppShell>
            </div>
        </div>
    );
}

import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarQuranTrigger,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import { show } from '@/routes/quran';
import type { NavItem } from '@/types';
import axios from 'axios';
import chapters from '@/actions/App/Http/Controllers/Api/QuranChaptersController';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { NavQuran } from './nav-quran';
import { QuranResource, TabType, Verse } from '@/types/quran';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import useQuranStore from '@/stores/quran';
import Loader from './loader';

const footerNavItems: NavItem[] = [];

export function QuranSidebar() {
    const { activeTab, isPending, isError, data } = useQuranStore();
    const queryClient = useQueryClient();

    const handleSearch = (value: string) => {
        const data = queryClient.getQueryData<QuranResource>([
            'quran_resource',
        ]);

        console.log(data?.chapters);
    };

    return (
        <div className="mt-14">
            <Sidebar
                type="drawer"
                collapsible="icon"
                variant="floating"
                className="mt-26 flex flex-col"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={home()} prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                {/* <div className="px-0.5">
                    <div className="flex h-fit w-full justify-between overflow-hidden rounded-sm bg-brand-accent font-bold text-white">
                        {tabs.map((item) => (
                            <button
                                onClick={() => setActivetab(item)}
                                key={item}
                                className={cn(
                                    'flex w-full cursor-pointer items-center justify-center py-3 hover:bg-brand-accent-50',
                                    activeTab == item && 'bg-brand-accent-45',
                                )}
                            >
                                <p className="capitalize">
                                    {item == 'chapters' ? 'surah' : item}
                                </p>
                            </button>
                        ))}
                    </div>
                </div> */}

                <div className="my-2 flex w-full gap-x-2">
                    <div className="h-10 flex-1">
                        <input
                            onChange={(e) => handleSearch(e.target.value)}
                            type="text"
                            className="h-full w-full rounded-md bg-gray-100 p-0.5 outline-0 placeholder:font-bold active:outline-0"
                            placeholder={`Search ${activeTab == 'chapters' ? 'surah' : activeTab}`}
                            dir="rtl"
                        />
                    </div>
                    {activeTab == 'verses' && (
                        <div className="w-15">
                            <input
                                type="text"
                                className="h-full w-full rounded-md bg-gray-100 p-0.5 outline-0 placeholder:font-bold active:outline-0"
                                placeholder="Verse"
                            />
                        </div>
                    )}
                </div>
                <SidebarContent className="flex flex-1 flex-col">
                    {isPending ? (
                        <Loader />
                    ) : isError ? (
                        <p>حدث خطأ.</p>
                    ) : data ? (
                        activeTab == 'chapters' || activeTab == 'verses' ? (
                            <NavQuran
                                type={activeTab}
                                dir="rtl"
                                className="flex-1 text-lg font-bold"
                                data={data}
                                items={data[activeTab].map((item) => ({
                                    id: item.id,
                                    slug: item.name_simple.toLowerCase(),
                                    title: `${item.id}. ${item.name_arabic}`,
                                    href: `${show({ slug: encodeURI(item.name_simple.toLowerCase()) }).url}`,
                                }))}
                            />
                        ) : activeTab == 'juzs' ? (
                            <NavQuran
                                type={activeTab}
                                dir="rtl"
                                className="flex-1 text-lg font-bold"
                                data={data}
                                items={data[activeTab].map((item) => ({
                                    id: item.id,
                                    slug: `juz-${item.juz_number}`,
                                    title: `Juz ${item.juz_number}`,
                                    href: `${show({ slug: `juz-${item.juz_number}` }).url}`,
                                }))}
                            />
                        ) : activeTab == 'pages' ? (
                            <NavQuran
                                type={activeTab}
                                dir="rtl"
                                className="flex-1 text-lg font-bold"
                                data={data}
                                items={data[activeTab].map((item) => ({
                                    id: item.id,
                                    slug: `page-${item.page_number}`,
                                    title: `Page ${item.page_number}`,
                                    href: `${show({ slug: `page-${item.page_number}` }).url}`,
                                }))}
                            />
                        ) : (
                            ''
                        )
                    ) : (
                        'No data'
                    )}
                </SidebarContent>

                <SidebarFooter>
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}

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
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from './ui/sheet';
import Loader from './loader';

const footerNavItems: NavItem[] = [];
const SIDEBAR_WIDTH_MOBILE = '18rem';

export function QuranSidebarDelete() {
    const [openMobile, setOpenMobile] = useState(false);
    const queryClient = useQueryClient();

    const { data, isPending, isError, error } = useQuery<QuranResource>({
        queryKey: ['quran_resource'],
        queryFn: async () => {
            const response = await fetch(chapters().url);

            if (!response.ok) throw new Error('Network error');
            return response.json();
        },
    });

    const [activeTab, setActivetab] = useState<TabType>('chapters');
    const { setActiveTab } = useQuranStore();
    const tabs: TabType[] = ['chapters', 'verses']; //['chapters', 'verses', 'juzs', 'pages'];

    useEffect(() => {
        setActiveTab(activeTab);
    }, [activeTab]);

    const handleSearch = (value: string) => {
        const data = queryClient.getQueryData<QuranResource>([
            'quran_resource',
        ]);

        console.log(data?.chapters);
    };

    return (
        <div className="pt-36">
            <button
                onClick={() => setOpenMobile(!openMobile)}
                className="text-2xl text-black"
            >
                Open
            </button>
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
                <SheetHeader className="sr-only">
                    <SheetTitle>Sidebar</SheetTitle>
                    <SheetDescription>
                        Displays the mobile sidebar.
                    </SheetDescription>
                </SheetHeader>
                <SheetContent
                    data-sidebar="sidebar"
                    data-slot="sidebar"
                    data-mobile="true"
                    className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
                    style={
                        {
                            '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
                        } as React.CSSProperties
                    }
                    side="left"
                >
                    <div className="flex h-full w-full flex-col">
                        <div className="my-2 flex w-full gap-x-2">
                            <div className="h-10 flex-1">
                                <input
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
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
                        {isPending ? (
                            <Loader />
                        ) : isError ? (
                            <p>{error.message}</p>
                        ) : activeTab == 'chapters' || activeTab == 'verses' ? (
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
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}

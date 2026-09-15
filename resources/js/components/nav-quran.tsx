import { Link, usePage } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';
import { QuranResource, TabType, Verse } from '@/types/quran';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useQuranStore from '@/stores/quran';
import { show } from '@/routes/quran';

export function NavQuran({
    items = [],
    type = 'chapters',
    dir = 'ltr',
    className,
    data = null,
    onSearch,
}: {
    items: NavItem[];
    data: QuranResource | null;
    dir?: 'ltr' | 'rtl';
    className?: string;
    type: TabType;
    onSearch?: (value: string) => void;
}) {
    const { isCurrentUrl } = useCurrentUrl();
    const { slug, updateChapter } = useQuranStore();
    const page = usePage().props;

    const [verses, setVerses] = useState<number[]>([]);
    const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

    useEffect(() => {
        if (data && Object.entries(data).length && slug) {
            if (type == 'chapters' || type == 'verses') {
                let selected = data[type].find(
                    (item) => item.name_simple.toLowerCase() == slug,
                );

                if (type == 'verses') {
                    let verseCount = selected
                        ? Array.from(
                              { length: selected.verses_count },
                              (_, i) => i,
                          )
                        : [];

                    setVerses(verseCount);
                }
            }
        }
    }, [data, slug, type, page]);

    useEffect(() => {
        if (!data) return;

        if (type == 'chapters' || type == 'verses') {
            let selected = data[type].find(
                (item) => item.name_simple.toLowerCase() == slug,
            );

            if (selected) updateChapter(selected);
        } else {
            let id = slug.split('-').pop();

            if (!id) return;

            let selected =
                type == 'juzs'
                    ? data[type].find((item) => item.juz_number == parseInt(id))
                    : data[type].find(
                          (item) => item.page_number == parseInt(id),
                      );

            if (selected) updateChapter(selected);
        }
    }, [slug]);

    useEffect(() => {
        const url = new URL(page.currentUrl);

        const startingVerse = url.searchParams.get('startingVerse')
            ? +url.searchParams.get('startingVerse')!
            : null;

        setSelectedVerse(startingVerse);
    }, [page]);

    return (
        <SidebarGroup className="overflow-y-hidden px-0 py-0">
            <SidebarMenu className="flex h-full flex-row gap-x-5">
                <div className="overflow-y-aut w-full scrollbar-none scrollbar-thumb-accent overflow-x-hidden">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={
                                    isCurrentUrl(item.href) || slug == item.slug
                                }
                                tooltip={{ children: item.title }}
                            >
                                <Link
                                    dir={dir}
                                    href={item.href}
                                    className={cn('cursor-pointer', className)}
                                    prefetch
                                    as="button"
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
                {type == 'verses' && (
                    <div className="flex w-15 scrollbar-none scrollbar-thumb-accent flex-col items-start overflow-x-hidden overflow-y-auto">
                        {verses.length > 0 &&
                            verses.map((item) => (
                                <SidebarMenuItem key={item}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={selectedVerse == item + 1}
                                        className={cn(
                                            selectedVerse == item + 1 &&
                                                'bg-brand-accent',
                                        )}
                                    >
                                        <Link
                                            key={`verse-${item + 1}`}
                                            href={`${show({ slug }).url}?startingVerse=${item + 1}`}
                                        >
                                            {item + 1}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                    </div>
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

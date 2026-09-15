import { Link } from '@inertiajs/react';
import {
    BookOpen,
    File,
    FolderGit2,
    ImagePlayIcon,
    ImagePlus,
    LayoutGrid,
    SpeechIcon,
    TvIcon,
    User,
    UserPlus2,
    Users,
    VideoIcon,
} from 'lucide-react';
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
import {
    aboutus,
    article,
    author,
    dashboard,
    guide,
    program,
    scholars,
    sermons,
} from '@/routes';
import type { NavItem } from '@/types';
import {
    IconArticle,
    IconMoodSadSquint,
    IconMosque,
    IconNewSection,
    IconPlaylist,
} from '@tabler/icons-react';
import { create as cp } from '@/routes/program';
import { create as ca } from '@/routes/article';
import { create as cs } from '@/routes/sermons';
import { create as cau } from '@/routes/author';
import { create as createRoute } from '@/routes/scholar';
import { create as guideCreate } from '@/routes/guide';
import { index, create as pillarCreate } from '@/routes/pillars';
import medias from '@/routes/medias';
import playlist from '@/routes/playlist';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'About us',
        href: aboutus(),
        icon: File,
    },
    {
        title: 'Program / Event',
        href: '#',
        icon: IconNewSection,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: program(),
                icon: IconNewSection,
            },
            {
                title: 'Create',
                href: cp(),
                icon: IconNewSection,
            },
        ],
    },
    {
        title: 'Article / News',
        href: article(),
        icon: IconArticle,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: article(),
                icon: IconNewSection,
            },
            {
                title: 'Create',
                href: ca(),
                icon: IconNewSection,
            },
        ],
    },
    {
        title: 'Sermons',
        href: sermons(),
        icon: SpeechIcon,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: sermons(),
                icon: SpeechIcon,
            },
            {
                title: 'Create',
                href: cs(),
                icon: SpeechIcon,
            },
        ],
    },
    {
        title: 'Authors/Organizers',
        href: author(),
        icon: Users,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: author(),
                icon: User,
            },
            {
                title: 'Create',
                href: cau(),
                icon: UserPlus2,
            },
        ],
    },
    {
        title: 'Sheikhs & Scholars',
        href: author(),
        icon: Users,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: scholars(),
                icon: User,
            },
            {
                title: 'Create',
                href: createRoute(),
                icon: UserPlus2,
            },
        ],
    },
    {
        title: 'Program Guide',
        href: guide(),
        icon: VideoIcon,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: guide(),
                icon: ImagePlayIcon,
            },
            {
                title: 'Create',
                href: guideCreate(),
                icon: ImagePlus,
            },
        ],
    },
    {
        title: 'Pillars of Islam',
        href: index(),
        icon: IconMosque,
        isDropdown: true,
        children: [
            {
                title: 'List',
                href: index(),
                icon: IconMosque,
            },
            {
                title: 'Create',
                href: pillarCreate(),
                icon: IconMosque,
            },
        ],
    },
    {
        title: 'Alresoul Media',
        href: index(),
        icon: TvIcon,
        isDropdown: true,
        children: [
            {
                title: 'List Media',
                href: medias.index(),
                icon: TvIcon,
            },
            {
                title: 'Create Media',
                href: medias.create(),
                icon: TvIcon,
            },
            {
                title: 'Media Playlist',
                href: playlist.index(),
                icon: IconPlaylist,
            },
        ],
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

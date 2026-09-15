import type { Auth } from '@/types/auth';
import type { LucideIcon } from 'lucide-react';
import { JSX } from 'react';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            currentUrl: string;
            audioBaseUrl: string;
            adsUrl: string;
            currentDate: string;
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}

export interface CalenderType {
    id: string;
    isActive: boolean;
    month: { id: number; name: string };
    year: number;
}

export interface TimezoneType {
    id: number;
    abbr: string;
    country_code: string;
    isdst: boolean;
    offset: number;
    text: string;
    utc: string[];
    timezones: string[];
    value: string;
    name: string;
}

export interface ArticleNewsType {
    id: number | null;
    title: string;
    image: File | null;
    video: File | null;
    type: 'image' | 'video';
    body: string;
    author_id: string | null;
    listing_type: 'news' | 'article';
    status: boolean;
    message?: string;
    meta_title: string;
    meta_desc: string;
    tags: string;
}

export interface EventType {
    id: number | null;
    organizer_id: string | null;
    title: string;
    sub_title: string;
    image: File | null;
    body: string;
    mode: 'online' | 'offline';
    days: string;
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    location: string;
    locale: string;
    type: 'free' | 'paid';
    cost: number;
    currency: string;
    sessions: number;
    status: boolean;
    message?: string;
    meta_title: string;
    meta_desc: string;
    tags: string;
}

export interface ScholarType {
    id: number | null;
    name: string;
    image: File | null;
    type: 'scholar' | 'sheikh';
    about: string;
    status: boolean;
    message?: string;
    meta_title: string;
    meta_desc: string;
    tags: string;
}

export interface ProgramType {
    id: number | null;
    title: string;
    image: File | null;
    video: string | null;
    about: string;
    date_start: string;
    date_end: string;
    time_start: string;
    time_end: string;
    status: boolean;
    message?: string;
    meta_title: string;
    meta_desc: string;
    tags: string;
    is_featured: boolean;
}

export interface SermonType {
    id: number | null;
    title: string;
    url: string | undefined;
    partner: string;
    cover: File | null;
    type: string;
    source: string;
    status: boolean;
    date: string;
}

export interface AuthorType {
    id: number | null;
    name: string;
    type: 'author' | 'organizer';
    phone: string | null;
    email: string | null;
    website: string | null;
    status: boolean;
}

export interface Pillar {
    id?: string | null;
    slug: string;
    title: string;
    body?: string;
    icon?: JSX.Element;
    url?: string;
    meta_title?: string | null;
    meta_desc?: string | null;
    tags?: string | null;
}

export interface Media {
    id?: number | null;
    parent_id?: number | null;
    playlist_id?: number | null;
    slug?: string;
    title: string;
    description?: string;
    season: number;
    episode: number;
    duration: number;
    cover: File | string;
    video_url: string;
    meta_title?: string | null;
    meta_desc?: string | null;
    tags?: string | null;
    status: boolean;
}

export interface Playlist {
    id?: number | null;
    slug?: string;
    title: string;
    meta_title?: string | null;
    meta_desc?: string | null;
    tags?: string | null;
    status: boolean;
}

export type SermonTypeProp = Omit<SermonType, 'cover'> & {
    cover: string | null;
    slug: string;
    created_at: string;
    meta_title?: string | null;
    meta_desc?: string | null;
    tags?: string | null;
};

export type ScholarTypeProp = Omit<ScholarType, 'image'> & {
    index?: number;
    slug: string;
    image: string | null;
    created_at: string;
};

export type ProgramTypeProp = Omit<ProgramType, 'image'> & {
    slug: string;
    image: string | null;
    created_at: string;
};

export type AuthorTypeProp = Omit<AuthorType, ''> & {
    slug: string;
    created_at: string;
};

export type ArticleNewsTypeProp = Omit<ArticleNewsType, 'image'> & {
    slug: string;
    image: string;
    created_at: string;
    author?: { id: number; name: string } | null;
};

export type EventTypeProp = Omit<EventType, 'image'> & {
    slug: string;
    image: string;
    created_at: string;
    organizer?: { id: number; name: string } | null;
};

export interface SocialType {
    label: string;
    icon: LucideIcon;
    hoverColor: string;
    url: string;
}

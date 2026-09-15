import {
    AudioFile,
    AudioFiles,
    Chapter,
    Juz,
    Page,
    QuranResource,
    Reciter,
    Reciters,
    TabType,
} from '@/types/quran';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuranStoreProp {
    activeTab: TabType;
    slug: string;
    chapter: Chapter | Juz | Page | null;
    audioFiles: AudioFile[];
    reciters: Reciter[];
    selectedReciter: Reciter | null;
    isPending: boolean;
    isError: boolean;
    data: QuranResource | null;
    setData: (state: QuranResource) => void;
    setIsPending: (state: boolean) => void;
    setIsError: (state: boolean) => void;
    setSelectedReciter: (reciter: Reciter) => void;
    setReciters: (data: Reciters) => void;
    setAudioFiles: (
        data: AudioFiles,
        chapter: Chapter,
        baseUrl: string,
    ) => void;
    update: (slug: string) => void;
    setActiveTab: (tab: TabType) => void;
    updateChapter: (chapter: Chapter | Juz | Page | null) => void;
}

const useQuranStore = create<QuranStoreProp>()((set, get) => ({
    data: null,
    activeTab: 'chapters',
    slug: '',
    chapter: null,
    audioFiles: [],
    reciters: [],
    selectedReciter: null,
    isPending: false,
    isError: false,
    setData: (state: QuranResource) => set((_) => ({ data: state })),
    setIsPending: (state: boolean) => set((_) => ({ isPending: state })),
    setIsError: (state: boolean) => set((_) => ({ isError: state })),
    setSelectedReciter: (reciter: Reciter) =>
        set((_) => ({ selectedReciter: reciter })),
    setReciters: (data: Reciters) =>
        set((_) => ({ reciters: data.recitations })),
    setAudioFiles: (data: AudioFiles, chapter: Chapter, baseUrl: string) => {
        set((_) => ({ audioFiles: [] }));

        let chapertAudios = data.audio_files
            .filter((item) => {
                let chapterId = item.verse_key.split(':')[0];

                return +chapterId == chapter.id;
            })
            .map((item) => ({
                ...item,
                url: item.url.includes('mirrors.quranicaudio.com')
                    ? `https:${item.url}`
                    : `${baseUrl}/${item.url}`,
            }));

        set((_) => ({ audioFiles: chapertAudios }));
    },
    setActiveTab: (tab: TabType) => set((_) => ({ activeTab: tab })),
    update: (slug) => {
        set((state) => ({ slug: slug }));
    },
    updateChapter: (chapter: Chapter | Juz | Page | null) => {
        set((state) => ({ chapter: chapter }));
    },
}));

export default useQuranStore;

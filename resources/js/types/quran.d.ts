export type TabType = 'chapters' | 'verses' | 'juzs' | 'pages';

type Word = {
    id: number;
    position: number;
    audio_url: string;
    char_type_name: string;
    translation: {
        text: string;
        language_name: string;
    };
    transliteration: {
        text: string;
        language_name: string;
    };
};

type VerseData = {
    id: number;
    chapter_id: number;
    verse_number: number;
    verse_key: string;
    verse_index: number;
    text_uthmani: string;
    text_uthmani_simple: string;
    text_imlaei: string;
    text_imlaei_simple: string;
    text_indopak: string;
    text_uthmani_tajweed: string;
    juz_number: number;
    hizb_number: number;
    rub_el_hizb_number: number;
    page_number: number;
    image_url: string;
    image_width: number;
    words: Word[];
};

export interface Verse {
    verses: VerseData[];
    pagination: {
        per_page: number;
        current_page: number;
        next_page: number;
        total_pages: number;
        total_records: number;
    };
}

export interface Chapter {
    id: number;
    revelation_place: string;
    revelation_order: number;
    bismillah_pre: boolean;
    name_complex: string;
    name_arabic: string;
    verses_count: number;
    pages: number[];
    translated_name: {
        language_name: string;
        name: string;
    };
    name_simple: string;
}

export type Juz = {
    id: number;
    juz_number: number;
    verse_mapping: { [key: string]: string };
    first_verse_id: number;
    last_verse_id: number;
    verses_count: number;
};

export type Page = {
    id: number;
    page_number: number;
    verse_mapping: { [key: string]: string };
    first_verse_id: number;
    last_verse_id: number;
    verses_count: number;
};

export interface QuranResource {
    chapters: Chapter[];
    verses: Chapter[];
    verseData: Verse;
    juzs: Juz[];
    pages: Page[];
}

export type ScriptVerse = {
    id: number;
    word?: string;
    verse_key: string;
    text_uthmani: string;
    text_uthmani_simple: string;
    text_uthmani_tajweed: string;
    text_indopak: string;
    text_indopak_nastaleeq: string;
    text_imlaei: string;
    text_imlaei_simple: string;
    text_qpc_hafs: string;
    text_qpc_nastaleeq: string;
    image_url: string;
    code_v1: string;
    code_v2: string;
    v1_page: number;
    v2_page: number;
    page_number: number;
    verse_number: number;
    verse_index: number;
    juz_number: number;
    hizb_number: number;
    rub_el_hizb_number: number;
    image_width: number;
};

export interface QurancScript {
    verses: ScriptVerse[];
    meta: {
        filters: {
            chapter_number: number;
        };
    };
}

export type AudioFile = {
    verse_key: string;
    url: string;
};

export type Reciter = {
    id: number;
    reciter_name: string;
    style: string | null;
};

export interface Reciters {
    recitations: Reciter[];
}

export interface AudioFiles {
    audio_files: AudioFile[];
    meta: {
        reciter_name: string;
    };
}

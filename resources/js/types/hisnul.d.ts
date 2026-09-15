export type Supplication = {
    id: number;
    categoryId: number | null;
    audio: string | null;
    title: string;
    titleAr: string;
    duaCount: string;
    arabic: string;
    transliteration: string;
    translation: string;
    reference: string;
    referenceAr: string;
};

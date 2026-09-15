import ImaVideoPlayer from '@/components/ui/ima-video-player';
import VideoPlayerWrapper from '@/components/ui/media-player';
import { SwiperPortal } from '@/components/ui/swiper';
import { home } from '@/routes';
import media, { show } from '@/routes/media';
import { Media as MediaType, Playlist } from '@/types/global';
import { Head, Link } from '@inertiajs/react';
import { SwiperSlide } from 'swiper/react';

type PlaylistType = MediaType & {
    medias: MediaType[];
};

type Prop = {
    playlist: PlaylistType;
};

export default function MediaCategory({ playlist }: Prop) {
    if (!playlist) {
        return (
            <div className="mx-5 my-10 max-w-7xl md:mx-auto" dir="rtl">
                <div className="h-full w-full animate-pulse bg-gray-200"></div>
            </div>
        );
    }

    return (
        <>
            <Head title={playlist.title} />

            <div className="mx-5 my-10 max-w-7xl md:mx-auto" dir="rtl">
                <div className="overflow-hidden rounded-md">
                    <div className="relative w-full">
                        {/* adBreaks={[2, 10, 20, 30]} */}
                        <ImaVideoPlayer MID_ROLLS={[2, 10, 20, 30]} />
                        <div className="absolute top-5 right-5 z-50 w-16 rounded-md backdrop-blur-md md:w-32">
                            <img
                                src="/assets/svgs/logo-main.svg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {playlist.medias.length > 0 && (
                    <div className="mt-10">
                        <h3 className="mb-2 text-xl font-bold capitalize">
                            الحلقات
                        </h3>
                        <div className="grid grid-cols-12 gap-2">
                            {playlist &&
                                playlist.medias.length > 0 &&
                                playlist.medias.map((med) => (
                                    <button
                                        onClick={() => {}}
                                        className="group col-span-4 cursor-pointer rounded-md shadow-md hover:shadow-brand-primary"
                                    >
                                        <div className="flex h-40 w-full gap-x-2 overflow-hidden rounded-md">
                                            <div className="h-40 w-40 overflow-hidden rounded-md select-none">
                                                <img
                                                    src={med.cover as string}
                                                    alt={med.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1 p-2 text-right">
                                                <h3 className="mb-1">
                                                    {med.title}
                                                </h3>
                                                <div className="flex justify-between text-xs text-muted-foreground">
                                                    {med.season > 0 && (
                                                        <>
                                                            <p>
                                                                Season{' '}
                                                                {med.season}
                                                            </p>
                                                            <p>•</p>
                                                        </>
                                                    )}
                                                    {med.episode > 0 && (
                                                        <>
                                                            <p>
                                                                Episode{' '}
                                                                {med.episode}
                                                            </p>
                                                            <p>•</p>
                                                        </>
                                                    )}

                                                    <p>{med.duration}m</p>
                                                </div>
                                                {med.description && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: med.description,
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

MediaCategory.layout = ({ playlist }: Prop) => ({
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'لوسائط الإعلامية',
            href: media.index(),
        },
        {
            title: playlist?.title,
            href: '#',
        },
    ],
});

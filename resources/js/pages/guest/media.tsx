import ImaVideoPlayer from '@/components/ui/ima-video-player';
import MediaPlayer from '@/components/ui/media-player';
import VideoPlayerWrapper from '@/components/ui/media-player';
import { SwiperPortal } from '@/components/ui/swiper';
import { home } from '@/routes';
import { show } from '@/routes/media';
import { Media as MediaType, Playlist } from '@/types/global';
import { Head, Link } from '@inertiajs/react';
import { SwiperSlide } from 'swiper/react';

type PlaylistType = Playlist & {
    medias: MediaType[];
};

type Prop = {
    playlists: PlaylistType[];
};

export default function Media({ playlists }: Prop) {
    return (
        <>
            <Head title="Alresoul Media" />

            <div className="mx-5 my-10 max-w-7xl md:mx-auto" dir="rtl">
                <div className="overflow-hidden rounded-md">
                    <div className="relative w-full">
                        <MediaPlayer
                            sources={
                                playlists &&
                                playlists[0]?.medias.map((item) => ({
                                    src: item.video_url,
                                }))
                            }
                        />
                        <div className="absolute top-5 right-5 z-50 w-16 rounded-md backdrop-blur-md md:w-32">
                            <img
                                src="/assets/svgs/logo-main.svg"
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    {playlists &&
                        playlists.length > 0 &&
                        playlists.map((playlist) => (
                            <div key={playlist.title} className="mb-5">
                                <h3 className="mb-2 text-xl font-bold capitalize">
                                    {playlist.title}
                                </h3>
                                <SwiperPortal
                                    className="animated"
                                    slidesPerView={1}
                                    spaceBetween={30}
                                    autoplay={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        640: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 5,
                                            spaceBetween: 50,
                                        },
                                    }}
                                >
                                    {playlist.medias.map((med) => (
                                        <SwiperSlide key={med.id}>
                                            <Link
                                                href={show({
                                                    slug: med.slug,
                                                })}
                                                className="group"
                                            >
                                                <div className="relative h-56 w-56 overflow-hidden rounded-md">
                                                    <div className="absolute inset-0 h-56 w-full select-none">
                                                        <img
                                                            src={
                                                                med.cover as string
                                                            }
                                                            alt={med.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                                        />
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/20"></div>
                                                    <div
                                                        className="absolute inset-0 flex items-center justify-center"
                                                        dir="rtl"
                                                    >
                                                        <h2 className="mt-2 text-sm font-bold text-white">
                                                            {med.title}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </SwiperPortal>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

Media.layout = () => ({
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'ألرسول ميديا',
            href: '#',
        },
    ],
});

import { cn } from '@/lib/utils';
import { Supplication } from '@/types/hisnul';
import { Book, PauseIcon, PlayIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SupplicationList({
    supplications,
}: {
    supplications: Supplication[];
}) {
    const player = useRef<HTMLAudioElement>(null);
    const container = useRef(null);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [previouSup, setPreviouSup] = useState<number | null>(null);

    useEffect(() => {
        return () => {
            player.current?.removeEventListener('ended', handlePlayerEvent);
        };
    }, []);

    useEffect(() => {
        if (player.current)
            player.current.addEventListener('ended', handlePlayerEvent);
    }, [player]);

    const handlePlayerEvent = (event: Event) => {
        if (!player.current) return;

        player.current.pause();
        setIsPaused(true);
        setIsPlaying(false);
        setPreviouSup(null);
    };

    const handlePlayer = (supplication: Supplication) => {
        if (!player.current) return;

        if (previouSup != supplication.id)
            player.current.src = supplication.audio!;

        setPreviouSup(supplication.id);

        if (player.current.paused) {
            setIsPaused(false);

            player.current.play();
        } else {
            player.current.pause();
            setIsPaused(true);
        }
    };

    return (
        <>
            <audio
                id="myAudio"
                preload="auto"
                ref={player}
                className="hidden"
                controls
            ></audio>

            <div className="space-y-5">
                {supplications.map((item) => (
                    <div
                        key={item.id}
                        className="supplication flex flex-col rounded-md bg-white shadow-md"
                    >
                        <div className="flex flex-col justify-center">
                            <div
                                className="mb-2 flex w-full justify-between border-b border-brand-accent/10 p-3"
                                dir="rtl"
                            >
                                <div>
                                    <p>{item.titleAr}</p>
                                </div>

                                {/* {item.audio && (
                                    <button
                                        onClick={() => handlePlayer(item)}
                                        className="flex w-fit cursor-pointer items-center justify-center gap-x-1 rounded-md bg-brand-accent-25 px-2 py-1 text-white hover:bg-brand-accent-45 disabled:bg-gray-50"
                                    >
                                        {item.id == previouSup ? (
                                            <>
                                                {isPaused ? (
                                                    <PlayIcon className="size-4.5" />
                                                ) : (
                                                    <PauseIcon className="size-4.5" />
                                                )}
                                            </>
                                        ) : (
                                            <PlayIcon className="size-4.5" />
                                        )}
                                    </button>
                                )} */}
                            </div>
                            <div className="quran-text">
                                <p
                                    className={cn(
                                        previouSup == item.id &&
                                            'font-bold text-brand-accent-100',
                                    )}
                                >
                                    {item.arabic}
                                </p>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="w-full rounded-md bg-brand-accent-45 p-5 text-white">
                                <p className="text-center">
                                    {item.transliteration}
                                </p>
                            </div>
                            <div
                                className="mt-2 flex w-full items-center justify-start gap-x-1 text-left text-xs"
                                dir="rtl"
                            >
                                <Book className="size-4" />
                                <p>{item.referenceAr}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

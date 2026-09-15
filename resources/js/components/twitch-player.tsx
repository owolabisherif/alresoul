import { cn } from '@/lib/utils';
import { PlayCircleIcon, PlayIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

let twitchScriptPromise: any = null;

function loadTwitchScript() {
    if ((window as any).Twitch) {
        return Promise.resolve((window as any).Twitch);
    }

    if (twitchScriptPromise) {
        return twitchScriptPromise;
    }

    twitchScriptPromise = new Promise((resolve, reject) => {
        const existingScript = document.querySelector(
            'script[src="https://player.twitch.tv/js/embed/v1.js"]',
        );

        if (existingScript) {
            existingScript.addEventListener('load', () => {
                resolve((window as any).Twitch);
            });

            existingScript.addEventListener('error', reject);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://player.twitch.tv/js/embed/v1.js';
        script.async = true;

        script.onload = () => {
            if ((window as any).Twitch) {
                resolve((window as any).Twitch);
            } else {
                reject(
                    new Error('Twitch loaded but window.Twitch is unavailable'),
                );
            }
        };

        script.onerror = () => {
            reject(new Error('Failed to load Twitch embed script'));
        };

        document.body.appendChild(script);
    });

    return twitchScriptPromise;
}

export default function TwitchPlayer({ channel }: { channel: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<any>(null);
    const [offline, setOffline] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [inview, setInview] = useState<boolean>(false);
    const playerPollId = useRef<any>(null);

    const handlePlay = () => {
        if (!playerRef.current) return;
        playerRef.current.play();
    };

    useEffect(() => {
        let cancelled = false;

        async function createPlayer() {
            try {
                setLoading(true);
                const Twitch = await loadTwitchScript();

                if (cancelled || !containerRef.current) {
                    return;
                }

                // Prevent duplicate players.
                containerRef.current.innerHTML = '';

                playerRef.current = new Twitch.Player(containerRef.current, {
                    channel,
                    width: '100%',
                    height: '100%',
                    autoplay: true,
                    muted: true,

                    // IMPORTANT:
                    // Use your actual hostname here.
                    parent: [window.location.hostname],
                });

                playerRef.current.addEventListener(Twitch.Player.READY, () => {
                    setLoading(false);
                    console.log('Twitch player ready');
                });

                playerRef.current.addEventListener(
                    Twitch.Player.OFFLINE,
                    () => {
                        setOffline(true);
                        console.log('offline');
                    },
                );

                playerRef.current.addEventListener(Twitch.Player.ONLINE, () => {
                    setOffline(false);
                    console.log('online');
                });

                playerRef.current.addEventListener(
                    Twitch.Player.PLAYING,
                    () => {
                        setPlaying(true);
                        console.log('playing');
                    },
                );

                playerRef.current.addEventListener(
                    Twitch.Player.PLAYBACK_BLOCKED,
                    () => {
                        console.log('blocked');
                    },
                );

                playerRef.current.addEventListener(Twitch.Player.PAUSE, () => {
                    setPlaying(false);
                    console.log('paused');
                });
            } catch (error) {
                console.error('Twitch player failed:', error);
            }
        }

        createPlayer();

        return () => {
            cancelled = true;

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }

            playerRef.current = null;
        };
    }, [channel]);

    useEffect(() => {
        if (!playerRef.current) return;
        if (playing) {
            clearInterval(playerPollId.current);
            console.clear();
            return;
        }

        if (!inview || offline) return;

        playerPollId.current = setInterval(() => {
            handlePlay();
            console.clear();
        }, 100);
        return () => {
            clearInterval(playerPollId.current);
        };
    }, [playing, inview]);

    useEffect(() => {
        const element = playerRef.current;
        if (!element) return;

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];

                setInview(entry.isIntersecting);
            },
            {
                threshold: 0.01,
            },
        );

        intersectionObserver.observe(element._target);

        return () => {
            intersectionObserver.disconnect();
        };
    }, [playerRef.current]);

    return (
        <div
            className="relative"
            style={{
                width: '100%',
                aspectRatio: '16 / 9',
            }}
        >
            {loading || offline ? (
                <div className={cn('absolute inset-0 z-30 bg-cover bg-center')}>
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black">
                        <div className="w-1/2">
                            <img
                                src="/assets/svgs/logo-main-header.svg"
                                className="h-full w-full"
                            />
                        </div>
                        {offline && (
                            <h2
                                className="text-2xl font-bold text-white"
                                dir="rtl"
                            >
                                سنعود حالًا.
                            </h2>
                        )}
                    </div>
                </div>
            ) : !inview ? (
                <div className={cn('absolute inset-0 z-30 bg-cover bg-center')}>
                    <div className="flex h-full w-full flex-col items-center justify-center bg-black/70">
                        <div className="w-1/2">
                            <img
                                src="/assets/svgs/logo-main-header.svg"
                                className="h-full w-full"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white" dir="rtl">
                            سنعود حالًا.
                        </h2>
                    </div>
                </div>
            ) : (
                // <div className="absolute inset-0 z-30">
                //     <button onClick={() => handlePlay()}>
                //         <PlayCircleIcon className="size-20 text-white" />
                //     </button>
                // </div>
                ''
            )}

            <div
                className="absolute inset-0"
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: '16 / 9',
                }}
            />
        </div>
    );
}

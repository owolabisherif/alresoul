import '@mantine/core/styles.css';
import '@gfazioli/mantine-audio/styles.css';
import { home, sermon } from '@/routes';
import { Audio, useAudio } from '@gfazioli/mantine-audio';
import {
    MantineProvider,
    Group,
    Stack,
    Avatar,
    Text,
    ActionIcon,
} from '@mantine/core';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { CalenderType, SermonTypeProp } from '@/types/global';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { podcast } from '@/routes/sermon';
import { cn } from '@/lib/utils';
import { AudioTimeline } from '@/packages/mantin/audio-timeline';
import { AudioWaveform } from '@/packages/mantin/audio-waveform';
import { SkipForwardIcon } from 'lucide-react';
import { AudioSkipButton } from '@/packages/mantin/audio-skipbutton';
import { useIsMobile } from '@/hooks/use-mobile';

type Prop = {
    calendar: CalenderType[];
};

export default function Sermon({ calendar }: Prop) {
    const [year, setYear] = useState<string | null>(null);
    const [selected, setSelected] = useState<SermonTypeProp | null>(null);
    const [sermons, setSermons] = useState<SermonTypeProp[]>([]);
    const player = useRef<HTMLDivElement>(null);
    const muteBtn = useRef<HTMLButtonElement>(null);
    const wave = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [playbackRate, setPlaybackRate] = useState<number>(1);
    const [muted, setMuted] = useState<boolean>(false);
    const [playing, setPlaying] = useState<boolean>(false);
    const [audioIndex, setAudioIndex] = useState<number>(0);

    const isMobile = useIsMobile();

    useEffect(() => {
        getSermons();
    }, []);

    useEffect(() => {
        if (audioIndex == 0) return;

        const audioPlayer = player.current?.firstChild as HTMLAudioElement;

        // audioPlayer.pause();
        // audioPlayer.load();
        // audioPlayer.play();

        setTimeout(() => {
            muteBtn.current?.click();
        }, 10);
    }, [audioIndex, playing]);

    useEffect(() => {
        if (!calendar.length) return;

        const active = calendar.find((item) => item.isActive);

        if (active) setYear(active.id);
    }, [calendar]);

    const handleYear = (payload: string) => {
        setYear(payload);

        const [month, year] = payload.split('/');

        getSermons(month, parseInt(year));
    };

    const getSermons = async (month: string = 'none', year: number = 0) => {
        try {
            const res = await axios.get<SermonTypeProp[]>(
                podcast({ month: month, year: year }).url,
            );

            setSermons(res.data);

            setSelected(res.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnded = () => {
        if (!selected) return;

        const selectedIndex = sermons.findIndex(
            (item) => item.id == selected.id,
        );

        if (selectedIndex == sermons.length - 1) {
            setSelected(sermons[0]);
            return;
        }

        setSelected(sermons[selectedIndex + 1]);

        setAudioIndex(selectedIndex + 1);
    };

    const handleForwardSkip = () => {
        if (!selected) return;

        const selectedIndex = sermons.findIndex(
            (item) => item.id == selected.id,
        );

        if (selectedIndex == sermons.length - 1) {
            return;
        }

        setSelected(sermons[selectedIndex + 1]);

        setAudioIndex(selectedIndex + 1);
    };

    const handleBackSkip = () => {
        if (!selected) return;

        const selectedIndex = sermons.findIndex(
            (item) => item.id == selected.id,
        );

        if (selectedIndex == 0) {
            return;
        }

        setSelected(sermons[selectedIndex - 1]);

        setAudioIndex(selectedIndex - 1);
    };

    return (
        <div className="mx-5 mt-5 mb-10 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
            <div className="w-full overflow-hidden rounded-md border border-gray-100">
                <div className="p-2">
                    <div className="h-48 w-full overflow-hidden rounded-md border border-gray-100 md:h-96">
                        <img
                            src="/assets/images/podcast1_bg.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="m-3 h-fit rounded-md border border-gray-100 p-2">
                    <Select onValueChange={handleYear}>
                        <SelectTrigger className="rounded-md">
                            <span className="capitalize">
                                {year ?? 'Select date'}
                            </span>
                        </SelectTrigger>
                        <SelectContent>
                            {calendar.length > 0 &&
                                calendar.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id}
                                        className={cn(
                                            year == item.id && 'bg-gray-100',
                                        )}
                                    >
                                        {item.month.name} {item.year}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    <div className="mt-5 flex scrollbar-none scrollbar-thumb-brand-accent gap-x-3 overflow-x-auto overflow-y-hidden pr-2 md:scrollbar-none md:scrollbar-gutter-stable md:hover:scrollbar-thin">
                        {sermons.length > 0 &&
                            sermons.map((ser) => (
                                <button
                                    key={ser.id}
                                    dir="rtl"
                                    className={cn(
                                        'mb-1 flex w-80 shrink-0 cursor-pointer gap-x-2 rounded-md p-1 pr-2 shadow-sm shadow-brand-accent-50 transition-shadow hover:shadow-brand-accent',
                                        selected?.id == ser.id &&
                                            'shadow-brand-accent',
                                    )}
                                    onClick={() => setSelected(ser)}
                                >
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-100">
                                        <img
                                            src={ser.cover ?? undefined}
                                            alt={ser.partner}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <p className="line-clamp-1 text-right text-sm font-semibold">
                                            {ser.title}
                                        </p>

                                        <p className="text-right text-xs text-gray-400">
                                            <span className="uppercase">
                                                {ser.source}
                                            </span>
                                            , {ser.type}
                                        </p>
                                        <p className="text-right text-xs text-gray-300">
                                            {ser.partner}
                                        </p>
                                    </div>
                                </button>
                            ))}
                    </div>
                </div>
                <div className="px-2 pb-2">
                    <MantineProvider>
                        <Group
                            align="flex-start"
                            className="flex-wrap items-start md:flex-nowrap"
                        >
                            <Group wrap="nowrap">
                                <Avatar
                                    src={
                                        selected
                                            ? selected.cover
                                            : '/assets/svgs/logo-main.svg'
                                    }
                                    size={80}
                                    radius="md"
                                    className="border border-gray-200 shadow-md"
                                />
                                <div className="block md:hidden">
                                    <Text fw={600}>
                                        {selected
                                            ? selected.title
                                            : '---------------------------------'}
                                    </Text>
                                    <Text fz="xs" c="dimmed">
                                        {selected
                                            ? `${selected.partner}, ${selected.source.toUpperCase()}, ${selected.type}`
                                            : '----------'}
                                    </Text>
                                </div>
                            </Group>
                            <Stack gap={4} style={{ flex: 1 }}>
                                <div className="hidden md:block">
                                    <Text fw={600}>
                                        {selected
                                            ? selected.title
                                            : '---------------------------------'}
                                    </Text>
                                    <Text fz="xs" c="dimmed">
                                        {selected
                                            ? `${selected.partner}, ${selected.source.toUpperCase()}, ${selected.type}`
                                            : '----------'}
                                    </Text>
                                </div>

                                <Audio
                                    src={
                                        selected
                                            ? `/sermon/audio?path=${encodeURI(selected.url!)}`
                                            : '#'
                                    }
                                    key={selected?.id}
                                    variant="floating"
                                    ref={player}
                                    color="yellow"
                                    onPlay={() => setPlaying(true)}
                                    playbackRate={playbackRate}
                                    onPlaybackRateChange={setPlaybackRate}
                                    muted={muted}
                                    onVolumeChange={setVolume}
                                    size={isMobile ? 'xs' : 'xl'}
                                    crossOrigin=""
                                    onEnded={() => handleEnded()}
                                    controls={true}
                                    volume={volume}
                                    scrubSound={true}
                                >
                                    <Audio.Waveform
                                        height={48}
                                        ref={wave}
                                        scrubSound={true}
                                    />
                                    <Audio.Controls>
                                        <AudioSkipButton
                                            btnType="back"
                                            onClickRef={() => handleBackSkip()}
                                        />
                                        <Audio.PlayButton ref={muteBtn} />
                                        <AudioSkipButton
                                            onClickRef={() =>
                                                handleForwardSkip()
                                            }
                                        />

                                        <Audio.Timeline liveScrub={true} />
                                        <Audio.TimeDisplay />
                                        <Audio.SkipButton seconds={-10} />
                                        <Audio.SkipButton seconds={10} />
                                        <div onClick={() => setMuted(!muted)}>
                                            <Audio.MuteButton />
                                        </div>

                                        <Audio.VolumeSlider />
                                        <Audio.SpeedControl />
                                    </Audio.Controls>
                                    <Audio.Spectrum
                                        height={60}
                                        barCount={48}
                                        colorMode="gradient"
                                    />
                                </Audio>
                            </Stack>
                        </Group>
                    </MantineProvider>
                </div>
            </div>
        </div>
    );
}

Sermon.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'الخُطَب',
            href: sermon().url,
        },
    ],
};

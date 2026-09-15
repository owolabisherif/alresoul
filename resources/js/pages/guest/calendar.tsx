import { calendar, home } from '@/routes';
import { hijri } from '@/routes/api/calendar';
import { useQuery } from '@tanstack/react-query';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, usePresenceData, wrap } from 'motion/react';
import { format, parseISO, parse } from 'date-fns';
import {
    ArrowLeft,
    ArrowLeftCircle,
    ArrowRight,
    ArrowRightCircle,
    ChevronDown,
    ChevronUp,
    MoonIcon,
} from 'lucide-react';
import axios from 'axios';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CollapsibleContent } from '@radix-ui/react-collapsible';
import { Badge } from '@/components/ui/badge';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CalenderType } from '@/types/global';
import { Hijri } from '@/types/hijri';
import { DayType, MonthType, useDay, useMonth } from '../hooks/use-month';

type Key =
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';

type HijriEntry = Hijri | null;

type Prop = {
    calendar: CalenderType[];
};

const container: React.CSSProperties = {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
};

const box: React.CSSProperties = {
    width: 150,
    height: 150,
    backgroundColor: 'var(--hue-5)',
    borderRadius: '10px',
};

const button: React.CSSProperties = {
    backgroundColor: 'var(--hue-5)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    outlineOffset: 2,
};

export default function Calendar({ calendar }: Prop) {
    const [selectedItem, setSelectedItem] = useState<CalenderType | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [hijris, setHijris] = useState<HijriEntry[]>([]);
    const [days, setDays] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [activeDay, setActiveDay] = useState<string | null>(null);

    const weekdays: Key[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    useEffect(() => {
        handleFetch();
    }, [selectedItem]);

    useEffect(() => {
        const currentItem = calendar.find((item) => item.isActive);

        if (currentItem) {
            setSelectedItem(currentItem);
        }
    }, []);

    const handleFetch = async () => {
        if (!selectedItem) return;

        try {
            setLoading(true);

            const res = await axios.get(
                hijri({
                    month: selectedItem.month.id,
                    year: selectedItem.year,
                }).url,
            );

            const data = res.data.data as Hijri[];

            let hijriDays: string[] = [];

            let firstDayOfWeek = -1;

            let firstHijri = data.find((item) => item.gregorian.day == '01');

            if (!firstHijri) return;

            firstDayOfWeek = weekdays.findIndex(
                (item) =>
                    item.toLowerCase() ==
                    firstHijri.gregorian.weekday.en.toLowerCase(),
            );

            if (firstDayOfWeek == -1) return;

            let hijriList: HijriEntry[] = [
                ...Array.from({ length: firstDayOfWeek }, (v, _) => null),
                ...data,
            ];

            setHijris(hijriList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    function setSlide(newDirection: 1 | -1) {
        const selectedItemIndex = calendar.findIndex(
            (item) => item.id == selectedItem!.id,
        );

        const nextItem = wrap(
            0,
            calendar.length,
            selectedItemIndex + newDirection,
        );

        setSelectedItem(calendar[nextItem]);

        setDirection(newDirection);
    }

    const parsedDate = (str: string) => {
        const parsedDate = parse(str, 'dd-MM-yyyy', new Date());

        return parsedDate;
    };

    useGSAP(() => {
        gsap.utils.toArray('.hijri').forEach((ring: any, index) => {
            gsap.from(ring, {
                stagger: index % 2 === 0 ? 0.2 : 0.5,
                x: -80,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.15,
            });
        });
    }, [direction, calendar]);

    return (
        <div className="mx-5 my-5 flex min-h-screen max-w-7xl flex-col justify-start md:mx-auto">
            <div className="mb-5 flex w-full justify-center">
                <h1 className="quran-text">
                    بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                </h1>
            </div>

            <div className="mb-5 flex justify-between" dir="ltr">
                <motion.button
                    initial={false}
                    animate={{}}
                    aria-label="Previous"
                    style={button}
                    onClick={() => setSlide(-1)}
                    whileFocus={{ outline: `2px solid blue` }}
                    whileTap={{ scale: 0.9 }}
                    disabled={loading}
                    className="group cursor-pointer"
                >
                    <ArrowLeftCircle className="size-23 text-brand-accent-100 group-hover:text-brand-accent-50" />
                </motion.button>
                <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="popLayout"
                >
                    {selectedItem && (
                        <Slide key={selectedItem.id} calendar={selectedItem} />
                    )}
                </AnimatePresence>
                <motion.button
                    initial={false}
                    animate={{}}
                    aria-label="Next"
                    disabled={loading}
                    style={button}
                    onClick={() => setSlide(1)}
                    whileFocus={{ outline: `2px solid blue` }}
                    whileTap={{ scale: 0.9 }}
                    className="group cursor-pointer"
                >
                    <ArrowRightCircle className="size-23 text-brand-accent-100 group-hover:text-brand-accent-50" />
                </motion.button>
            </div>

            <div className="hidden grid-cols-14 gap-y-2 md:grid md:gap-2">
                {weekdays.map((wk) => (
                    <div className="col-span-2" key={wk}>
                        <div className="mb-2 rounded-md bg-white p-3 text-right shadow-md backdrop-blur-md">
                            <p className="font-bold">{useDay(wk as DayType)}</p>
                        </div>
                    </div>
                ))}
            </div>
            {hijris.length > 0 && (
                <div className="grid grid-cols-14 gap-y-2 md:gap-2">
                    {hijris.map((hijri, index) =>
                        hijri ? (
                            <div
                                key={hijri.gregorian.date}
                                className="hijri col-span-14 rounded-md bg-white p-3 shadow-md backdrop-blur-md md:col-span-2"
                            >
                                <p className="text-xs text-brand-accent md:text-gray-100">
                                    {hijri.gregorian.weekday.en}
                                </p>
                                <div className="flex w-full items-center justify-center">
                                    {hijri.gregorian.lunarSighting && (
                                        <div>
                                            <MoonIcon className="size-6 text-yellow-300" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="mb-1 text-right text-[15px]">
                                            {format(
                                                parsedDate(
                                                    hijri.gregorian.date,
                                                ),
                                                'do MMMM yyyy',
                                            )}
                                        </p>
                                        <p
                                            className="text-[13px] font-bold"
                                            dir="rtl"
                                        >
                                            {`${hijri.hijri.day} ${hijri.hijri.month?.ar} ${hijri.hijri.year} ${hijri.hijri.designation.abbreviated}`}
                                        </p>
                                    </div>
                                </div>
                                {hijri.hijri.holidays &&
                                    hijri.hijri.holidays.length > 0 && (
                                        <Collapsible
                                            className="mt-5 rounded-md border border-gray-100"
                                            open={
                                                open &&
                                                activeDay == hijri.gregorian.day
                                            }
                                            onOpenChange={setOpen}
                                        >
                                            <CollapsibleTrigger
                                                onClick={() =>
                                                    setActiveDay(
                                                        hijri.gregorian.day,
                                                    )
                                                }
                                                dir="rtl"
                                                className="flex w-full items-center justify-center p-1"
                                            >
                                                <div className="flex flex-1 justify-between">
                                                    <p
                                                        className="text-right font-bold"
                                                        dir="rtl"
                                                    >
                                                        العطلات
                                                    </p>
                                                    {open &&
                                                    activeDay ==
                                                        hijri.gregorian.day ? (
                                                        <ChevronUp className="size-5 text-brand-accent" />
                                                    ) : (
                                                        <ChevronDown className="size-5 text-brand-accent" />
                                                    )}
                                                </div>
                                                <Badge
                                                    color="red"
                                                    className="flex items-center justify-center bg-brand-primary text-brand-accent"
                                                >
                                                    {
                                                        hijri.hijri.holidays
                                                            .length
                                                    }
                                                </Badge>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-0.5 px-1 pb-1">
                                                {hijri.hijri.holidays.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="rounded-md bg-brand-accent-50 p-2 text-xs text-brand-accent"
                                                        >
                                                            <p>{item}</p>
                                                        </div>
                                                    ),
                                                )}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    )}
                            </div>
                        ) : (
                            <div
                                key={index}
                                className="col-span-2 bg-transparent"
                            ></div>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}

const Slide = forwardRef(function Slide(
    { calendar }: { calendar: CalenderType },
    ref: React.Ref<HTMLDivElement>,
) {
    const direction = usePresenceData();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    delay: 0.2,
                    type: 'spring',
                    visualDuration: 0.3,
                    bounce: 0.4,
                },
            }}
            exit={{ opacity: 0, x: direction * -50 }}
            style={{}}
        >
            <div className="flex justify-center text-center">
                <p className="font-bold md:text-3xl" dir="rtl">
                    التقويم الميلادي إلى الهجري{' '}
                    {useMonth(calendar.month.name as MonthType)} {calendar.year}
                </p>
            </div>
        </motion.div>
    );
});

Calendar.layout = {
    breadcrumbs: [
        {
            title: 'الرئيسية',
            href: home().url,
        },
        {
            title: 'التقويم',
            href: calendar().url,
        },
    ],
};

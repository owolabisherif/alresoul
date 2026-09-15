import Prayer from '@/assets/prayer';
import Undderliner from '../ui/underliner';
import Location from '@/assets/location';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TimezoneType } from '@/types/global';
import usePrayerTimeStore from '@/stores/prayertime';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import {
    MapPinIcon,
    PinIcon,
    Settings2Icon,
    Speaker,
    SpeakerIcon,
    Volume2Icon,
} from 'lucide-react';
import { timings as ts } from '@/routes/api/prayer';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { PrayerItem, Timing } from '@/types/prayer-time';
import { format, add } from 'date-fns';
import server from '@/routes/api/server';

gsap.registerPlugin(ScrollTrigger);

type PrayerTimeResponse = {
    date: {};
};

type Prop = {
    timezones: TimezoneType[];
};

const PrayerTimeType = Object.freeze({
    Timings: 'timings',
    TimingsByAddress: 'timingsByAddress',
    TimingsByCity: 'timingsByCity',
    NextPrayer: 'nextPrayer',
    NextPrayerByAddress: 'nextPrayerByAddress',
});

export default function PrayerTime({ timezones }: Prop) {
    const container = useRef(null);
    const [currentTime, updateCurrentTime] = useState(new Date());
    const timerId = useRef(0);
    const [country, setCountry] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<TimezoneType | null>(
        null,
    );
    const {
        coordinate,
        settings,
        hasTzone,
        timings,
        callPrayer,
        updateCallPrayer,
        setHasTzone,
        updateSettings,
        setTimings,
    } = usePrayerTimeStore();
    const page = usePage().props;
    const [prayerTimeHeader, setPrayerTimeHeader] = useState<
        string[] | undefined
    >([]);
    const [prayerTimeBody, setPrayerTimeBody] = useState<
        PrayerItem[] | undefined
    >([]);
    const [prayerTimes, setPrayerTimes] = useState([
        {
            type: 'header',
            items: ['اسم الصلاة', 'وقت الأذان', 'وقت الصلاة'],
        },
        {
            type: 'body',
            timings: [
                {
                    title: 'صلاة الفجر',
                    actualTime: '03:24 AM',
                    callTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'وقت الشروق',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة الظهر',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة العصر',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة المغرب',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة العشاء',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'وقت غروب الشمس',
                    callTime: '03:24 AM',
                    actualTime: '03:24 AM',
                    prayerTime: '04:30 AM',
                    isNext: false,
                    callPrayer: false,
                },
            ] as PrayerItem[],
        },
    ]);

    useEffect(() => {
        handleGetTimings();

        timerId.current = setInterval(handleTimer, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    const handleTimer = async () => {
        const res = await axios.get(server.time().url);

        updateCurrentTime(res.data);
    };

    useEffect(() => {
        handleNextPrayer();
    }, [currentTime]);

    useEffect(() => {
        const selectedTzone = timezones.find(
            (item) => item.country_code == country,
        );

        if (settings) settings.timezone = '';

        if (selectedTzone) setSelectedCountry(selectedTzone);
    }, [country]);

    useEffect(() => {
        if (!settings) return;

        if (settings.timezone == '') return;

        handleGetTimings();
    }, [settings]);

    const handleNextPrayer = () => {
        if (!prayerTimeBody) return;

        let tm = +format(currentTime, 'H');
        let tn = format(currentTime, 'H:mm');

        let st = new Date(currentTime).getTime();

        // let dt = Date.parse(`${format(currentTime, 'yyyy-MM-dd')} 12:15:00`);

        let nextPr = prayerTimeBody.find((pr) => {
            let hr = +pr.actualTime.split(':')[0];
            let min = +pr.actualTime.split(':')[1];

            let dt = Date.parse(
                `${format(currentTime, 'yyyy-MM-dd')} ${hr}:${min}:00`,
            );

            return dt > st;
        });

        let updatedPrs = prayerTimeBody.filter((pr) => {
            let hr = +pr.actualTime.split(':')[0];
            let min = +pr.actualTime.split(':')[1];

            let dt = Date.parse(
                `${format(currentTime, 'yyyy-MM-dd')} ${hr}:${min}:00`,
            );

            return dt < st;
        });

        for (const item of updatedPrs) {
            item.isNext = false;
            item.callPrayer = false;
        }

        if (nextPr) {
            nextPr.isNext = true;

            if (nextPr.actualTime == tn) {
                nextPr.callPrayer = true;
                updateCallPrayer(true);
            }
        }
    };

    const handleGetTimings = useCallback(async () => {
        try {
            if (hasTzone) return;

            const searchParam = new URLSearchParams({
                ...JSON.parse(JSON.stringify(coordinate)),
                ...settings,
            }).toString();

            const res = await axios.get<Timing>(
                `${
                    ts({
                        type: PrayerTimeType.TimingsByCity,
                        date: 'null',
                    }).url
                }?${searchParam}`,
            );

            setHasTzone(true);

            console.log(res.data);

            setTimings(res.data);
        } catch (error) {
            console.error(error);
        }
    }, [settings]);

    const getNextPrayer = async () => {
        try {
            if (!settings) return;

            const searchParam = new URLSearchParams({
                ...JSON.parse(JSON.stringify(coordinate)),
                ...{
                    address: `${(settings.city, settings.country)}`,
                    ...settings,
                },
            }).toString();

            const res = await axios.get<Timing>(
                `${
                    ts({
                        type: PrayerTimeType.NextPrayerByAddress,
                        date: 'null',
                    }).url
                }?${searchParam}`,
            );
        } catch (error) {
            console.error(error);
        }
    };

    const getPrayerTime = (time: string): string => {
        let hr = +time.split(':')[0];
        let min = +time.split(':')[1];
        let dif = 0;
        let adj = 15;

        if (min + adj >= 60) {
            dif = (min + adj) % 60;

            hr = hr + Math.floor((min + adj) / 60);
        }

        return `${hr.toString().length > 1 ? hr : `0${hr}`}:${dif > 0 ? dif : min + adj}`;
    };

    const amPmConverter = (time: string): string => {
        let hr = +time.split(':')[0];
        let min = +time.split(':')[1];
        let ampm = 'AM';

        if (hr > 12) {
            hr = hr - 12;
            ampm = 'PM';
        }

        return `${hr.toString().length > 1 ? hr : `0${hr}`}:${min.toString().length > 1 ? min : `0${min}`} ${ampm}`;
    };

    useEffect(() => {
        if (!timings) return;

        let prTimes = [...prayerTimes];

        prTimes[1] = {
            type: 'body',
            timings: [
                {
                    title: 'صلاة الفجر',
                    actualTime: timings.timings.Fajr,
                    callTime: amPmConverter(timings.timings.Fajr),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Fajr),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'وقت الشروق',
                    actualTime: timings.timings.Sunrise, //format(timings.timings.Sunrise, 'h:m b'),
                    callTime: amPmConverter(timings.timings.Sunrise), //format(timings.timings.Sunrise, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Sunrise),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة الظهر',
                    actualTime: timings.timings.Dhuhr, //format(timings.timings.Dhuhr, 'h:m b'),
                    callTime: amPmConverter(timings.timings.Dhuhr), //format(timings.timings.Dhuhr, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Dhuhr),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة العصر',
                    actualTime: timings.timings.Asr,
                    callTime: amPmConverter(timings.timings.Asr), //format(timings.timings.Asr, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Asr),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة المغرب',
                    actualTime: timings.timings.Maghrib, //format(timings.timings.Maghrib, 'h:m b'),
                    callTime: amPmConverter(timings.timings.Maghrib), //format(timings.timings.Maghrib, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Maghrib),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'صلاة العشاء',
                    actualTime: timings.timings.Isha, //format(timings.timings.Isha, 'h:m b'),
                    callTime: amPmConverter(timings.timings.Isha), //format(timings.timings.Isha, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Isha),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
                {
                    title: 'وقت غروب الشمس',
                    actualTime: timings.timings.Sunset, //format(timings.timings.Sunset, 'h:m b'),
                    callTime: amPmConverter(timings.timings.Sunset), //format(timings.timings.Sunset, 'h:m b'),
                    prayerTime: amPmConverter(
                        getPrayerTime(timings.timings.Sunset),
                    ),
                    isNext: false,
                    callPrayer: false,
                },
            ],
        };

        setPrayerTimes(prTimes);
    }, [timings]);

    useGSAP(
        () => {
            gsap.from('.prayer-image', {
                scrollTrigger: {
                    trigger: container.current,
                    toggleActions: 'restart',
                },
                x: -80,
                opacity: 0,
                ease: 'expo.out',
                duration: 1,
            });

            gsap.from('.prayer-time', {
                scrollTrigger: {
                    trigger: container.current,
                    toggleActions: 'restart',
                },
                x: 80,
                opacity: 0,
                ease: 'expo.out',
                delay: 0.2,
            });
        },
        { scope: container },
    );

    useEffect(() => {
        const prayerHeader = prayerTimes.find(
            (item) => item.type == 'header',
        )?.items;

        const prayerBody: PrayerItem[] = prayerTimes.find(
            (item) => item.type == 'body',
        )?.timings as PrayerItem[];

        setPrayerTimeBody(prayerBody);
        setPrayerTimeHeader(prayerHeader);
    }, [prayerTimes]);

    const handleUpdate = (key: string, value: string) => {
        if (key == 'country') {
            setCountry(value);
            if (settings) updateSettings({ ...settings, timezone: '' });
        }

        if (settings) {
            let st = {};

            if (key == 'timezone') {
                st = {
                    state: value.split('/').pop(),
                    city: value.split('/').pop(),
                };
            }

            updateSettings({ ...settings, ...st, [key]: value });
        } else {
            updateSettings({
                ...{
                    city: '',
                    state: '',
                    country: '',
                    method: null,
                    shafaq: null,
                    tune: null,
                    school: null,
                    midnightMode: null,
                    timezone: '',
                    latitudeAdjustmentMethod: null,
                    calendarMethod: null,
                    iso8601: 'true',
                },
                [key]: value,
            });
        }

        setHasTzone(false);
    };

    return (
        <div
            className="grid grid-cols-12 gap-x-5 py-20"
            id="prayer-time"
            ref={container}
        >
            <div className="prayer-image col-span-12 flex items-center justify-center md:col-span-6">
                <Prayer />
            </div>
            <div className="prayer-time col-span-12 mt-5 flex flex-col justify-center md:col-span-6 md:mt-0">
                <div
                    className="mb-2 flex items-center justify-between"
                    dir="rtl"
                >
                    <Undderliner
                        title="مواقيت الصلاة"
                        position="start"
                        className="justify-start text-lg md:text-2xl"
                    />
                    <div className="flex items-center gap-x-2 justify-self-start">
                        <Dialog>
                            <DialogTrigger className="group flex cursor-pointer items-center gap-x-2 justify-self-start rounded-md border border-gray-100 px-2 py-1 hover:bg-brand-accent">
                                <div className="w-4 md:w-6">
                                    <MapPinIcon className="w-full text-brand-primary" />
                                </div>
                                <h2 className="text-xs font-bold text-brand-accent group-hover:text-white md:text-lg">
                                    {settings && settings.timezone != ''
                                        ? settings.timezone
                                        : 'اختر المنطقة الزمنية'}
                                </h2>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle dir="rtl">
                                    تغيير المعلومات
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                                <div
                                    className="grid w-full grid-cols-12 gap-x-3 md:gap-3"
                                    dir="rtl"
                                >
                                    <div className="col-span-12">
                                        <p>الدولة</p>
                                        <Select
                                            onValueChange={(value) =>
                                                handleUpdate('country', value)
                                            }
                                        >
                                            <SelectTrigger className="w-full rounded-md">
                                                <span className="capitalize">
                                                    {selectedCountry?.name ??
                                                        'اختر الدولة'}
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timezones.length > 0 &&
                                                    timezones.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={
                                                                    item.country_code
                                                                }
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-12">
                                        <p>المنطقة الزمنية</p>
                                        <Select
                                            onValueChange={(value) =>
                                                handleUpdate('timezone', value)
                                            }
                                            disabled={!selectedCountry}
                                        >
                                            <SelectTrigger className="w-full rounded-md">
                                                <span className="capitalize">
                                                    {settings &&
                                                    settings.timezone != ''
                                                        ? settings.timezone
                                                        : 'اختر المنطقة الزمنية'}
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {selectedCountry &&
                                                    selectedCountry.timezones
                                                        .length > 0 &&
                                                    selectedCountry.timezones.map(
                                                        (item, index) => (
                                                            <SelectItem
                                                                key={index}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary">
                                            إغلاق
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {timings && (
                    <div
                        className="mb-5 flex flex-col items-start text-sm text-gray-400"
                        dir="rtl"
                    >
                        <p dir="ltr" className="text-left">
                            {`${timings.date.gregorian.day} ${timings.date.gregorian.month.en}, ${timings.date.gregorian.year}`}{' '}
                            {timings.date.gregorian.designation.abbreviated}
                        </p>
                        <p>
                            {`${timings.date.hijri.day} ${timings.date.hijri.month.ar}, ${timings.date.hijri.year}`}{' '}
                            {timings.date.hijri.designation.abbreviated}
                        </p>
                        <p>{timings.meta.timezone}</p>
                    </div>
                )}

                {prayerTimeBody?.length && (
                    <div className="w-full" dir="rtl">
                        <table className="table w-full table-auto">
                            <thead>
                                <tr>
                                    {prayerTimeHeader!.map((item, index) => (
                                        <th
                                            key={item}
                                            className={cn(
                                                index + 1 !=
                                                    prayerTimeHeader!.length &&
                                                    'pl-5',
                                                'pb-5',
                                            )}
                                        >
                                            <div className="flex w-auto items-center justify-center rounded-lg bg-brand-accent p-1 text-white shadow-md md:p-4">
                                                <p className="text-xs md:text-lg">
                                                    {item}
                                                </p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {prayerTimeBody.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={cn(
                                            'rounded-md shadow-md transition-shadow',
                                            item.isNext &&
                                                'shadow-brand-accent-50',
                                        )}
                                    >
                                        <td className="flex items-center space-x-5 p-5 text-center font-bold">
                                            {callPrayer && (
                                                <Volume2Icon className="size-6" />
                                            )}
                                            <p>{item.title}</p>
                                        </td>
                                        <td className="text-center" dir="ltr">
                                            {item.callTime}
                                        </td>
                                        <td className="text-center" dir="ltr">
                                            {item.prayerTime}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

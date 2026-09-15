import Hero from '@/components/landing/hero';
import LiveProgram from '@/components/landing/live-program';
import MoreProgram from '@/components/landing/more-program';
import News from '@/components/landing/home-news';
import PillarsOfIslam from '@/components/landing/pillars-of-islam';
import PrayerTime from '@/components/landing/prayer-time';
import Scholars from '@/components/landing/scholars';
import IslamicBookBanner from '@/components/landing/islamic-book-banner';
import Events from '@/components/landing/events';
import Newsletter from '@/components/landing/newsletter';
import {
    ArticleNewsTypeProp,
    EventTypeProp,
    ProgramTypeProp,
    ScholarTypeProp,
    TimezoneType,
} from '@/types/global';

type Prop = {
    timezones: TimezoneType[];
    articles: ArticleNewsTypeProp[];
    scholars: ScholarTypeProp[];
    events: EventTypeProp[];
    programs: ProgramTypeProp[];
    features: ProgramTypeProp[];
};

export default function Welcome({
    timezones,
    articles,
    scholars,
    events,
    programs,
    features,
}: Prop) {
    return (
        <>
            <main>
                <section className="flex min-h-screen flex-col bg-background bg-linear-to-t from-[#F3ECD2] via-white to-white">
                    <Hero />
                    <div className="my-10 flex-1">
                        <LiveProgram programs={programs} />
                        {features && <MoreProgram features={features} />}
                    </div>
                </section>

                <section className="mx-5 my-0 max-w-7xl overflow-x-hidden md:mx-auto md:my-10">
                    <PrayerTime timezones={timezones} />
                </section>

                <PillarsOfIslam />

                <News articles={articles} />

                <section className="bg-linear-to-t from-[#F3ECD2] via-white to-white">
                    {scholars && scholars.length > 0 && (
                        <Scholars scholars={scholars} />
                    )}
                    <IslamicBookBanner />
                </section>

                <section className="mx-auto max-w-7xl overflow-x-hidden">
                    {events && <Events events={events} />}
                </section>

                <Newsletter />
            </main>
        </>
    );
}

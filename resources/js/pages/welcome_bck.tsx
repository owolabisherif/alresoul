import { Head, Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { login, register, home } from '@/routes';

const prayerTimes = [
    { name: 'Fajr', time: '4:32 AM', icon: '🌙' },
    { name: 'Sunrise', time: '5:58 AM', icon: '☀️' },
    { name: 'Dhuhr', time: '12:15 PM', icon: '☀️' },
    { name: 'Asr', time: '3:45 PM', icon: '🌤️' },
    { name: 'Maghrib', time: '6:32 PM', icon: '🌅' },
    { name: 'Isha', time: '7:55 PM', icon: '🌙' },
];

const pillars = [
    {
        title: 'Shahada',
        subtitle: 'Faith',
        description: 'La ilaha illa Allah, Muhammadur Rasul Allah',
        icon: '⭐',
    },
    {
        title: 'Salah',
        subtitle: 'Prayer',
        description: 'Five daily prayers',
        icon: '🕌',
    },
    {
        title: 'Zakat',
        subtitle: 'Charity',
        description: 'Giving to those in need',
        icon: '🤝',
    },
    {
        title: 'Sawm',
        subtitle: 'Fasting',
        description: 'Fasting during Ramadan',
        icon: '🌙',
    },
    {
        title: 'Hajj',
        subtitle: 'Pilgrimage',
        description: 'Pilgrimage to Makkah',
        icon: '🕋',
    },
];

const events = [
    {
        title: 'Eid al-Adha',
        date: 'May 2026',
        description: 'Festival of Sacrifice',
    },
    {
        title: 'Islamic New Year',
        date: 'Jun 2026',
        description: '1448 AH begins',
    },
    {
        title: 'Mawlid al-Nabi',
        date: 'Aug 2026',
        description: 'Birth of Prophet Muhammad ﷺ',
    },
    { title: 'Ramadan', date: 'Feb 2027', description: 'Month of Blessings' },
];

const blogPosts = [
    {
        title: 'The Beauty of Patience in Islam',
        excerpt:
            'Discover how sabr shapes the Muslim character and brings peace to the soul.',
        date: 'Mar 15, 2026',
        category: 'Spirituality',
    },
    {
        title: 'Understanding the 99 Names of Allah',
        excerpt:
            'A journey through the divine attributes that deepen our connection with the Creator.',
        date: 'Mar 10, 2026',
        category: 'Faith',
    },
    {
        title: 'The Pillars of a Strong Muslim Family',
        excerpt:
            'Timeless Islamic principles for building loving and resilient families.',
        date: 'Mar 5, 2026',
        category: 'Lifestyle',
    },
];

const navLinks = [
    { label: 'Home', href: home() },
    { label: 'Prayer Times', href: '#prayer' },
    { label: 'Pillars of Islam', href: '#pillars' },
    { label: 'Events', href: '#events' },
    { label: 'Blog', href: '#blog' },
];

const footerLinks = [
    { label: 'Prayer Times', href: '#prayer' },
    { label: 'Pillars of Islam', href: '#pillars' },
    { label: 'Upcoming Events', href: '#events' },
    { label: 'Blog & Articles', href: '#blog' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
];

export default function Welcome() {
    return (
        <>
            <Head title="Alresoul - Your Guide to Islamic Life">
                <meta
                    name="description"
                    content="Alresoul is your comprehensive guide to Islamic faith — prayer times, pillars of Islam, Islamic events, and spiritual blogs. Deepen your connection with Allah."
                />
                <meta
                    name="keywords"
                    content="islam, prayer times, pillars of islam, salah, fasting, ramadan, hajj, zakat, islamic events, muslim, quran"
                />
                <meta
                    property="og:title"
                    content="Alresoul - Your Guide to Islamic Life"
                />
                <meta
                    property="og:description"
                    content="Prayer times, pillars of Islam, Islamic events, and spiritual growth resources."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="canonical" href="/" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'Alresoul',
                            description:
                                'Your comprehensive guide to Islamic faith — prayer times, pillars of Islam, Islamic events, and spiritual blogs.',
                            url: '/',
                            sameAs: [],
                        }),
                    }}
                />
            </Head>

            <div className="flex min-h-screen flex-col bg-background">
                <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        <Link href={home()} className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="h-5 w-5 text-white"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                    <path d="M11 7h2v5h-2zM11 13h2v2h-2z" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold tracking-tight">
                                Alresoul
                            </span>
                        </Link>

                        <nav className="hidden items-center gap-6 md:flex">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-3">
                            <>
                                <Link href={login()}>
                                    <Button variant="ghost" size="sm">
                                        Log in
                                    </Button>
                                </Link>
                                <Link href={register()}>
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        </div>
                    </div>
                </header>

                <main className="flex-1">
                    <section className="relative overflow-hidden pt-24">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
                            <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
                            <div className="absolute top-1/4 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-3xl" />
                        </div>

                        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-3xl text-center">
                                <Badge
                                    variant="secondary"
                                    className="mb-6 border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                >
                                    بسم الله الرحمن الرحيم
                                </Badge>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                    Your Guide to
                                    <span className="block text-emerald-600 dark:text-emerald-400">
                                        {' '}
                                        Islamic Faith & Life
                                    </span>
                                </h1>
                                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                    Discover prayer times, deepen your
                                    understanding of the pillars of Islam, stay
                                    connected with Islamic events, and nurture
                                    your faith through insightful blogs.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-4">
                                    <Button
                                        size="lg"
                                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                                    >
                                        Explore Prayer Times
                                    </Button>
                                    <Button size="lg" variant="outline">
                                        Learn Islam
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                                {[
                                    {
                                        label: 'Prayer Times',
                                        value: '5 Daily',
                                        color: 'text-emerald-600 dark:text-emerald-400',
                                    },
                                    {
                                        label: 'Pillars',
                                        value: '5',
                                        color: 'text-amber-600 dark:text-amber-400',
                                    },
                                    {
                                        label: 'Articles',
                                        value: '100+',
                                        color: 'text-blue-600 dark:text-blue-400',
                                    },
                                    {
                                        label: 'Events',
                                        value: 'Yearly',
                                        color: 'text-purple-600 dark:text-purple-400',
                                    },
                                    {
                                        label: 'Community',
                                        value: 'Growing',
                                        color: 'text-rose-600 dark:text-rose-400',
                                    },
                                    {
                                        label: 'Blessings',
                                        value: 'Endless',
                                        color: 'text-emerald-600 dark:text-emerald-400',
                                    },
                                ].map((stat) => (
                                    <Card
                                        key={stat.label}
                                        className="border-0 bg-muted/50 text-center shadow-none"
                                    >
                                        <CardContent className="p-4">
                                            <div
                                                className={`text-2xl font-bold ${stat.color}`}
                                            >
                                                {stat.value}
                                            </div>
                                            <div className="mt-1 text-xs text-muted-foreground">
                                                {stat.label}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="prayer"
                        className="scroll-mt-20 border-t border-border/40 bg-muted/30"
                    >
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <Badge variant="outline" className="mb-4">
                                    Prayer Times
                                </Badge>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Today's Prayer Times
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Stay connected with your Creator through the
                                    five daily prayers.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                                {prayerTimes.map((prayer) => {
                                    const isNext = prayer.name === 'Asr';

                                    return (
                                        <Card
                                            key={prayer.name}
                                            className={`relative overflow-hidden transition-all duration-300 hover:shadow-md ${isNext ? 'border-emerald-500 ring-1 ring-emerald-500' : ''}`}
                                        >
                                            {isNext && (
                                                <div className="absolute top-2 right-2">
                                                    <Badge className="bg-emerald-600 text-xs text-white">
                                                        Next
                                                    </Badge>
                                                </div>
                                            )}
                                            <CardContent className="flex flex-col items-center p-6 text-center">
                                                <span className="text-2xl">
                                                    {prayer.icon}
                                                </span>
                                                <h3 className="mt-3 font-semibold">
                                                    {prayer.name}
                                                </h3>
                                                <p
                                                    className={`mt-1 text-lg font-bold ${isNext ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}
                                                >
                                                    {prayer.time}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section id="pillars" className="scroll-mt-20">
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <Badge variant="outline" className="mb-4">
                                    Foundations
                                </Badge>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    The Five Pillars of Islam
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    The foundation upon which a Muslim's faith
                                    and practice are built.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                                {pillars.map((pillar) => (
                                    <Card
                                        key={pillar.title}
                                        className="group border-0 bg-gradient-to-b from-muted/80 to-background shadow-none transition-all duration-300 hover:shadow-md"
                                    >
                                        <CardContent className="flex flex-col items-center p-8 text-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-2xl transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-950">
                                                {pillar.icon}
                                            </div>
                                            <h3 className="mt-5 font-bold">
                                                {pillar.title}
                                            </h3>
                                            <p className="text-xs font-medium tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                                                {pillar.subtitle}
                                            </p>
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                {pillar.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section
                        id="events"
                        className="scroll-mt-20 border-t border-border/40 bg-muted/30"
                    >
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <Badge variant="outline" className="mb-4">
                                    Calendar
                                </Badge>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Upcoming Islamic Events
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Mark your calendar for these significant
                                    occasions in the Islamic calendar.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {events.map((event) => (
                                    <Card
                                        key={event.title}
                                        className="group cursor-pointer border-0 bg-background shadow-sm transition-all duration-300 hover:shadow-md"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                                                    {event.date.slice(0, 3)}
                                                </div>
                                                <div>
                                                    <h3 className="leading-tight font-semibold">
                                                        {event.title}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground">
                                                        {event.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-muted-foreground">
                                                {event.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="blog" className="scroll-mt-20">
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <Badge variant="outline" className="mb-4">
                                    Latest Articles
                                </Badge>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    From the Blog
                                </h2>
                                <p className="mt-4 text-muted-foreground">
                                    Insights and inspiration to deepen your
                                    faith and understanding.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {blogPosts.map((post) => (
                                    <Card
                                        key={post.title}
                                        className="group overflow-hidden border-0 bg-muted/50 shadow-none transition-all duration-300 hover:shadow-md"
                                    >
                                        <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-950 dark:to-amber-950" />
                                        <CardHeader>
                                            <Badge
                                                variant="secondary"
                                                className="mb-2 w-fit"
                                            >
                                                {post.category}
                                            </Badge>
                                            <CardTitle className="text-lg leading-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                                {post.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {post.excerpt}
                                            </CardDescription>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-xs text-muted-foreground">
                                                    {post.date}
                                                </span>
                                                <span className="text-xs font-medium text-emerald-600 opacity-0 transition-all group-hover:opacity-100 dark:text-emerald-400">
                                                    Read more →
                                                </span>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <Button variant="outline">
                                    View All Articles
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-border/40 bg-gradient-to-br from-emerald-600 to-emerald-800">
                        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center text-white">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Stay Connected
                                </h2>
                                <p className="mt-4 text-emerald-100">
                                    Subscribe to receive daily prayer times,
                                    Islamic reminders, and updates on upcoming
                                    events.
                                </p>
                                <form className="mx-auto mt-8 flex max-w-md gap-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-emerald-200 focus:ring-2 focus:ring-white/30 focus:outline-none"
                                    />
                                    <Button className="shrink-0 bg-amber-500 text-white hover:bg-amber-600">
                                        Subscribe
                                    </Button>
                                </form>
                                <p className="mt-4 text-xs text-emerald-200">
                                    No spam. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-border/40 bg-muted/30">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <Link
                                    href={home()}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="h-5 w-5 text-white"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                                            <path d="M11 7h2v5h-2zM11 13h2v2h-2z" />
                                        </svg>
                                    </div>
                                    <span className="text-lg font-semibold tracking-tight">
                                        Alresoul
                                    </span>
                                </Link>
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Your comprehensive guide to Islamic faith,
                                    prayer, and community.
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-4 text-sm font-semibold">
                                    Quick Links
                                </h3>
                                <ul className="space-y-3">
                                    {footerLinks.slice(0, 3).map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 text-sm font-semibold">
                                    Resources
                                </h3>
                                <ul className="space-y-3">
                                    {footerLinks.slice(3, 6).map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 text-sm font-semibold">
                                    Connect
                                </h3>
                                <div className="flex gap-3">
                                    {[
                                        'Twitter',
                                        'Facebook',
                                        'Instagram',
                                        'YouTube',
                                    ].map((social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
                                        >
                                            <span className="text-xs font-bold">
                                                {social[0]}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
                            <p>
                                &copy; {new Date().getFullYear()} Alresoul. All
                                rights reserved.
                            </p>
                            <p className="mt-1 text-xs">
                                وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً
                                لِّلْعَالَمِينَ
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

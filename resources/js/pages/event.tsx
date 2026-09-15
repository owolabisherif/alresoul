import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { about, aboutus, dashboard, program } from '@/routes';
import { EventTypeProp } from '@/types/global';
import { create, show } from '@/routes/program';
import Loader from '@/components/loader';

type Prop = {
    events: {
        data: EventTypeProp[];
    };
};

export default function Event({ events }: Prop) {
    return (
        <>
            <Head title="Program / Events" />
            <Deferred
                data="events"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {events && events.data.length > 0 ? (
                    <div className="w-full p-10">
                        <table className="table w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 py-1 text-left">
                                        S/N
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Image
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Title
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Sub Title
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Type
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Mode
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Start & End date
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Start & End time
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Created
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Status
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {i + 1}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            <div className="h-10 w-10 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title!}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.title}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.sub_title}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.type}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.mode}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {`${item.date_start} / ${item.date_end}`}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {`${item.time_start} / ${item.time_end}`}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.created_at}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {Boolean(item.status)
                                                ? 'Active'
                                                : 'Inactive'}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            <div className="flex gap-x-2">
                                                <Link
                                                    href={create({
                                                        slug: item.slug,
                                                    })}
                                                >
                                                    Edit
                                                </Link>
                                                <a
                                                    target="_blank"
                                                    href={
                                                        show({
                                                            slug: item.slug,
                                                        }).url
                                                    }
                                                >
                                                    Show
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>No events/news posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Event.layout = {
    breadcrumbs: [
        {
            title: 'Program / Event',
            href: program(),
        },
    ],
};

import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { sermons, scholars } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import {
    ArticleNewsTypeProp,
    SermonType,
    SermonTypeProp,
    ScholarTypeProp,
} from '@/types/global';
import { create } from '@/routes/sermons';
import Loader from '@/components/loader';

type Prop = {
    sermons: {
        data: SermonTypeProp[];
    };
};

export default function Sermons({ sermons }: Prop) {
    return (
        <>
            <Head title="Sermon" />
            <Deferred
                data="sermons"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {sermons && sermons.data.length > 0 ? (
                    <div className="w-full p-10">
                        <table className="table w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 py-1 text-left">
                                        S/N
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Name
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Type
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Date
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
                                {sermons.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {i + 1}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.title}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.type}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.date}
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
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>No sermon posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Sermons.layout = {
    breadcrumbs: [
        {
            title: 'Sermons',
            href: sermons(),
        },
    ],
};

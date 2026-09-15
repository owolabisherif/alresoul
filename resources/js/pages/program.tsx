import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { guide } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import { ArticleNewsTypeProp, ProgramTypeProp } from '@/types/global';
import { create, show } from '@/routes/guide';
import Loader from '@/components/loader';

type Prop = {
    programs: {
        data: ProgramTypeProp[];
    };
};

export default function Program({ programs }: Prop) {
    return (
        <>
            <Head title="Program Guide" />
            <Deferred
                data="programs"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {programs && programs.data.length > 0 ? (
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
                                        Start / End date
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Start / End time
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Created
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Fatured ?
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
                                {programs.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {i + 1}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            <div className="h-10 w-10 overflow-hidden">
                                                <img
                                                    src={
                                                        item.image ??
                                                        '/assets/images/placeholder.avif'
                                                    }
                                                    alt={item.title!}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.title}
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
                                            {Boolean(item.is_featured)
                                                ? 'Yes'
                                                : 'No'}
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
                                                    href={
                                                        show({
                                                            slug: item.slug,
                                                        }).url
                                                    }
                                                    target="_blank"
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
                        <p>No program posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Program.layout = {
    breadcrumbs: [
        {
            title: 'Programs',
            href: guide(),
        },
    ],
};

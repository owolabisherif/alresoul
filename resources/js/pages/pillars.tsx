import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { author, scholars } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import {
    ArticleNewsTypeProp,
    AuthorType,
    AuthorTypeProp,
    Pillar,
    ScholarTypeProp,
} from '@/types/global';
import { create, index, show } from '@/routes/pillars';
import Loader from '@/components/loader';

type Prop = {
    pillars: {
        data: Pillar[];
    };
};

export default function Pillars({ pillars }: Prop) {
    return (
        <>
            <Head title="Pillars" />
            <Deferred
                data="pillars"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {pillars && pillars.data.length > 0 ? (
                    <div className="w-full p-10">
                        <table className="table w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="border border-gray-200 py-1 text-left">
                                        S/N
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Slug
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Name
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pillars.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {i + 1}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.slug}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.title}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            <div className="flex gap-x-2">
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
                        <p>No pillars posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Pillars.layout = {
    breadcrumbs: [
        {
            title: 'Pillars',
            href: index(),
        },
    ],
};

import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { index } from '@/routes/medias';
import { useEffect, useRef, useState } from 'react';
import {
    ArticleNewsTypeProp,
    SermonType,
    SermonTypeProp,
    ScholarTypeProp,
    Media as MediaType,
} from '@/types/global';
import { create } from '@/routes/medias';
import Loader from '@/components/loader';

type Prop = {
    medias: {
        data: MediaType[];
    };
};

export default function Media({ medias }: Prop) {
    return (
        <>
            <Head title="Medias" />
            <Deferred
                data="medias"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {medias && medias.data.length > 0 ? (
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
                                        Is Parent/Playlist
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Episode
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Season
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
                                {medias.data.map((item, i) => (
                                    <tr key={item.id}>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {i + 1}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.title}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.parent_id == null
                                                ? 'Yes'
                                                : 'No'}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.episode}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.season}
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
                        <p>No medias posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Media.layout = {
    breadcrumbs: [
        {
            title: 'Media',
            href: index(),
        },
    ],
};

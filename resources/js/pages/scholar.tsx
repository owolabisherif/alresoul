import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { scholars } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import { ArticleNewsTypeProp, ScholarTypeProp } from '@/types/global';
import { create, show } from '@/routes/scholar';
import Loader from '@/components/loader';

type Prop = {
    scholars: {
        data: ScholarTypeProp[];
    };
};

export default function Article({ scholars }: Prop) {
    return (
        <>
            <Head title="Scholars & Sheikh" />
            <Deferred
                data="scholars"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {scholars && scholars.data.length > 0 ? (
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
                                        Name
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Type
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Status
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Created
                                    </th>
                                    <th className="border border-gray-200 py-1 text-left">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {scholars.data.map((item, i) => (
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
                                                    alt={item.name!}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.name}
                                        </td>
                                        <td className="boder-gray-200 border px-1 py-1">
                                            {item.type}
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
                                                <Link
                                                    href={show({
                                                        slug: item.slug,
                                                        type: item.type,
                                                    })}
                                                >
                                                    Show
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
                        <p>No scholar or sheikh posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Article.layout = {
    breadcrumbs: [
        {
            title: 'Scholars & Sheikh',
            href: scholars(),
        },
    ],
};

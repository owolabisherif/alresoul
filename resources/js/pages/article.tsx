import { Deferred, Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { article } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import { ArticleNewsTypeProp } from '@/types/global';
import { create, show } from '@/routes/article';
import Loader from '@/components/loader';

type Prop = {
    articles: {
        data: ArticleNewsTypeProp[];
    };
};

export default function Article({ articles }: Prop) {
    return (
        <>
            <Head title="Article / News" />
            <Deferred
                data="articles"
                fallback={
                    <div className="flex h-full w-full items-center justify-center">
                        <Loader />
                    </div>
                }
            >
                {articles && articles.data.length > 0 ? (
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
                                        Listing Type
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
                                {articles.data.map((item, i) => (
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
                                            {item.listing_type}
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
                                                        type: item.listing_type,
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
                        <p>No articles/news posted yet</p>
                    </div>
                )}
            </Deferred>
        </>
    );
}

Article.layout = {
    breadcrumbs: [
        {
            title: 'Article / News',
            href: article(),
        },
    ],
};

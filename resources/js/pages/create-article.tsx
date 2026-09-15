import { useForm, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { article as articleroute } from '@/routes';
import { create, store } from '@/routes/article';
import { useEffect, useRef, useState } from 'react';
import Quill, { Delta as Delt } from 'quill/core';
import Editor from '@/packages/quill/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArticleNewsType, ArticleNewsTypeProp } from '@/types/global';

type Prop = {
    authors?: { id: number; name: string }[];
    article?: ArticleNewsTypeProp;
};

export default function CreateArticle({ authors, article }: Prop) {
    const quillRef = useRef<Quill>(null);
    const [range, setRange] = useState();
    const [lastChange, setLastChange] = useState<Delt>();
    const [readOnly, setReadOnly] = useState(false);
    const [body, setBody] = useState('');
    const {
        data,
        processing,
        errors,
        wasSuccessful,
        hasErrors,
        setData,
        post,
        transform,
        submit,
    } = useForm<ArticleNewsType>('post', store().url, {
        id: null,
        title: '',
        image: null,
        video: null,
        type: 'image',
        body: '',
        author_id: null,
        listing_type: 'news',
        meta_title: '',
        meta_desc: '',
        tags: '',
        status: true,
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: article ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (article) {
                        window.location.href = articleroute().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (article && Object.entries(article).length) {
            setData('title', article.title);
            setData('id', article.id);
            setData('author_id', article.author_id);
            setData('body', article.body);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: article.body,
                });

                quillRef.current.editor.insertContents(0, delta);
            }

            setData('listing_type', article.listing_type);
            setData('meta_title', article.meta_title);
            setData('meta_desc', article.meta_desc);
            setData('tags', article.tags);
            setData('status', Boolean(article.status));
        }
    }, [article]);

    return (
        <>
            <Head title="Create Article" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Article/News created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6">
                                <Label htmlFor="listing_type">
                                    Listing Type
                                </Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'listing_type',
                                            val as 'news' | 'article',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.listing_type ??
                                                'Select listing type'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['news', 'article'].map(
                                            (item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item}
                                                    className="capitalize"
                                                >
                                                    {item}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.listing_type} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="title">Type</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'type',
                                            val as 'image' | 'video',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.type ?? 'Select type'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['image', 'video'].map(
                                            (item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item}
                                                    className="capitalize"
                                                >
                                                    {item}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.type} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder={`Enter ${data.listing_type} title.`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="title">Body</Label>
                                <Editor
                                    ref={quillRef}
                                    readOnly={Boolean(readOnly)}
                                    textDirection="ltr"
                                    value={data.body}
                                    onSelectionChange={setRange}
                                    onTextChange={setLastChange}
                                    onChange={(tx: string) =>
                                        setData('body', tx)
                                    }
                                    discardChange={null}
                                />
                                <InputError message={errors.body} />
                            </div>

                            <div className="col-span-12">
                                <Label
                                    htmlFor="image"
                                    className="capitalize"
                                >{`${data.listing_type} Image`}</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    required
                                    tabIndex={2}
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) =>
                                        setData('image', e.target?.files![0])
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.image} />
                            </div>
                            {data.type == 'video' && (
                                <div className="col-span-12">
                                    <Label
                                        htmlFor="video"
                                        className="capitalize"
                                    >{`Upload video`}</Label>
                                    <Input
                                        id="video"
                                        type="file"
                                        required
                                        tabIndex={2}
                                        name="video"
                                        accept="video/*"
                                        onChange={(e) =>
                                            setData(
                                                'video',
                                                e.target?.files![0],
                                            )
                                        }

                                        placeholder=""
                                    />
                                    <InputError message={errors.video} />
                                </div>
                            )}

                            {authors && authors.length > 0 && (
                                <div className="col-span-6">
                                    <Label htmlFor="author">
                                        Author (optional)
                                    </Label>
                                    <Select
                                        onValueChange={(val) =>
                                            setData('author_id', val)
                                        }
                                    >
                                        <SelectTrigger className="w-full rounded-md">
                                            <span className="capitalize">
                                                {authors.find(
                                                    (a) =>
                                                        a.id ==
                                                        +data.author_id!,
                                                )?.name ?? 'Select author'}
                                            </span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {authors.map((item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item.id.toString()}
                                                    className="capitalize"
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.author_id} />
                                </div>
                            )}

                            <div className="col-span-6">
                                <Label htmlFor="title">Status</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'status',
                                            val == 'Active' ? true : false,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.status
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Active', 'Inactive'].map(
                                            (item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item}
                                                    className="capitalize"
                                                >
                                                    {item}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        <div className="mt-10 rounded-md p-3 shadow-md">
                            <div className="col-span-12 mb-4">
                                <Label
                                    htmlFor="meta_title"
                                    className="capitalize"
                                >
                                    Meta Title
                                </Label>
                                <Input
                                    id="meta_title"
                                    type="text"
                                    tabIndex={2}
                                    name="meta_title"
                                    value={data.meta_title ?? ''}
                                    onChange={(e) =>
                                        setData('meta_title', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="col-span-12">
                                <Label
                                    htmlFor="meta_title"
                                    className="capitalize"
                                >
                                    Meta Description
                                </Label>
                                <textarea
                                    id="meta_desc"
                                    tabIndex={2}
                                    rows={3}
                                    value={data.meta_desc ?? ''}
                                    name="meta_desc"
                                    className="w-full resize-none rounded-md border border-gray-300 p-2 outline-0"
                                    onChange={(e) =>
                                        setData('meta_desc', e.target.value)
                                    }

                                    placeholder="Enter description"
                                />
                                <InputError message={errors.meta_desc} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="tags" className="">
                                    Keywords (Enter comma seperated eg. a, b, c)
                                </Label>
                                <Input
                                    id="tags"
                                    type="text"
                                    tabIndex={2}
                                    name="tags"
                                    value={data.tags ?? ''}
                                    onChange={(e) =>
                                        setData('tags', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.tags} />
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button
                                type="button"
                                disabled={processing}
                                onClick={handleSubmit}
                            >
                                {processing
                                    ? article
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : article
                                      ? 'Update'
                                      : 'Create'}
                            </Button>
                        </div>
                    </>
                </form>
            </div>
        </>
    );
}

CreateArticle.layout = ({ authors, article }: Prop) => {
    if (article) {
        return {
            breadcrumbs: [
                {
                    title: 'Article / News',
                    href: articleroute(),
                },
                {
                    title: 'Create Article / News',
                    href: create(),
                },
                {
                    title: article.title,
                    href: '#',
                },
            ],
        };
    }

    return {
        breadcrumbs: [
            {
                title: 'Article / News',
                href: articleroute(),
            },
            {
                title: 'Create Article / News',
                href: create(),
            },
        ],
    };
};

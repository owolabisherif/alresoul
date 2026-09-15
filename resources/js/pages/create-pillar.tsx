import { useForm, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { index } from '@/routes/pillars';
import { create, store } from '@/routes/pillars';
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
import { Pillar } from '@/types/global';

type Prop = {
    pillar?: Pillar;
};

export default function CreatePillar({ pillar }: Prop) {
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
    } = useForm<Pillar>('post', store().url, {
        id: null,
        slug: '',
        title: '',
        body: '',
        meta_title: '',
        meta_desc: '',
        tags: '',
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: pillar ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (pillar) {
                        window.location.href = index().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (pillar && Object.entries(pillar).length) {
            setData('id', pillar.id);
            setData('title', pillar.title);
            setData('slug', pillar.slug);
            setData('body', pillar.body);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: pillar.body,
                });

                quillRef.current.editor.insertContents(0, delta);
            }

            setData('meta_title', pillar.meta_title);
            setData('meta_desc', pillar.meta_desc);
            setData('tags', pillar.tags);
        }
    }, [pillar]);

    return (
        <>
            <Head title="Create Pillar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Pillar created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12">
                                <Label htmlFor="slug">
                                    Slug (Must be english)
                                </Label>
                                <Input
                                    id="slug"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="slug"
                                    disabled={true}
                                    value={data.slug}
                                    onChange={(e) =>
                                        setData('slug', e.target.value)
                                    }
                                    placeholder={`Enter slug.`}
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="title"
                                    title="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder={`Enter title.`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="body">Body</Label>
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
                                    ? pillar
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : pillar
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

CreatePillar.layout = ({ pillar }: Prop) => {
    if (pillar) {
        return {
            breadcrumbs: [
                {
                    title: 'Pillars',
                    href: index(),
                },
                {
                    title: 'Create Pillar',
                    href: create(),
                },
                {
                    title: pillar.title,
                    href: '#',
                },
            ],
        };
    }

    return {
        breadcrumbs: [
            {
                title: 'Pillars',
                href: index(),
            },
            {
                title: 'Create Pillars',
                href: create(),
            },
        ],
    };
};

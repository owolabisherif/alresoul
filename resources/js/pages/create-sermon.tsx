import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { sermons as sermonRoute } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import { create, store } from '@/routes/sermons';
import Quill, { Delta as Delt } from 'quill/core';
import { AuthorType, SermonType } from '@/types/global';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';

type Prop = {
    sermon?: SermonType;
};

export default function CreateSermon({ sermon }: Prop) {
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
    } = useForm<SermonType>('post', store().url, {
        id: null,
        title: '',
        type: '',
        cover: null,
        partner: '',
        source: '',
        url: '',
        date: '',
        status: true,
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: sermon ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (sermon) {
                        window.location.href = sermonRoute().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (sermon && Object.entries(sermon).length) {
            setData('title', sermon.title);
            setData('id', sermon.id);
            setData('type', sermon.type);
            setData('partner', sermon.partner);
            setData('source', sermon.source);
            setData('url', sermon.url);
            setData('date', sermon.date);
            setData('status', Boolean(sermon.status));
        }
    }, [sermon]);

    return (
        <>
            <Head title="Create Author & Organizers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Sermon created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
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
                                <Label
                                    htmlFor="cover"
                                    className="capitalize"
                                >{`Cover`}</Label>
                                <Input
                                    id="cover"
                                    type="file"
                                    required
                                    tabIndex={2}
                                    accept="image/*"
                                    name="cover"
                                    onChange={(e) =>
                                        setData('cover', e.target?.files![0])
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.cover} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="type">Type</Label>
                                <Input
                                    id="type"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="type"
                                    value={data.type}
                                    onChange={(e) =>
                                        setData('type', e.target.value)
                                    }
                                    placeholder={`Enter type.`}
                                />
                                <InputError message={errors.type} />
                            </div>

                            <div className="col-span-6 mb-4">
                                <Label htmlFor="partner" className="capitalize">
                                    Partner
                                </Label>
                                <Input
                                    id="partner"
                                    type="text"
                                    tabIndex={2}
                                    name="partner"
                                    value={data.partner ?? ''}
                                    onChange={(e) =>
                                        setData('partner', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.partner} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="url" className="">
                                    Sermon URL Link (only mp3 allowed)
                                </Label>
                                <Input
                                    id="url"
                                    type="text"
                                    tabIndex={2}
                                    name="url"
                                    value={data.url ?? ''}
                                    onChange={(e) =>
                                        setData('url', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.url} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="source" className="">
                                    Source
                                </Label>
                                <Input
                                    id="source"
                                    type="text"
                                    tabIndex={2}
                                    name="source"
                                    value={data.source ?? ''}
                                    onChange={(e) =>
                                        setData('source', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.source} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    required
                                    tabIndex={2}
                                    autoComplete="date"
                                    name="date"
                                    value={data.date}
                                    onChange={(e) =>
                                        setData('date', e.target.value)
                                    }
                                    placeholder={`Enter  date.`}
                                />
                                <InputError message={errors.date} />
                            </div>

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

                        <div className="mt-10">
                            <Button
                                type="button"
                                disabled={processing}
                                onClick={handleSubmit}
                            >
                                {processing
                                    ? sermon
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : sermon
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

CreateSermon.layout = {
    breadcrumbs: [
        {
            title: 'All Sermons',
            href: sermonRoute(),
        },
        {
            title: 'Create Sermon',
            href: create(),
        },
    ],
};

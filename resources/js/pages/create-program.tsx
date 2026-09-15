import { useForm, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { guide } from '@/routes';
import { create, store } from '@/routes/guide';
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
import { ProgramType, ProgramTypeProp } from '@/types/global';

type Prop = {
    program?: ProgramTypeProp;
};

export default function CreateProgram({ program }: Prop) {
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
    } = useForm<ProgramType>('post', store().url, {
        id: null,
        title: '',
        image: null,
        video: null,
        date_start: '',
        date_end: '',
        time_start: '',
        time_end: '',
        about: '',
        meta_title: '',
        meta_desc: '',
        tags: '',
        is_featured: false,
        status: true,
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: program ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (program) {
                        window.location.href = guide().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (program && Object.entries(program).length) {
            setData('title', program.title);
            setData('id', program.id);
            setData('about', program.about);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: program.about,
                });

                quillRef.current.editor.insertContents(0, delta);
            }
            setData('video', program.video);
            setData('date_start', program.date_start);
            setData('date_end', program.date_end);
            setData('time_start', program.time_start);
            setData('time_end', program.time_end);
            setData('meta_title', program.meta_title);
            setData('meta_desc', program.meta_desc);
            setData('tags', program.tags);
            setData('status', Boolean(program.status));
            setData('is_featured', Boolean(program.is_featured));
        }
    }, [program]);

    return (
        <>
            <Head title="Create Program Guide" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Program Guide created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="title"
                                    name="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder={`Enter title.`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="title">About</Label>
                                <Editor
                                    ref={quillRef}
                                    readOnly={Boolean(readOnly)}
                                    textDirection="ltr"
                                    value={data.about}
                                    onSelectionChange={setRange}
                                    onTextChange={setLastChange}
                                    onChange={(tx: string) =>
                                        setData('about', tx)
                                    }
                                    discardChange={null}
                                />
                                <InputError message={errors.about} />
                            </div>

                            <div className="col-span-6">
                                <Label
                                    htmlFor="image"
                                    className="capitalize"
                                >{`Image`}</Label>
                                <Input
                                    id="image"
                                    type="file"
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

                            <div className="col-span-6">
                                <Label htmlFor="video">
                                    Video URL (optional)
                                </Label>
                                <Input
                                    id="name"
                                    type="url"
                                    required
                                    tabIndex={2}
                                    autoComplete="video"
                                    name="video"
                                    value={data.video ?? undefined}
                                    onChange={(e) =>
                                        setData('video', e.target.value)
                                    }
                                    placeholder={`Enter video URL.`}
                                />
                                <InputError message={errors.video} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    required
                                    tabIndex={2}
                                    autoComplete="start_date"
                                    name="start_date"
                                    value={data.date_start}
                                    onChange={(e) =>
                                        setData('date_start', e.target.value)
                                    }
                                    placeholder={`Enter  Start date.`}
                                />
                                <InputError message={errors.date_start} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    required
                                    tabIndex={2}
                                    autoComplete="end_date"
                                    name="end_date"
                                    value={data.date_end}
                                    onChange={(e) =>
                                        setData('date_end', e.target.value)
                                    }
                                    placeholder={`Enter  End date.`}
                                />
                                <InputError message={errors.date_end} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="start_time">Start Time</Label>
                                <Input
                                    id="start_time"
                                    type="time"
                                    required
                                    tabIndex={2}
                                    autoComplete="start_time"
                                    name="start_time"
                                    value={data.time_start}
                                    onChange={(e) =>
                                        setData('time_start', e.target.value)
                                    }
                                    placeholder={`Enter  Start time.`}
                                />
                                <InputError message={errors.time_start} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="end_time">End Time</Label>
                                <Input
                                    id="end_time"
                                    type="time"
                                    required
                                    tabIndex={2}
                                    autoComplete="end_time"
                                    name="end_time"
                                    value={data.time_end}
                                    onChange={(e) =>
                                        setData('time_end', e.target.value)
                                    }
                                    placeholder={`Enter  End time.`}
                                />
                                <InputError message={errors.time_end} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="title">Is Featured</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'is_featured',
                                            val == 'Yes' ? true : false,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.is_featured ? 'Yes' : 'No'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Yes', 'No'].map((item, index) => (
                                            <SelectItem
                                                key={index}
                                                value={item}
                                                className="capitalize"
                                            >
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.is_featured} />
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
                                    ? program
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : program
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

CreateProgram.layout = ({ program }: Prop) => {
    if (program) {
        return {
            breadcrumbs: [
                {
                    title: 'Programs',
                    href: guide(),
                },
                {
                    title: 'Create Program',
                    href: create(),
                },
                {
                    title: program.title,
                    href: '#',
                },
            ],
        };
    }

    return {
        breadcrumbs: [
            {
                title: 'Program',
                href: guide(),
            },
            {
                title: 'Create Programs',
                href: create(),
            },
        ],
    };
};

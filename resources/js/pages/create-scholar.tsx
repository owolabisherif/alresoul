import { useForm, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { scholars } from '@/routes';
import { create, store } from '@/routes/scholar';
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
import {
    ArticleNewsType,
    ArticleNewsTypeProp,
    ScholarType,
    ScholarTypeProp,
} from '@/types/global';

type Prop = {
    scholar?: ScholarTypeProp;
};

export default function CreateScholar({ scholar }: Prop) {
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
    } = useForm<ScholarType>('post', store().url, {
        id: null,
        name: '',
        image: null,
        type: 'sheikh',
        about: '',
        meta_title: '',
        meta_desc: '',
        tags: '',
        status: true,
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: scholar ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (scholar) {
                        window.location.href = scholars().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (scholar && Object.entries(scholar).length) {
            setData('name', scholar.name);
            setData('id', scholar.id);
            setData('about', scholar.about);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: scholar.about,
                });

                quillRef.current.editor.insertContents(0, delta);
            }

            setData('meta_title', scholar.meta_title);
            setData('meta_desc', scholar.meta_desc);
            setData('tags', scholar.tags);
            setData('status', Boolean(scholar.status));
        }
    }, [scholar]);

    return (
        <>
            <Head title="Create Scholar & Sheikh" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Scholar & Sheikh created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-12">
                                <Label htmlFor="title">Type</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'type',
                                            val as 'sheikh' | 'scholar',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.type ?? 'Select type'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['sheikh', 'scholar'].map(
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
                                <Label htmlFor="title">Fullname</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder={`Enter name.`}
                                />
                                <InputError message={errors.name} />
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
                                    ? scholar
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : scholar
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

CreateScholar.layout = ({ scholar }: Prop) => {
    if (scholar) {
        return {
            breadcrumbs: [
                {
                    title: 'Sheikh & Scholars',
                    href: scholars(),
                },
                {
                    title: 'Create Sheikh & Scholars',
                    href: create(),
                },
                {
                    title: scholar.name,
                    href: '#',
                },
            ],
        };
    }

    return {
        breadcrumbs: [
            {
                title: 'Sheikh & Scholars',
                href: scholars(),
            },
            {
                title: 'Create Sheikh & Scholars',
                href: create(),
            },
        ],
    };
};

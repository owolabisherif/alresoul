import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { article, author as authorRoute } from '@/routes';
import { useEffect, useRef, useState } from 'react';
import { create, store } from '@/routes/author';
import Quill, { Delta as Delt } from 'quill/core';
import { AuthorType } from '@/types/global';
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
    author?: AuthorType;
};

export default function CreateAuthor({ author }: Prop) {
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
    } = useForm<AuthorType>('post', store().url, {
        id: null,
        name: '',
        type: 'author',
        phone: '',
        email: '',
        website: '',
        status: true,
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: author ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (author) {
                        window.location.href = authorRoute().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (author && Object.entries(author).length) {
            setData('name', author.name);
            setData('id', author.id);
            setData('type', author.type);
            setData('email', author.email);
            setData('phone', author.phone);
            setData('website', author.website);
            setData('status', Boolean(author.status));
        }
    }, [author]);

    return (
        <>
            <Head title="Create Author & Organizers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Author/Organizer created successfully!</div>
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
                                            val as 'author' | 'organizer',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.type ?? 'Select type'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['author', 'organizer'].map(
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

                            <div className="col-span-6 mb-4">
                                <Label htmlFor="email" className="capitalize">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="text"
                                    tabIndex={2}
                                    name="email"
                                    value={data.email ?? ''}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="phone" className="">
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    tabIndex={2}
                                    name="phone"
                                    value={data.phone ?? ''}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="website" className="">
                                    Website
                                </Label>
                                <Input
                                    id="website"
                                    type="text"
                                    tabIndex={2}
                                    name="website"
                                    value={data.website ?? ''}
                                    onChange={(e) =>
                                        setData('website', e.target.value)
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.website} />
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
                                    ? author
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : author
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

CreateAuthor.layout = {
    breadcrumbs: [
        {
            title: 'Authors',
            href: authorRoute(),
        },
        {
            title: 'Create Author',
            href: create(),
        },
    ],
};

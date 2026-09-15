import { Head, useForm } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { about, aboutus, dashboard, program } from '@/routes';
import { create, store } from '@/routes/program';
import { useCallback, useEffect, useRef, useState } from 'react';
import Quill, { Delta as Delt } from 'quill/core';
import { EventType, EventTypeProp } from '@/types/global';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Editor from '@/packages/quill/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';

type Prop = {
    organizers?: { id: number; name: string }[];
    event?: EventTypeProp;
};

export default function CreateEvent({ organizers, event }: Prop) {
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
    } = useForm<EventType>('post', store().url, {
        id: null,
        organizer_id: null,
        title: '',
        sub_title: '',
        image: null,
        body: '',
        currency: 'QAR',
        mode: 'offline',
        days: '',
        date_start: '',
        date_end: '',
        time_start: '',
        time_end: '',
        location: '',
        locale: '',
        type: 'free',
        cost: 0,
        sessions: 0,
        status: true,
        meta_title: '',
        meta_desc: '',
        tags: '',
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: event ? 'PUT' : 'POST',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (event) {
                        window.location.href = program().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (event && Object.entries(event).length) {
            setData('id', event.id);
            setData('title', event.title);
            setData('sub_title', event.sub_title);
            setData('mode', event.mode);
            setData('days', event.days);
            setData('date_start', event.date_start);
            setData('date_end', event.date_end);
            setData('time_start', event.time_start);
            setData('time_end', event.time_end);
            setData('location', event.location);
            setData('locale', event.locale);
            setData('type', event.type);
            setData('cost', event.cost);
            setData('sessions', event.sessions);
            setData('organizer_id', event.organizer_id);
            setData('body', event.body);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: event.body,
                });

                quillRef.current.editor.insertContents(0, delta);
            }

            setData('meta_title', event.meta_title);
            setData('meta_desc', event.meta_desc);
            setData('tags', event.tags);
            setData('status', Boolean(event.status));
        }
    }, [event]);

    return (
        <>
            <Head title="Create Program/Event" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Program created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-6">
                                <Label htmlFor="mode">Mode</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData(
                                            'mode',
                                            val as 'online' | 'offline',
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.mode ?? 'Select Model'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['online', 'offline'].map(
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
                                <InputError message={errors.mode} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    onValueChange={(val) =>
                                        setData('type', val as 'paid' | 'free')
                                    }
                                >
                                    <SelectTrigger className="w-full rounded-md">
                                        <span className="capitalize">
                                            {data.type ?? 'Select type'}
                                        </span>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['paid', 'free'].map((item, index) => (
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
                                <InputError message={errors.type} />
                            </div>

                            {data.type == 'paid' && (
                                <>
                                    <div className="col-span-6">
                                        <Label htmlFor="amount">Amount</Label>
                                        <Input
                                            id="amount"
                                            type="number"
                                            min={0}
                                            required
                                            tabIndex={2}
                                            autoComplete="amount"
                                            name="amount"
                                            value={data.cost}
                                            onChange={(e) =>
                                                setData('cost', +e.target.value)
                                            }
                                            placeholder={`Enter  amount.`}
                                        />
                                        <InputError message={errors.cost} />
                                    </div>

                                    <div className="col-span-6">
                                        <Label htmlFor="currency">
                                            Currency (e.g QAR)
                                        </Label>
                                        <Input
                                            id="currency"
                                            type="text"
                                            min={0}
                                            tabIndex={2}
                                            autoComplete="currency"
                                            name="currency"
                                            value={data.currency}
                                            onChange={(e) =>
                                                setData(
                                                    'currency',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={`Enter  currency.`}
                                        />
                                        <InputError message={errors.currency} />
                                    </div>
                                </>
                            )}

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
                                    placeholder={`Enter  title.`}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="sub_title">Sub Title</Label>
                                <Input
                                    id="sub_title"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="sub_title"
                                    name="sub_title"
                                    value={data.sub_title}
                                    onChange={(e) =>
                                        setData('sub_title', e.target.value)
                                    }
                                    placeholder={`Enter  sub title.`}
                                />
                                <InputError message={errors.sub_title} />
                            </div>

                            <div className="col-span-12">
                                <Label
                                    htmlFor="image"
                                    className="capitalize"
                                >{` Image`}</Label>
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

                            {organizers && organizers.length > 0 && (
                                <div className="col-span-6">
                                    <Label htmlFor="author">
                                        Organizer (optional)
                                    </Label>
                                    <Select
                                        onValueChange={(val) =>
                                            setData('organizer_id', val)
                                        }
                                    >
                                        <SelectTrigger className="w-full rounded-md">
                                            <span className="capitalize">
                                                {organizers.find(
                                                    (a) =>
                                                        a.id ==
                                                        +data.organizer_id!,
                                                )?.name ?? 'Select organizer'}
                                            </span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organizers.map((item, index) => (
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
                                    <InputError message={errors.organizer_id} />
                                </div>
                            )}

                            <div className="col-span-6">
                                <Label htmlFor="days">
                                    Days (e.g Monday and Thursday)
                                </Label>
                                <Input
                                    id="days"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="days"
                                    name="days"
                                    value={data.days}
                                    onChange={(e) =>
                                        setData('days', e.target.value)
                                    }
                                    placeholder={`Enter  Days.`}
                                />
                                <InputError message={errors.days} />
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
                                <Label htmlFor="location">Location/Venue</Label>
                                <Input
                                    id="location"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="location"
                                    name="location"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    placeholder={`Enter  Location.`}
                                />
                                <InputError message={errors.location} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="locale">
                                    Locale (e.g Arabic )
                                </Label>
                                <Input
                                    id="locale"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="locale"
                                    name="locale"
                                    value={data.locale}
                                    onChange={(e) =>
                                        setData('locale', e.target.value)
                                    }
                                    placeholder={`Enter  Locale.`}
                                />
                                <InputError message={errors.locale} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="sessions">
                                    Sessions per day
                                </Label>
                                <Input
                                    id="sessions"
                                    type="number"
                                    min={0}
                                    required
                                    tabIndex={2}
                                    autoComplete="sessions"
                                    name="sessions"
                                    value={data.sessions}
                                    onChange={(e) =>
                                        setData('sessions', +e.target.value)
                                    }
                                    placeholder={`Enter  Sessions.`}
                                />
                                <InputError message={errors.sessions} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="status">Status</Label>
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
                                    ? event
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : event
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

CreateEvent.layout = {
    breadcrumbs: [
        {
            title: 'Program / Event',
            href: program(),
        },
        {
            title: 'Create Program / Event',
            href: create(),
        },
    ],
};

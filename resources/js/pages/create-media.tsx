import { useForm, Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { index } from '@/routes/medias';
import { create, store } from '@/routes/medias';
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
import { Media, Playlist } from '@/types/global';

type Prop = {
    media?: Media;
    medias: Media[];
    playlists: Playlist[];
};

export default function CreateMedia({ media, medias, playlists }: Prop) {
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
    } = useForm<Media>('post', store().url, {
        id: null,
        parent_id: null,
        playlist_id: null,
        title: '',
        description: '',
        cover: '',
        video_url: '',
        episode: 0,
        season: 0,
        duration: 0,
        status: true,
        meta_title: '',
        meta_desc: '',
        tags: '',
    });

    const handleSubmit = () => {
        try {
            transform((data) => ({
                ...data,
                _method: media ? 'put' : 'post',
            }));

            submit({
                forceFormData: true,
                onSuccess: () => {
                    if (media) {
                        window.location.href = index().url;
                    }
                },
            });
        } catch (error) {
            console.log(errors);
        }
    };

    useEffect(() => {
        if (media && Object.entries(media).length) {
            setData('id', media.id);
            setData('title', media.title);
            setData('episode', media.episode);
            setData('season', media.season);
            setData('duration', media.duration);
            setData('description', media.description);
            setData('video_url', media.video_url);
            setData('status', media.status);

            if (quillRef.current) {
                let delta = quillRef.current.clipboard.convert({
                    html: media.description,
                });

                quillRef.current.editor.insertContents(0, delta);
            }

            setData('meta_title', media.meta_title);
            setData('meta_desc', media.meta_desc);
            setData('tags', media.tags);
        }
    }, [media]);

    return (
        <>
            <Head title="Create Media" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form>
                    <>
                        {wasSuccessful && (
                            <div>Media created successfully!</div>
                        )}

                        {hasErrors && (
                            <p>An error occured... Please contact admin.</p>
                        )}

                        <div className="grid grid-cols-12 gap-2">
                            {medias && (
                                <>
                                    <div className="col-span-12">
                                        <Label htmlFor="title">Playlist</Label>
                                        <Select
                                            value={
                                                data.parent_id
                                                    ? data.parent_id.toString()
                                                    : ''
                                            }
                                            onValueChange={(val) =>
                                                setData('parent_id', +val)
                                            }
                                        >
                                            <SelectTrigger className="w-full rounded-md">
                                                <span className="capitalize">
                                                    {data.parent_id
                                                        ? medias.find(
                                                              (item) =>
                                                                  item.id ==
                                                                  data.parent_id,
                                                          )?.title
                                                        : 'Add to playlist'}
                                                </span>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {medias.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item.id?.toString()!}
                                                        className="capitalize"
                                                    >
                                                        {item.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.parent_id}
                                        />
                                    </div>
                                    {data.parent_id && (
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData('parent_id', null)
                                                }
                                                className="font-bold text-red-500"
                                            >
                                                RESET
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {playlists && playlists.length > 0 && (
                                <div className="col-span-12">
                                    <Label htmlFor="playlist">Category</Label>
                                    <Select
                                        onValueChange={(val) =>
                                            setData('playlist_id', +val)
                                        }
                                    >
                                        <SelectTrigger className="w-full rounded-md">
                                            <span className="capitalize">
                                                {data.playlist_id
                                                    ? playlists.find(
                                                          (item) =>
                                                              item.id ==
                                                              data.playlist_id,
                                                      )?.title
                                                    : 'Select category'}
                                            </span>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {playlists.map((item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item.id?.toString()!}
                                                    className="capitalize"
                                                >
                                                    {item.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.playlist_id} />
                                </div>
                            )}

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
                                    htmlFor="image"
                                    className="capitalize"
                                >{`Cover Image`}</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    required
                                    tabIndex={2}
                                    accept="image/*"
                                    name="image"
                                    onChange={(e) =>
                                        setData('cover', e.target?.files![0])
                                    }

                                    placeholder=""
                                />
                                <InputError message={errors.cover} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="video">Video URL</Label>
                                <Input
                                    id="video_url"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="video_url"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData('video_url', e.target.value)
                                    }
                                    placeholder={`Enter video_url.`}
                                />
                                <InputError message={errors.video_url} />
                            </div>

                            <div className="col-span-12">
                                <Label htmlFor="description">Description</Label>
                                <Editor
                                    ref={quillRef}
                                    readOnly={Boolean(readOnly)}
                                    textDirection="ltr"
                                    value={data.description}
                                    onSelectionChange={setRange}
                                    onTextChange={setLastChange}
                                    onChange={(tx: string) =>
                                        setData('description', tx)
                                    }
                                    discardChange={null}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="season">Season</Label>
                                <Input
                                    id="season"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="season"
                                    value={data.season}
                                    onChange={(e) =>
                                        setData('season', +e.target.value)
                                    }
                                    placeholder={`Enter season.`}
                                />
                                <InputError message={errors.season} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="episode">Episode</Label>
                                <Input
                                    id="episode"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="episode"
                                    value={data.episode}
                                    onChange={(e) =>
                                        setData('episode', +e.target.value)
                                    }
                                    placeholder={`Enter episode.`}
                                />
                                <InputError message={errors.episode} />
                            </div>

                            <div className="col-span-6">
                                <Label htmlFor="episode">Duration (in minutes)</Label>
                                <Input
                                    id="duration"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="duration"
                                    disabled={true}
                                    value={data.duration}
                                    onChange={(e) =>
                                        setData('duration', +e.target.value)
                                    }
                                    placeholder={`Enter duration.`}
                                />
                                <InputError message={errors.duration} />
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
                                    ? media
                                        ? 'Updating....'
                                        : 'Creating...'
                                    : media
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

CreateMedia.layout = ({ media }: Prop) => {
    if (media) {
        return {
            breadcrumbs: [
                {
                    title: 'Medias',
                    href: index(),
                },
                {
                    title: 'Create Media',
                    href: create(),
                },
                {
                    title: media.title,
                    href: '#',
                },
            ],
        };
    }

    return {
        breadcrumbs: [
            {
                title: 'Medias',
                href: index(),
            },
            {
                title: 'Create Medias',
                href: create(),
            },
        ],
    };
};

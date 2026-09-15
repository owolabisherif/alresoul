import useVideoPlayerStore from "@/stores/video-player-store";
import { usePage } from "@inertiajs/react";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import VideoPlayer from "./video-player";
import { VideoSourceType } from "./video-js";
import ImaVideoPlayer from "./ima-video-player";



type VideoPlayerProp = {
    sources: VideoSourceType[]
}

type VideoPlayerContextProp = {
    source: VideoSourceType | null
    timeElapsed: number,
    playingStarted: boolean,
    setPlayingStarted: Dispatch<SetStateAction<boolean>>
    setTimeElapsed: Dispatch<SetStateAction<number>>
    setSource: Dispatch<SetStateAction<VideoSourceType | null>>
} | null

const PlayerContext = createContext<VideoPlayerContextProp>(null)


export function VideoPlayerContext({children}: PropsWithChildren) {
    const [source, setSource] = useState<VideoSourceType | null>(null)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [playingStarted, setPlayingStarted] = useState(false)

    // useEffect(() => {
    //     console.log(timeElapsed)
    // }, [timeElapsed])

    return <PlayerContext.Provider value={{source, timeElapsed, playingStarted, setPlayingStarted, setSource, setTimeElapsed}}>
        {children}
    </PlayerContext.Provider>
}

export function useVideoPlayerContext() {
    const ctx = useContext(PlayerContext)

    if(!ctx) return

    return {
        playingStarted: ctx.playingStarted, 
        setPlayingStarted: ctx.setPlayingStarted,
        sources: ctx.source,
        timeElapsed: ctx.timeElapsed,
        setSources: ctx.setSource,
        setTimeElapsed: ctx.setTimeElapsed
    }
}

export default function MediaPlayer({sources}: VideoPlayerProp) {
    const ctx = useVideoPlayerContext()
    const [videoSource, setVideoSource] = useState<VideoSourceType[]>([])

//    if(!ctx) return <div className="">
//         <h3>Loading player.</h3>
//    </div>

    useEffect(() => {
        console.log(ctx?.playingStarted)
    }, [ctx?.playingStarted])

    const handleSetVideoSource = () => {
        var sourceList: VideoSourceType[] = [];

        for (const item of sources) {
            let ars = item.src.split('.');
            var type = ars.pop();
            sourceList.push({ src: item.src, type: `video/${type}` });
        }

        setVideoSource(sourceList);
    };

    return <VideoPlayerContext>
        <ImaVideoPlayer/>
    </VideoPlayerContext>
}
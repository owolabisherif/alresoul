
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads/dist/videojs.ads.css'
import 'videojs-ima/dist/videojs.ima.css'
import 'videojs-logo/dist/videojs-logo.css';

import React, { PropsWithChildren, useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'videojs-contrib-ads'
import 'videojs-ima';

import Player from 'video.js/dist/types/player'
import 'videojs-logo';
import { usePage } from '@inertiajs/react';
import useVideoPlayerStore from '@/stores/video-player-store';
import { useElementVisibility } from '@reactuses/core';



 
export interface videoJsOptions {
    autoplay: boolean,
    controls: boolean,
    responsive: boolean,
    fluid: boolean,
    sources: VideoSourceType[]
    muted: boolean,
    height: string | number
    poster?: string,
    preferFullWindow?: boolean
  };


export type VideoSourceType = {
    src: string; 
    type?: string;
}

export interface VideoPlayerPropsInferface {
  sources: VideoSourceType[];
  onReady: Function,
  updatePlaylist: Function,
}

export interface sourceType {
  sources: VideoSourceType[],
  updatePlaylist: Function
}

const VideoJs = (props: PropsWithChildren<VideoPlayerPropsInferface>) => {
  const videoRef =useRef(null);
  const playerRef = useRef<Player>(null);
  const playerWrapperRef = useRef(null);
  const tempVol =useRef<undefined | number>(0);
  const {onReady, updatePlaylist} = props;
  const page = usePage()
  const {index,playlistLength, inc, reset, setWaiting, setPlayer}= useVideoPlayerStore((state) => state)
  const [visible, stop] = useElementVisibility(playerWrapperRef);

  const videoJsOptions: videoJsOptions = {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: props.sources,
      muted: true,
      height: "100%",
      poster: "",
      preferFullWindow: true
  };

  const options = videoJsOptions

  const initPlayer = () => {
   
     if (!playerRef.current) {
  
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      (videoRef.current as any ).appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        
        onReady && onReady(player);
        setPlayer(player)

        

        player.autoplay(options.autoplay)
        
        player.ima({adTagUrl: page.props.adsUrl, autoPlayAdBreaks: true})

        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds()

        player.on('ads-ad-started', function() {
            console.log("Adds")
          setWaiting(true)
        });

        
        player.on('ads-manager', function(res: any) {
          var adsManager = res.adsManager;

          adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, function(){
              setWaiting(false),
              player.volume(tempVol.current);
          });

          adsManager.addEventListener(google.ima.AdEvent.Type.ENDED, function(){
              setWaiting(false),
              player.volume(tempVol.current);
          });

          adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, () => {
            tempVol.current = player.volume();
            player.volume(0);
          });

          adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
              player.volume(tempVol.current);
          });
        });


        player.on('ads-request', function(res: any) {
          player.pause()
        });

        player.on("ended", () => {
          player.ima.changeAdTag(page.props.adsUrl);
          player.ima.requestAds();
          inc()
        })

        // player.on('contentended', function() {
        //     player.ima.initializeAdDisplayContainer()
        //     player.ima.setContentWithAdTag(null, page.props.adsUrl, true)
        //     player.ima.changeAdTag(page.props.adsUrl);
        //     player.ima.requestAds()
        // });
      });
      
      setAdditionalOptions(player)
      

    } else {
      const player = playerRef.current;
      setAdditionalOptions(player)

      player.autoplay(options.autoplay);
      
      player.src(options.sources[index]);
    }

    stop()
  }

 useEffect(() => {
  if(index >= playlistLength) reset()
  if(visible) initPlayer()
  
}, [options, videoRef, index]);


const setAdditionalOptions = (player: any) => {
  player.logo({
    image: '/assets/images/quran_cover.png',
    width: 100,
    fadeTime: null
  }).show();
}


 useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className='h-full' ref={playerWrapperRef}>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJs;
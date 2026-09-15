import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import "videojs-ima/dist/videojs.ima.css";

import "videojs-contrib-ads";
import "videojs-ima";
import { usePage } from "@inertiajs/react";

const IMA_SDK_URL =
  "https://imasdk.googleapis.com/js/sdkloader/ima3.js";

const CONTENT_URL =
  "//vjs.zencdn.net/v/oceans.mp4";

const AD_TAG_URL =
  "https://pubads.g.doubleclick.net/gampad/ads?" +
  "iu=/21775744923/external/single_ad_samples&" +
  "sz=640x480&" +
  "cust_params=sample_ct%3Dlinear&" +
  "ciu_szs=300x250%2C728x90&" +
  "gdfp_req=1&" +
  "output=vast&" +
  "unviewed_position_start=1&" +
  "env=vp&" +
  "correlator=";


type Prop = {
    adBreaks: number[]
}

export default function ImaVideoPlayerVer1({adBreaks}:Prop) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const page = usePage()
//   const  [adBreaks, setAdBreaks] = useState([2, 20,]);
  const playedBreaks = new Set();

  useEffect(() => {
    let cancelled = false;

    const loadImaSdk = () => {
      return new Promise((resolve, reject) => {
        // Already loaded
        if (window.google?.ima) {
          resolve();
          return;
        }

        const existing = document.querySelector(
          'script[src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"]'
        );

        if (existing) {
          existing.addEventListener("load", resolve);
          existing.addEventListener("error", reject);
          return;
        }

        const script = document.createElement("script");

        script.src = IMA_SDK_URL;
        script.async = true;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
      });
    };

    const initializePlayer = async () => {
      try {
        await loadImaSdk();

        if (!videoRef.current) {
          return;
        }

        const player = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          muted: true,
          preload: "auto",
          fluid: true,
          sources: [
            {
              src: CONTENT_URL,
              type: "video/mp4",
            },
            {
              src: CONTENT_URL,
              type: "video/mp4",
            },
          ],
        });

        playerRef.current = player;

        /*
         * IMPORTANT:
         *
         * The IMA plugin is initialized here.
         * player.ima() is added by videojs-ima.
         */
        player.ima({
          adTagUrl: page.props.adsUrl,

          /*
           * Let the IMA SDK automatically handle
           * VMAP / ad-rules breaks.
           */
          autoPlayAdBreaks: false,

          /*
           * Optional:
           * tells IMA the player dimensions.
           */
          adsRenderingSettings: {
            restoreCustomPlaybackStateOnAdBreakComplete: true,
          },
        });

        /*
         * Initialize the IMA display container from
         * a user gesture on mobile.
         */
        const initializeIMA = () => {
          if (player.ima?.initializeAdDisplayContainer) {
            player.ima.initializeAdDisplayContainer();
          }
        };

        player.one("play", initializeIMA);


        player.on("loadedmetadata", () => {
            const duration = player.duration();
            
            if(!duration) return

            // const adInterval = Math.floor(duration / 6)

            // const adsTimestamps = Array.from({length: 6}, (v:number, k: number) => (k * adInterval) + 1)

            // setAdBreaks(adsTimestamps)

            console.log("Total video time:", duration);
        });

        /*
         * Ad started
         */
        player.on("ads-ad-started", () => {
          console.log("IMA ad started");
        });


        player.on("timeupdate", () => {
            const currentTime = player.currentTime();

            if(!currentTime || !adBreaks.length) return

            for (const breakTime of adBreaks) {
                if (
                currentTime >= breakTime &&
                !playedBreaks.has(breakTime)
                ) {
                    playedBreaks.add(breakTime);

                    console.log("Starting ad break:", breakTime);

                    player.ima.playAdBreak();

                    break
                }
            }
        });

        /*
         * Ad ended
         */
        player.on("adend", () => {
          console.log("IMA ad ended");
        });

        /*
         * IMA AdsManager
         */
        player.on("ads-manager", (event) => {
          const adsManager = event.adsManager;

          console.log("IMA AdsManager initialized", adsManager);

          adsManager.addEventListener(
            window.google.ima.AdEvent.Type.STARTED,
            () => {
              console.log("Google IMA: ad started");
            }
          );

          adsManager.addEventListener(
            window.google.ima.AdEvent.Type.COMPLETE,
            () => {
              console.log("Google IMA: ad completed");
            }
          );

          adsManager.addEventListener(
            window.google.ima.AdErrorEvent.Type.AD_ERROR,
            (error) => {
              console.error("Google IMA ad error:", error);
            }
          );
        });

        /*
         * Ads request event
         */
        player.on("ads-request", (event) => {
          console.log("IMA ad request:", event);
        });

        /*
         * General Video.js errors
         */
        player.on("error", () => {
          console.error("Video.js error:", player.error());
        });
      } catch (error) {
        console.error("Failed to initialize Video.js IMA:", error);
      }
    };

    initializePlayer();

    return () => {
      cancelled = true;

      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="relative">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin absolute inset-0"
        playsInline
      />
    </div>
  );
}

import { useEffect, useRef } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
import { useVideoPlayerContext } from "./media-player";
import Player from "video.js/dist/types/player";
// import "./ImaVideoPlayer.css";

const IMA_SDK_URL =
  "https://imasdk.googleapis.com/js/sdkloader/ima3.js";

// Your content video
// const CONTENT_URL = "//vjs.zencdn.net/v/oceans.mp4";

// Your Revive VAST endpoint
const VAST_URL =
  "https://emqatar.com/adserver/www/delivery/fc.php?zoneid=1";

// Mid-roll positions in seconds
const MID_ROLLS = [10, 30, 60, 120];

type Prop = {
    MID_ROLLS: number[]
}

export default function ImaVideoPlayer({CONTENT_URL}: {CONTENT_URL: string}) {

  const ctx = useVideoPlayerContext()

  const videoRef = useRef(null);
  const playerRef = useRef<Player>(null);

  // Google IMA
  const adsLoaderRef = useRef(null);
  const adsManagerRef = useRef(null);
  const adDisplayContainerRef = useRef(null);

  // State
  const imaInitializedRef = useRef(false);
  const adPlayingRef = useRef(false);
  const adRequestPendingRef = useRef(false);

  // Prevent the same break from being triggered twice
  const triggeredBreaksRef = useRef(new Set());

  // Used to detect seeking over an ad break
  const previousTimeRef = useRef(0);

  // Prevent pre-roll from being requested more than once
  const preRollRequestedRef = useRef(false);


  function loadImaSdk() {
    return new Promise((resolve, reject) => {
      if (window.google?.ima) {
        resolve(true);
        return;
      }

      const existingScript =
        document.querySelector(
          'script[src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"]'
        );

      if (existingScript) {
        existingScript.addEventListener("load", resolve, { once: true });

        existingScript.addEventListener(
          "error",
          reject(new Error("IMAP error")),
          { once: true }
        );

        return;
      }

      const script =
        document.createElement("script");

      script.src = IMA_SDK_URL;
      script.async = true;

      script.onload = resolve;
      script.onerror = () =>
        reject(
          new Error(
            "Could not load Google IMA SDK"
          )
        );

      document.head.appendChild(script);
    });
  }

  useEffect(() => {
    let destroyed = false;

    async function init() {
      try {
        await loadImaSdk();

        if (destroyed || !videoRef.current) {
          return;
        }

        initializePlayer();
      } catch (error) {
        console.error(
          "Failed to initialize IMA:",
          error
        );
      }
    }

    init();

    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);

  /**
   * Load Google IMA SDK once.
   */

  /**
   * Initialize Video.js and IMA.
   */
  function initializePlayer() {
    const videoElement =
      videoRef.current;

    if (!videoElement) {
      return;
    }

    /*
     * Initialize Video.js.
     */
    const player = videojs(
      videoElement,
      {
        controls: true,
        autoplay: true,
        muted: true,
        preload: "auto",
        fluid: false,
        responsive: true,
        sources: [
          {
            src: CONTENT_URL,
            type: "video/mp4",
          },
        ],
      }
    );

    playerRef.current = player;

    /*
     * Create the IMA overlay container.
     */
    const adContainer =
      document.createElement("div");

    adContainer.className =
      "ima-ad-container";

    adContainer.style.display = "none";

    player.el().appendChild(
      adContainer
    );

    /*
     * IMPORTANT:
     *
     * Pass the REAL HTMLVideoElement.
     *
     * Do NOT use:
     *
     * player.tech(true).el()
     */
    const adDisplayContainer =
      new google.ima.AdDisplayContainer(
        adContainer,
        videoElement
      );

    adDisplayContainerRef.current =
      adDisplayContainer;

    /*
     * Create AdsLoader once.
     *
     * Each ad break will create a NEW
     * AdsRequest.
     */
    const adsLoader =
      new google.ima.AdsLoader(
        adDisplayContainer
      );

    adsLoaderRef.current =
      adsLoader;

    /*
     * AdsManager loaded.
     */
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type
        .ADS_MANAGER_LOADED,
      handleAdsManagerLoaded
    );

    /*
     * Global IMA error.
     */
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      handleAdError
    );

    /*
     * Initialize IMA from the user's
     * first play gesture.
     *
     * This is important for mobile browsers.
     */
    player.one("play", () => {
      
      initializeAdDisplayContainer();

      requestPreRoll();
    });

    

    /*
     * Monitor playback for mid-rolls.
     */
    player.on(
      "timeupdate",  handleTimeUpdate
    );

    /*
     * Track current position.
     */
    player.on(
      "timeupdate",
      () => {
        if (!adPlayingRef.current) {
          previousTimeRef.current =
            player.currentTime();
        }
      }
    );

    /*
     * Content ended.
     */
    player.on("ended", () => {
      console.log(
        "Content playback completed"
      );

      // If you want a post-roll,
      // call requestAd("post-roll") here.
      ctx?.setPlayingStarted(false)
      requestAd("post-roll")
    });

    /*
     * Video.js error.
     */
    player.on("error", () => {
      console.error(
        "Video.js error:",
        player.error()
      );
    });
  }

  /**
   * Initialize IMA's display container.
   *
   * Must happen from a user gesture.
   */
  function initializeAdDisplayContainer() {
    if (
      imaInitializedRef.current
    ) {
      return;
    }

    const container =
      adDisplayContainerRef.current;

    if (!container) {
      return;
    }

    try {
      container.initialize();

      imaInitializedRef.current =
        true;

      console.log(
        "IMA display container initialized"
      );
    } catch (error) {
      console.error(
        "IMA display initialization failed:",
        error
      );
    }
  }

  /**
   * Request the pre-roll.
   */
  function requestPreRoll() {
    if (
      preRollRequestedRef.current
    ) {
      return;
    }

    preRollRequestedRef.current =
      true;

    requestAd("pre-roll");
  }

  /**
   * Request a completely NEW VAST ad.
   *
   * Every call creates a new AdsRequest.
   */
  function requestAd(breakId) {
    const player =
      playerRef.current;

    const adsLoader =
      adsLoaderRef.current;

    if (!player || !adsLoader) {
      console.error(
        "IMA is not initialized"
      );

      return;
    }

    if (
      adPlayingRef.current ||
      adRequestPendingRef.current
    ) {
      return;
    }

    /*
     * Mark request as pending.
     *
     * This prevents timeupdate from
     * requesting the same ad repeatedly.
     */
    adRequestPendingRef.current =
      true;

    /*
     * Pause content before requesting
     * the mid-roll.
     */
    player.pause();
    if (
      breakId !== "pre-roll"
    ) {
      
    }

    /*
     * Create a completely NEW request.
     */
    const adsRequest =
      new google.ima.AdsRequest();

    /*
     * Fresh Revive request.
     */
    adsRequest.adTagUrl =
      buildVastUrl(breakId);

    /*
     * Tell IMA the available
     * linear ad dimensions.
     */
    const width =
      player.currentWidth() ||
      player.el().clientWidth ||
      640;

    const height =
      player.currentHeight() ||
      player.el().clientHeight ||
      360;

    adsRequest.linearAdSlotWidth =
      width;

    adsRequest.linearAdSlotHeight =
      height;

    adsRequest.nonLinearAdSlotWidth =
      width;

    adsRequest.nonLinearAdSlotHeight =
      Math.round(height * 0.25);

    /*
     * Optional metadata.
     */
    adsRequest.contentDuration =
      Number.isFinite(
        player.duration()
      )
        ? player.duration()
        : undefined;

    console.log(
      `Requesting ${breakId} ad`
    );

    console.log(
      "VAST URL:",
      adsRequest.adTagUrl
    );

    /*
     * THIS is the actual fresh request.
     */
    adsLoader.requestAds(
      adsRequest
    );
  }

  /**
   * Build a fresh Revive VAST URL.
   */
  function buildVastUrl(breakId) {
    return "https://emqatar.com/adserver/www/delivery/fc.php?script=apVideo:vast2&zoneid=1&skipoffset=10&cb"
    const separator =
      VAST_URL.includes("?")
        ? "&"
        : "?";

    const params =
      new URLSearchParams({
        cb: Date.now().toString(),

        // Optional identifier you can
        // use server-side.
        adbreak: breakId,
      });

    return `${VAST_URL}${separator}${params.toString()}`;
  }

  /**
   * IMA has returned an AdsManager.
   */
  function handleAdsManagerLoaded(
    event
  ) {
    const player =
      playerRef.current;

    const videoElement =
      videoRef.current;

    if (!player || !videoElement) {
      return;
    }


    // player.pause()

    /*
     * The AdsManager gets the actual
     * HTMLVideoElement.
     *
     * NOT player.tech(true).el()
     */
    const adsManager =
      event.getAdsManager(
        videoElement
      );

    if (!adsManager) {
      console.error(
        "IMA did not return AdsManager"
      );

      finishAd(player);

      return;
    }

    /*
     * Replace any previous manager.
     */
    adsManagerRef.current =
      adsManager;

    /*
     * Ad started.
     */
    adsManager.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      () => {
        console.log(
          "IMA: ad started"
        );

        adPlayingRef.current =
          true;

        adRequestPendingRef.current =
          false;


        showAdContainer();
      }
    );

    /*
     * Ad completed.
     */
    adsManager.addEventListener(
      google.ima.AdEvent.Type.COMPLETE,
      () => {
        console.log(
          "IMA: ad completed"
        );

        finishAd(player);
      }
    );

    /*
     * Ad skipped.
     */
    adsManager.addEventListener(
      google.ima.AdEvent.Type.SKIPPED,
      () => {
        console.log(
          "IMA: ad skipped"
        );

        finishAd(player);
      }
    );

    /*
     * Ad paused.
     */
    adsManager.addEventListener(
      google.ima.AdEvent.Type.PAUSED,
      () => {
        console.log(
          "IMA: ad paused"
        );
      }
    );

    /*
     * Ad resumed.
     */
    adsManager.addEventListener(
      google.ima.AdEvent.Type.RESUMED,
      () => {
        console.log(
          "IMA: ad resumed"
        );
      }
    );

    /*
     * Ad error.
     */
    adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      (event) => {
        console.error(
          "IMA AdsManager error:",
          event.getError()
        );

        finishAd(player);
      }
    );

    /*
     * Calculate player dimensions.
     */
    const width =
      player.currentWidth() ||
      player.el().clientWidth ||
      640;

    const height =
      player.currentHeight() ||
      player.el().clientHeight ||
      360;

    try {
      /*
       * Initialize the AdsManager.
       */
      adsManager.init(
        width,
        height,
        google.ima.ViewMode.NORMAL
      );

      /*
       * Start the ad.
       */
      adsManager.start();
    } catch (error) {
      console.error(
        "Could not start IMA ad:",
        error
      );

      finishAd(player);
    }
  }

  /**
   * Handle global IMA errors.
   */
  function handleAdError(event) {
    console.error(
      "IMA error:",
      event.getError()
    );

    const player =
      playerRef.current;

    if (player) {
      finishAd(player);
    }
  }

  /**
   * Detect mid-roll positions.
   */
  function handleTimeUpdate() {

   
    ctx?.setPlayingStarted(true)

    const player =
      playerRef.current;

    if (!player) {
      return;
    }

    if (
      adPlayingRef.current ||
      adRequestPendingRef.current
    ) {
      return;
    }

    if (player.paused()) {
      return;
    }

    const currentTime =
      player.currentTime();


       if(ctx) ctx.setTimeElapsed(previousTimeRef.current)

    /*
     * Check every configured break.
     */
    for (
      const breakTime of MID_ROLLS
    ) {
      /*
       * Already played?
       */
      if (
        triggeredBreaksRef.current.has(
          breakTime
        )
      ) {
        continue;
      }

      /*
       * Has playback reached the
       * break position?
       */
      if (
        currentTime >= breakTime
      ) {

        /*
         * Mark BEFORE requesting.
         *
         * This prevents timeupdate from
         * requesting it repeatedly.
         */
        triggeredBreaksRef.current.add(
          breakTime
        );

        requestAd(
          `mid-roll-${breakTime}`
        );

        break;
      }
    }
  }

  /**
   * Finish an ad and resume content.
   */
  function finishAd(player) {
    adPlayingRef.current =
      false;

    adRequestPendingRef.current =
      false;

    hideAdContainer();

    /*
     * Destroy the current AdsManager.
     *
     * The next break will get a NEW
     * AdsManager from a NEW AdsRequest.
     */
    if (adsManagerRef.current) {
      try {
        adsManagerRef.current.destroy();
      } catch (error) {
        console.warn(
          "Error destroying AdsManager:",
          error
        );
      }

      adsManagerRef.current =
        null;
    }

    /*
     * Resume content.
     */
    if (
      player &&
      !player.ended()
    ) {
      player.play().catch((error) => {
        console.warn(
          "Could not resume content:",
          error
        );
      });
    }
  }

  /**
   * Show IMA overlay.
   */
  function showAdContainer() {
    const container =
      document.querySelector(
        ".ima-ad-container"
      );

    if (container) {
      container.style.display =
        "block";
    }
  }

  /**
   * Hide IMA overlay.
   */
  function hideAdContainer() {
    const container =
      document.querySelector(
        ".ima-ad-container"
      );

    if (container) {
      container.style.display =
        "none";
    }
  }

  /**
   * Cleanup.
   */
  function cleanup() {
    if (adsManagerRef.current) {
      try {
        adsManagerRef.current.destroy();
      } catch {}
    }

    adsManagerRef.current =
      null;

    adsLoaderRef.current =
      null;

    adDisplayContainerRef.current =
      null;

    if (playerRef.current) {
      playerRef.current.dispose();

      playerRef.current =
        null;
    }
  }

  return (
    <div  className="video-player-wrapper">
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline
      />
    </div>
  );
}

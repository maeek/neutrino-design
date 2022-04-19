import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useControlls } from './hooks/useControlls';
import { PlayerContextType, PlayerProvider, VideoDimensions } from './PlayerContext';
import { listenToEvent } from './eventUtil';

export interface PlayerProps {
  children: React.ReactNode;
  mediaElement?: 'video' | 'audio';
  url: string;
  autoPlay?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  controls?: boolean;
  poster?: string;
  volume?: number;
  playbackRate?: number;
  maxPlaybackRate?: number;
  aspectRatio?: string;
  forceAspectRatio?: boolean;
  keyboardControl?: boolean;
  onLoadedData?:  (...args: unknown[]) => void;
  onLoadedMetadata?: (...args: unknown[]) => void;
  // onReadyToPlay: (...args: unknown[]) => void;
  onTimeUpdate: (...args: unknown[]) => void;
  onCanPlay: (...args: unknown[]) => void;
  onEnd: (...args: unknown[]) => void;
  onError: (...args: unknown[]) => void;
  onProgress: (buffered: number, ...args: unknown[]) => void;
  onPlay: (...args: unknown[]) => void;
  onPause: (...args: unknown[]) => void;
  onVolumeChange: (volume: number, ...args: unknown[]) => void;
  onFullscreenChange: (fullscreen: boolean, ...args: unknown[]) => void;
  getNodeElement: (element: HTMLVideoElement | HTMLAudioElement) => void;
}

export const Player = (props: PlayerProps) => {
  const {
    children,
    url,
    autoPlay = false,
    preload,
    controls,
    poster,
    aspectRatio,
    forceAspectRatio,
    playbackRate,
    onTimeUpdate,
    onLoadedMetadata,
    onLoadedData,
    onEnd,
    onError,
    onProgress,
    onPlay,
    onPause,
    onVolumeChange,
    onCanPlay,
    onFullscreenChange,
    getNodeElement,
    mediaElement = 'video',
    maxPlaybackRate = 5,
    volume: initialVolume = 1,
    keyboardControl
  } = props;
  const playerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(document.createElement(mediaElement));

  /**
   * Media properties
   */
  const [ duration, setDuration ] = useState<number | null>(null);
  const [ currentTime, setCurrentTime ] = useState<number | null>(null);
  const [ canPlay, setCanPlay ] = useState<boolean>(false);
  const [ stalled, setStalled ] = useState<boolean>(false);
  const [ isAborted, setIsAborted ] = useState<boolean>(false);
  const [ playing, setPlaying ] = useState<boolean>(false);
  const [ hasEnded, setHasEnded ] = useState<boolean>(false);
  const [ internalPlaybackRate, setInternalPlaybackRate ] = useState<number>(mediaRef.current.defaultPlaybackRate);
  const [ volume, setVolume ] = useState<number>(initialVolume);

  /**
   * Video properties
   */
  const [ dimensions, setDimensions ] = useState<VideoDimensions | undefined>();

  /**
   * Player properties
   */
  const [ isFullscreen, setIsFullscreen ] = useState<boolean>(false);
  const [ error, setError ] = useState<Event>(null);

  /**
   * Internal methods
   */
  const onEndCallback = useCallback((...args: unknown[]) => {
    setHasEnded(true);
    onEnd(...args);
  }, [ onEnd ]);

  const onTimeUpdateCallback = useCallback((...args: unknown[]) => {
    setCurrentTime(mediaRef.current.currentTime);
    onTimeUpdate(...args);
  }, [ onTimeUpdate ]);

  /**
   * Context API methods
   */
  const { play, seek, toggleFullscreen } = useControlls(mediaRef, playerRef);

  /**
   * Lifecycle events
   */
  useEffect(() => {
    const mediaElement = mediaRef.current;

    const unsubscribeOnLoadedMetadata = listenToEvent(mediaElement, 'loadedmetadata', (...args: unknown[]) => {

      setDuration(mediaElement.duration);
      if (mediaElement instanceof HTMLVideoElement) {
        setDimensions({
          width: mediaElement.videoWidth,
          height: mediaElement.videoHeight
        });
      }
      setCurrentTime(mediaElement.currentTime);
      onLoadedMetadata?.(...args);
    });

    const unsubscribeOnLoadedData = listenToEvent(mediaElement, 'loadeddata', (...args: unknown[]) => {
      onLoadedData?.(...args);
    });

    const unsubscribeOnCanPlay = listenToEvent(mediaElement, 'canplay', (...args: unknown[]) => {
      setCanPlay(true);
      onCanPlay?.(...args);
    });

    const unsubscribeOnEnded = listenToEvent(mediaElement, 'ended', (...args: unknown[]) => {
      setPlaying(false);
      onEndCallback?.(...args);
    });

    const unsubscribeOnError = listenToEvent(mediaElement, 'error', (...args: unknown[]) => {
      setError(args[ 0 ] as Event);
      onError?.(...args);
    });

    const unsubscribeOnTimeUpdate = listenToEvent(mediaElement, 'timeupdate', (...args: unknown[]) => {
      onTimeUpdateCallback?.(...args);
    });

    const unsubscribeOnProgress = listenToEvent(mediaElement, 'progress', (...args: unknown[]) => {

      if (mediaElement.buffered.length > 0) {
        onProgress?.((mediaElement.buffered.end(0) / mediaElement.duration) * 100, ...args);
      }
    });

    const unsubscribeOnPlay = listenToEvent(mediaElement, 'play', (...args: unknown[]) => {
      setPlaying(true);
      onPlay?.(...args);
    });

    const unsubscribeOnPause = listenToEvent(mediaElement, 'pause', (...args: unknown[]) => {
      setPlaying(false);
      onPause?.(...args);
    });

    const unsubscribeOnPlaying = listenToEvent(mediaElement, 'playing', () => {
      setStalled(false);
      setIsAborted(false);
    });

    const unsubscribeOnStalled = listenToEvent(mediaElement, 'stalled', () => {
      setStalled(true);
    });

    const unsubscribeOnFullscreen = listenToEvent(mediaElement, 'fullscreenchange', (...args: unknown[]) => {
      const newState = !!document.fullscreenElement;
      setIsFullscreen(newState);
      onFullscreenChange?.(newState, ...args);
    });

    const unsubscribeOnVolumeChange = listenToEvent(mediaElement, 'volumechange', (...args: unknown[]) => {
      onVolumeChange(mediaElement.volume, ...args);
    });

    const unsubscribeOnDurationChange = listenToEvent(mediaElement, 'durationchange', () => {
      setDuration(mediaElement.duration);
    });

    let unsubscribeOnResize;
    if (mediaElement instanceof HTMLVideoElement) {
      unsubscribeOnResize = listenToEvent(mediaElement, 'resize', () => {
        setDimensions({
          width: (mediaElement as HTMLVideoElement).videoWidth,
          height: (mediaElement as HTMLVideoElement).videoHeight
        });
      });
    }

    const unsubscribeOnAbort = listenToEvent(mediaElement, 'abort', (...args: unknown[]) => {
      onError?.(...args);
      setIsAborted(true);
    });

    mediaElement.src = url;

    return () => {
      unsubscribeOnLoadedMetadata();
      unsubscribeOnLoadedData();
      unsubscribeOnAbort();
      unsubscribeOnCanPlay();
      unsubscribeOnEnded();
      unsubscribeOnError();
      unsubscribeOnTimeUpdate();
      unsubscribeOnProgress();
      unsubscribeOnPlay();
      unsubscribeOnPause();
      unsubscribeOnPlaying();
      unsubscribeOnStalled();
      unsubscribeOnFullscreen();
      unsubscribeOnVolumeChange();
      unsubscribeOnDurationChange();
      unsubscribeOnResize?.();
    };
  }, [
    url,
    onEndCallback,
    onTimeUpdateCallback,
    onProgress,
    onPlay,
    onPause,
    onError,
    onVolumeChange,
    onCanPlay,
    onFullscreenChange,
    onLoadedMetadata,
    onLoadedData
  ]);

  useEffect(() => {
    getNodeElement?.(mediaRef.current);
  }, [ getNodeElement ]);

  // Update playback speed from props
  useEffect(() => {
    if (playbackRate !== undefined) {
      setInternalPlaybackRate(Math.max(0.5, Math.min(maxPlaybackRate, playbackRate)));
    }
  }, [ playbackRate, maxPlaybackRate ]);

  // Update playback speed
  useEffect(() => {
    mediaRef.current.playbackRate = internalPlaybackRate;
  }, [ internalPlaybackRate ]);

  // Update internal volume level from props
  useEffect(() => {
    if (initialVolume !== undefined) {
      setVolume(Math.max(0, Math.min(1, initialVolume)));
    }
  }, [ initialVolume ]);

  // Update internal media properties
  useEffect(() => {
    mediaRef.current.autoplay = autoPlay;
    mediaRef.current.volume = volume;
  }, [ volume, autoPlay ]);

  useEffect(() => {
    if (!keyboardControl) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        play();
      }
      if (event.key.toLocaleLowerCase() === 'f') {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
  }, [ keyboardControl, play, toggleFullscreen ]);

  /**
   * Derivative values
   */
  const videoAspectRatio = useMemo(() => {
    if (!aspectRatio) return undefined;

    const [ width, height ] = aspectRatio.split(/[:x]/);

    return (width ?? false) && (height ?? false) ? {
      force: forceAspectRatio,
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    } : undefined;
  }, [ aspectRatio, forceAspectRatio ]);

  const value: PlayerContextType = {
    url,
    mediaElement: mediaRef,
    playerElement: playerRef,
    playbackRate: internalPlaybackRate,
    currentTime,
    duration,
    dimensions,
    isAborted,
    stalled,
    isFullscreen,
    error,
    volume,
    setVolume,
    canPlay,
    hasEnded,
    videoAspectRatio,
    playing,
    mediaProps: {
      autoPlay,
      controls,
      preload,
      poster
    },
    play,
    toggleFullscreen,
    buffered: undefined,
    setUrl: function (url: string): void {
      throw new Error('Function not implemented. ' + url);
    },
    reset: function (): void {
      throw new Error('Function not implemented.');
    },
    seek
  };

  return (
    <PlayerProvider value={value}>
      <div className="ne-player" ref={playerRef}>
        {children}
      </div>
    </PlayerProvider>
  );
};

import { RefObject, useCallback } from 'react';

export const useControlls = (
  mediaRef: RefObject<HTMLVideoElement | HTMLAudioElement>,
  playerRef: RefObject<HTMLDivElement>
) => {
  const play = useCallback((state?: boolean) => {
    const isControlled = typeof state === 'boolean';

    if (isControlled) {
      if (state) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    } else {
      if (mediaRef.current.paused) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }

  }, [ mediaRef ]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [ playerRef ]);

  const seek = useCallback((time: number) => {
    mediaRef.current.currentTime = time;
  }, [ mediaRef ]);

  return {
    play,
    toggleFullscreen,
    seek
  };
};

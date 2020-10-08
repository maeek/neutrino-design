/* eslint-disable no-unused-vars */
/* eslint-disable promise/param-names */
import { useState, useEffect } from 'react';
import { computeAvatar, AvatarProperties } from './compute';

export interface PropsTypes {
  text: string;
  options?: AvatarProperties;
}

export default (
  props: PropsTypes
): { imageBlob: Blob; recompute: Function } => {
  const { text, options } = props;
  const [imageBlob, setAvatarBlob] = useState<Blob>(new Blob([]));

  const recompute = async () => {
    if (options?.preloadGoogleFonts) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `https://fonts.googleapis.com/css2?family=${options?.font?.family},wght@0,${options?.font?.weight}&display=swap`;
      document.getElementsByTagName('head')[0].appendChild(link);

      const loadFont = new Image();
      loadFont.onerror = () => {
        computeAvatar(text, options).then((blob) => setAvatarBlob(blob));
      };
      loadFont.src = link.href;
    } else {
      computeAvatar(text, options).then((blob) => setAvatarBlob(blob));
    }
  };

  useEffect(() => {
    recompute();
  }, [text, options]);

  return { imageBlob: imageBlob, recompute };
};

export { getInitials } from './getInitials';
export { computeAvatar, DEFAULT_AVATAR_OPTIONS } from './compute';
export type { AvatarProperties } from './compute';

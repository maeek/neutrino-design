/* eslint-disable no-unused-vars */
/* eslint-disable promise/param-names */
import Blob from 'cross-blob';
import { useState, useEffect } from 'react';
import { computeAvatar, AvatarProperties } from './compute';

export interface PropsTypes {
  text: string;
  options?: AvatarProperties;
}

enum textToWeightEnum {
  light = 200,
  lighter = 100,
  normal = 400,
  bold = 700,
  bolder = 900
}

const waitForFont = ({
  family,
  weight
}: {
  family: string;
  weight: string | number;
}) => {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `https://fonts.googleapis.com/css2?family=${
      family.split(',')[0]
    }:wght@0,${
      typeof weight === 'string' ? textToWeightEnum[weight] : weight
    }&display=swap`;
    document.getElementsByTagName('head')[0].appendChild(link);

    const loadFont = new Image();
    loadFont.onerror = () => {
      resolve();
    };
    loadFont.src = link.href;
  });
};

export default (
  props: PropsTypes
): { imageBlob: Blob; recompute: Function } => {
  const { text, options } = props;
  const [imageBlob, setAvatarBlob] = useState<Blob>(new Blob([]));

  const recompute = async () => {
    if (options?.preloadGoogleFonts) {
      waitForFont(options.font).then(() => {
        computeAvatar(text, options).then((blob) => setAvatarBlob(blob));
      });
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

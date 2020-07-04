import { useState, useMemo } from 'react';

export interface PropsTypes {
  text: string;
  options: AvatarProperties;
}

interface CanvasRatioExtendedProperties extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio: any;
  mozBackingStorePixelRatio: any;
  msBackingStorePixelRatio: any;
  oBackingStorePixelRatio: any;
  backingStorePixelRatio: any;
}

interface AvatarProperties {
  size: {
    width: number;
    height: number;
  };
  background: string;
  color: string;
  font: string;
}

export const DEFAULT_AVATAR_OPTIONS: AvatarProperties = {
  size: {
    width: 300,
    height: 300
  },
  background: '#2B3036',
  color: '#5EA8ED',
  font: 'bold 150px Roboto, sans-serif'
};

export const getInitials = (text: string): Array<string> => {
  return text
    .split(/(\s)|([_-/])/)
    .map((word) => word.substr(0, 1).toUpperCase());
};

export const computeAvatar = async (
  text: string,
  options: AvatarProperties = DEFAULT_AVATAR_OPTIONS
): Promise<Blob> => {
  // Prepare text
  const initials = getInitials(text).join('');
  // Create canvas
  const canvas = <HTMLCanvasElement>document.createElement('canvas');
  const ctx = <CanvasRatioExtendedProperties>canvas.getContext('2d');

  // Set proper ratio
  const dpr = window.devicePixelRatio || 1;
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  const ratio = dpr / bsr;
  canvas.width = options.size.width * ratio;
  canvas.height = options.size.height * ratio;

  // Set bg
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = options.background;
  ctx.fillRect(0, 0, options.size.width, options.size.height);

  // Place text
  ctx.font = options.font;
  ctx.fillStyle = options.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(initials, options.size.width / 2, options.size.height / 2);

  // Return blob
  const getBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
    new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg');
    });

  return await getBlob(canvas);
};

export default (props: PropsTypes): { avatarBlob: Blob } => {
  const { text, options } = props;
  const [avatarBlob, setAvatarBlob] = useState(new Blob([]));

  useMemo(() => {
    computeAvatar(text, options).then((blob) => setAvatarBlob(blob));
  }, [text, options]);

  return {
    avatarBlob
  };
};

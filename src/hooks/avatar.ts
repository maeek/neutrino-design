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

export interface AvatarSize {
  width: number;
  height: number;
}

export interface AvatarProperties {
  size: AvatarSize;
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
  options: AvatarProperties
): Promise<Blob> => {
  const canvasOptions = {
    ...DEFAULT_AVATAR_OPTIONS,
    ...options
  };

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
  canvas.width = canvasOptions.size.width * ratio;
  canvas.height = canvasOptions.size.height * ratio;

  // Set bg
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.fillStyle = canvasOptions.background;
  ctx.fillRect(0, 0, canvasOptions.size.width, canvasOptions.size.height);

  // Place text
  ctx.font = canvasOptions.font;
  ctx.fillStyle = canvasOptions.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(
    initials,
    canvasOptions.size.width / 2,
    canvasOptions.size.height / 2
  );

  // Return blob
  const getBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
    new Promise((resolve) => {
      canvas.toBlob((blob: Blob) => resolve(blob), 'image/jpeg');
    });

  return await getBlob(canvas);
};

export default (props: PropsTypes): { imageBlob: Blob | null } => {
  const { text, options } = props;
  const [imageBlob, setAvatarBlob] = useState<Blob | null>(null);

  useMemo(() => {
    computeAvatar(text, options).then((blob) => setAvatarBlob(blob));
  }, [text, options]);

  return {
    imageBlob
  };
};

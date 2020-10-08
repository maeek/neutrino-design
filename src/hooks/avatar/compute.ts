import getInitials from './getInitials';

interface CanvasRatioExtendedProperties extends CanvasRenderingContext2D {
  webkitBackingStorePixelRatio: any;
  mozBackingStorePixelRatio: any;
  msBackingStorePixelRatio: any;
  oBackingStorePixelRatio: any;
  backingStorePixelRatio: any;
}

export interface AvatarDimensions {
  width: number;
  height: number;
}

export interface AvatarProperties {
  size: AvatarDimensions;
  background: string;
  color: string;
  maxLength: number;
  preloadGoogleFonts: boolean;
  font: {
    weight: string | number;
    size: string | number;
    family: string;
  };
}

export const DEFAULT_AVATAR_OPTIONS: AvatarProperties = {
  size: {
    width: 300,
    height: 300
  },
  background: '#2B3036',
  color: '#5EA8ED',
  maxLength: 3,
  preloadGoogleFonts: false,
  font: {
    weight: 'bold',
    size: 'auto',
    family: 'Roboto, sans-serif'
  }
};

export const computeAvatar = async (
  text: string,
  fallbackOptions?: AvatarProperties
): Promise<Blob> => {
  const canvasOptions = {
    ...DEFAULT_AVATAR_OPTIONS,
    ...fallbackOptions,
    font: {
      ...DEFAULT_AVATAR_OPTIONS.font,
      ...fallbackOptions?.font
    }
  };
  if (canvasOptions.font.size === 'auto') {
    canvasOptions.font.size = canvasOptions.size.height / 2 + 'px';
  }

  const fontSize =
    typeof canvasOptions.font.size === 'string'
      ? Number(canvasOptions.font.size.split(/[a-zA-Z]+/)[0])
      : canvasOptions.font.size;
  const fontSizeToHeightRatio = fontSize / canvasOptions.size.height;
  // Prepare text
  const initials = getInitials(text)
    .splice(0, canvasOptions.maxLength ?? 2)
    .join('');
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
  ctx.font = `${canvasOptions.font.weight} ${canvasOptions.font.size} ${canvasOptions.font.family}`;
  ctx.fillStyle = canvasOptions.color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(
    initials,
    canvasOptions.size.width / 2,
    canvasOptions.size.height / 2 + (fontSize / 10) * fontSizeToHeightRatio
  );

  // Return blob
  const getBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
    new Promise((resolve) => {
      canvas.toBlob((blob: any) => resolve(blob), 'image/jpeg');
    });

  return await getBlob(canvas);
};

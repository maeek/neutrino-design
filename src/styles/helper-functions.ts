export interface NeutrinoHelpers {
  hexToColor: (hex: string) => Color;
  hslToColor: (hsl: string) => Color;
  rgbaToColor: (rgba: string) => Color;
  colorToHex: (color: Color) => string;
  colorToRgba: (color: Color, alpha?: number) => string;
  colorToHsl: (color: Color, alpha?: number) => string;
  lighten: (color: Color | string, amount: number) => Color;
  darken: (color: Color | string, amount: number) => Color;
  transparentize: (color: Color | string, amount: number) => Color;
  detectColorScheme: () => 'dark' | 'light';
  detectColorFormat: (color: string) => 'hex' | 'rgba' | 'hsl' | 'rgb';
  remToPx: (rem: number) => number;
  pxToRem: (px: number) => number;
  size: (size: number, sizes: Record<string, any>) => number;
}

class Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;

  constructor(red: number, green: number, blue: number, alpha: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
}

export enum ZIndex {
  APP = 100,
  MODAL = 200,
  POPOVER = 300,
  OVERLAY = 400,
  BACKDROP = 500,
  LOADER = 600,
  TOOLTIP = 700,
  MENU = 800,
  DRAWER = 900,
}

export const getZIndex = (level: keyof typeof ZIndex) => {
  return ZIndex[ level ];
};

export const detectColorScheme = () => {
  const scheme = window.getComputedStyle(document.documentElement).getPropertyValue('--color-scheme');
  return scheme === 'dark' ? 'dark' : 'light';
};

export const detectColorFormat = (color: string) => {
  if (color.startsWith('#')) {
    return 'hex';
  }
  if (color.startsWith('rgba')) {
    return 'rgba';
  }
  if (color.startsWith('hsl')) {
    return 'hsl';
  }

  return 'rgb';
};

export const hexToColor = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!result) {
    return null;
  }

  return new Color(
    parseInt(result[ 1 ], 16),
    parseInt(result[ 2 ], 16),
    parseInt(result[ 3 ], 16),
    1
  );
};

export const rgbaToColor = (rgba: string) => {
  const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+?)\)$/i.exec(rgba);

  if (!result) {
    return null;
  }

  return new Color(
    parseInt(result[ 1 ], 10),
    parseInt(result[ 2 ], 10),
    parseInt(result[ 3 ], 10),
    parseFloat(result[ 4 ])
  );
};

export const hslToColor = (hsl: string) => {
  const result = /^hsl?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+?)\)$/i.exec(hsl);

  if (!result) {
    return null;
  }

  const hue = parseInt(result[ 1 ], 10);
  const saturation = parseInt(result[ 2 ], 10);
  const lightness = parseInt(result[ 3 ], 10);
  const alpha = parseFloat(result[ 4 ]);

  const c = (p: number, q: number, t: number) => {
    if (t < 0) {
      t += 1;
    }

    if (t > 1) {
      t -= 1;
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }

    if (t < 1 / 2) {
      return q;
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }

    return p;
  };

  const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  const p = 2 * lightness - q;
  const r = Math.round(c(p, q, hue + 1 / 3) * 255);
  const g = Math.round(c(p, q, hue) * 255);
  const b = Math.round(c(p, q, hue - 1 / 3) * 255);

  return new Color(r, g, b, alpha);
};

export const colorToHsl = (color: Color) => {
  const { red, green, blue, alpha } = color;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  const hue: number = (() => {
    switch (max) {
    case red:
      return (((green - blue) / delta) + 4) % 6;
    case green:
      return (((blue - red) / delta) + 2) % 6;
    case blue:
      return (((red - green) / delta) + 4) % 6;
    default:
      return 0;
    }
  }
  )();

  const lightness = (max + min) / 2;
  const saturation = (max === 0) ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  return `hsl(${hue * 60}, ${saturation * 100}%, ${lightness * 100}%, ${alpha})`;
};

export const colorToHex = (color: Color) => {
  const { red, green, blue } = color;
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
};

export const colorToRgba = (color: Color) => {
  const { red, green, blue, alpha } = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

const convertColor = (color: string) => {
  const format = detectColorFormat(color);
  switch (format) {
  case 'hex':
    return hexToColor(color);
  case 'rgba':
    return rgbaToColor(color);
  case 'hsl':
    return hslToColor(color);
  default:
    return null;
  }
};

export const lighten = (color: Color | string, amount: number) => {
  const { red, green, blue, alpha } = typeof color === 'string' ? convertColor(color) as Color : color;
  return new Color(
    red + (255 - red) * amount,
    green + (255 - green) * amount,
    blue + (255 - blue) * amount,
    alpha
  );
};

export const darken = (color: Color | string, amount: number) => {
  const { red, green, blue, alpha } = typeof color === 'string' ? convertColor(color) as Color : color;
  return new Color(
    red - red * amount,
    green - green * amount,
    blue - blue * amount,
    alpha
  );
};

export const transparentize = (color: Color | string, amount: number) => {
  const { red, green, blue, alpha } = typeof color === 'string' ? convertColor(color) as Color : color;
  return new Color(
    red,
    green,
    blue,
    alpha - alpha * amount
  );
};

export const remToPx = (rem: number) => {
  return rem * (+window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
};

export const pxToRem = (px: number) => {
  return px / (+window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
};

export const size = (size: number | string, sizes: Record<string, any>) => {
  if (typeof size === 'number') {
    return size;
  }

  return sizes[ size ] || size || sizes[ size ].md;
};

export const radius = (radius: number | string, sizes: Record<string, any>) => {
  if (typeof radius === 'number') {
    return radius;
  }

  return sizes[ radius ] || radius || sizes[ radius ].md;
};

export default {
  hexToColor,
  rgbaToColor,
  colorToHex,
  colorToRgba,
  colorToHsl,
  lighten,
  darken,
  transparentize,
  convertColor,
  detectColorFormat,
  detectColorScheme,
  remToPx,
  pxToRem,
  size
};

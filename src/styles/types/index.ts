import { CSSProperties } from 'react';
import { NeutrinoSizer, NeutrinoSizes } from './sizes';
import {
  NeutrinoColors,
  NeutrinoColorScheme,
  NeutrinoColorsRecord,
  NeutrinoPrimaryShade,
  NeutrinoShade
} from './colors';
import { NeutrinoTextTheme as NeutrinoTextTheme } from './typo';
import { NeutrinoHelpers } from '../helper-functions';

export type NeutrinoLoaderType = 'spinner' | 'dot' | 'bars';

export interface NeutrinoThemeBase {
  dir: 'ltr' | 'rtl';
  loader: NeutrinoLoaderType;
  primaryShade: NeutrinoShade | NeutrinoPrimaryShade;
  colorScheme: NeutrinoColorScheme;
  colors: NeutrinoColorsRecord;
  primaryColor: NeutrinoColors;

  reducedMotion: boolean;
  transitionTimingFunction: CSSProperties['transitionTimingFunction'];

  defaultRadius: NeutrinoSizes | number;
  radius: NeutrinoSizer;
  spacing: NeutrinoSizer;
  breakpoints: NeutrinoSizer;

  typo: NeutrinoTextTheme;

  other: Record<string, any>;
  locale: string;
  dateFormat: string;

  helpers: NeutrinoHelpers;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type NeutrinoTheme = DeepPartial<NeutrinoThemeBase>;

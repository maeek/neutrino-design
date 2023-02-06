import { defaultColors } from './default-colors';
import { NeutrinoTheme } from './types';
import * as helpers from './helper-functions';

export const defaultDarkTheme: NeutrinoTheme = {
  dir: 'ltr',
  loader: 'spinner',
  primaryShade: {
    light: 0,
    default: 5,
    dark: 9
  },
  colorScheme: 'dark',
  colors: defaultColors,
  primaryColor: 'blue',
  reducedMotion: false,
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
  defaultRadius: 'md',
  radius: {
    unit: 'rem',
    xs: 0.1,
    sm: 0.2,
    md: 0.4,
    lg: 0.8,
    xl: 1,
    xxl: 1.6
  },
  spacing: {
    unit: 'rem',
    xs: 0.1,
    sm: 0.2,
    md: 0.5,
    lg: 1,
    xl: 1.8,
    xxl: 2.4
  },
  breakpoints: {
    unit: 'px',
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1400,
    xxl: 1800
  },
  typo: {
    // eslint-disable-next-line max-len
    fontFamily: 'Roboto, Helvetica Neue, -apple-system, BlinkMacSystemFont, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif',
    fontFamilyMonospace: 'Roboto Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    baseFontSizes: {
      unit: 'rem',
      xs: 0.6,
      sm: 0.8,
      md: 1,
      lg: 1.4,
      xl: 1.8,
      xxl: 2.4
    },
    headings: {
      h1: {
        fontSize: 'xxl',
        fontWeight: 700,
        lineHeight: 1.3
      },
      h2: {
        fontSize: 'xl',
        fontWeight: 700,
        lineHeight: 1.35
      },
      h3: {
        fontSize: 'lg',
        fontWeight: 700,
        lineHeight: 1.4
      },
      h4: {
        fontSize: 'md',
        fontWeight: 700,
        lineHeight: 1.5
      },
      h5: {
        fontSize: 'sm',
        fontWeight: 700,
        lineHeight: 1.5
      },
      h6: {
        fontSize: 'xs',
        fontWeight: 700,
        lineHeight: 1.6
      }
    }
  },
  locale: 'en-UK',
  dateFormat: 'HH:mm DD/MM/YYYY',
  helpers
};

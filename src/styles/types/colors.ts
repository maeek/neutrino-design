export type NeutrinoColorScheme = 'light' | 'dark';

export type NeutrinoShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type NeutrinoPrimaryShade = {
  light: NeutrinoShade;
  default: NeutrinoShade;
  dark: NeutrinoShade;
}

export type NeutrinoColors = 'blue' |
  'green' |
  'red' |
  'yellow' |
  'orange' |
  'purple' |
  'gray' |
  'dark' |
  'light';

export type NeutrinoColorsRecord = Record<NeutrinoColors, [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
]>;

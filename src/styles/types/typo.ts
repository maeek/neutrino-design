import { CSSProperties } from 'react';
import { NeutrinoSizer } from './sizes';

export interface NeutrinoTextStyle {
  fontWeight: CSSProperties['fontWeight'];
  lineHeight: CSSProperties['lineHeight'];
  fontSize: keyof NeutrinoSizer | CSSProperties['fontSize'];
  fontFamily?: CSSProperties['fontFamily'];
}

export interface NeutrinoTextTheme {
  baseFontSizes: NeutrinoSizer;
  fontFamily: CSSProperties['fontFamily'];
  fontFamilyMonospace: CSSProperties['fontFamily'];
  lineHeight: CSSProperties['lineHeight'];

  headings: {
    h1: NeutrinoTextStyle;
    h2: NeutrinoTextStyle;
    h3: NeutrinoTextStyle;
    h4: NeutrinoTextStyle;
    h5: NeutrinoTextStyle;
    h6: NeutrinoTextStyle;
  }
}

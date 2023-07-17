import { ReactNode } from 'react';

export interface SliderMarks {
  [key: number]:
    | ReactNode
    | {
        render?: (value: number, range?: Range) => ReactNode;
        className?: string;
        style?: React.CSSProperties;
        rangeIndex?: number;
      };
}

export interface Range {
  min: number;
  max: number;
  render?: ((value: number, min: number, max: number) => ReactNode) | ReactNode;
}

import { ReactNode } from 'react';
import { SliderMarks, Range } from './SliderTypes';

export interface SliderProps {
  value?: number | [number, number];
  min: number;
  max: number;

  showStepps?: boolean;
  step?: null | number;
  renderStep?: ((value: number, index: number, values: number[]) => ReactNode) | ReactNode;

  showMarks?: boolean;
  marks?: SliderMarks;

  showRanges?: boolean;
  ranges?: Range[];

  onChange?: (value: [number, number] | number) => void;
  onAfterChange?: (value: [number, number] | number) => void;
}

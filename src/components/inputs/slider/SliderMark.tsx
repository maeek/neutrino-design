import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { Range } from './SliderTypes';

export interface SliderMarkProps {
  value: number;
  range?: Range;
  className?: string;
  children?: ReactNode;
}

export const SliderMark = forwardRef<HTMLDivElement, SliderMarkProps>((props, ref) => {
  const { children, className } = props;

  return (
    <div
      ref={ref}
      className={classNames('ne-slider-mark', className)}
    >
      {children}
    </div>
  );
});

SliderMark.displayName = 'SliderMark';

export default SliderMark;

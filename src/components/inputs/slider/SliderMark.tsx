import classNames from 'classnames';
import { forwardRef, ReactNode } from 'react';
import { Range } from './SliderTypes';

interface SliderMarkProps {
  value: number;
  range?: Range;
  className?: string;
  children?: ReactNode;
}

export const SliderMark = forwardRef((props: SliderMarkProps, ref: any) => {
  const { children, className } = props;

  return (
    <div ref={ref} className={classNames('ne-slider-mark', className)}>
      {typeof children === 'function' ? children() : children}
    </div>
  );
});

SliderMark.displayName = 'SliderMark';

export default SliderMark;

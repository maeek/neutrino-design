import {
  useState,
  CSSProperties,
  MouseEventHandler,
  useRef,
  useEffect,
  useCallback,
  TouchEventHandler,
  ReactNode
} from 'react';
import debounce from 'lodash.debounce';
import classnames from 'classnames';
import './slider.scss';

export enum SliderTypes {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

export enum SliderTooltipPosition {
  DISABLED = 'disabled',
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

export interface SliderStep {
  value: number;
  label?: ReactNode | ReactNode[] | ((v: number) => ReactNode[]);
  progressTooltip?: ReactNode | ReactNode[] | ((v: number) => ReactNode[]);
}

export interface SliderInputProps {
  onChange?: (value: number) => void;
  initValue?: number;
  axis?: SliderTypes;
  steps?: SliderStep[];
  tooltipPos?: SliderTooltipPosition;
  tooltip?: ReactNode | ReactNode[] | ((value: number) => ReactNode[]) ;
}

interface BarDimensions {
  bar: {
    width: number;
    height: number;
    top: number;
    left: number;
  };
  thumb: {
    width: number;
    height: number;
    top: number;
    left: number;
  }
}

export const SliderInput = (props: SliderInputProps) => {
  const {
    onChange,
    initValue = 0,
    axis = SliderTypes.HORIZONTAL,
    tooltipPos = SliderTooltipPosition.DISABLED,
    tooltip,
    steps
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [ isChanging, setIsChanging ] = useState(false);
  const [ position, setPosition ] = useState(0);
  const [ dimensions, setDimensions ] = useState<BarDimensions>(null);
  const [ value, setValue ] = useState(initValue);
  const stepsLength = steps?.length - 1;

  const emitChange = useRef(debounce((v) => {
    if (onChange) {
      onChange(v);
    }
  }, 250));

  const stepper = useCallback((pos: number, dms: number) => {
    if (!steps || !dimensions) {
      return pos;
    }

    const stepsValues = steps
      .map(({ value }) => value)
      .map((v, i) => 
        (v ?? Math.round(100 - (100 - i * (100 / stepsLength))))
        * Math.round(dms)
        / 100
      );
    
    return stepsValues.reduce((prev, curr) => (
      Math.abs(curr - pos) < Math.abs(prev - pos)
        ? curr
        : prev
    ));
  }, [ steps, dimensions, stepsLength ]);

  const moveThumb = useCallback((axisPos: number)  => {
    if (!dimensions) return;

    let pos;
    let restrictToBoundry;

    if (axis === SliderTypes.HORIZONTAL) {
      pos = stepper(
        axisPos - dimensions.bar.left - (dimensions.thumb.width / 2),
        dimensions.bar.width - dimensions.thumb.width
      );

      if (
        axisPos < dimensions.bar.left + dimensions.bar.width
          && axisPos > dimensions.bar.left
      ) {
        restrictToBoundry = pos;

        if (pos <= 0) {
          restrictToBoundry = 0;
        }
        else if (pos >= dimensions.bar.width - dimensions.thumb.width) {
          restrictToBoundry = dimensions.bar.width - dimensions.thumb.width;
        }
        else {
          restrictToBoundry = pos;
        }

        setPosition(restrictToBoundry);
        setValue(Math.round((restrictToBoundry / (dimensions.bar.width - dimensions.thumb.width)) * 100));
      }
    }
    else {
      pos = stepper(
        axisPos - dimensions.bar.top - (dimensions.thumb.height / 2),
        dimensions.bar.height - dimensions.thumb.height
      );

      if (
        axisPos < dimensions.bar.top + dimensions.bar.height
        && axisPos > dimensions.bar.top
      ) {
  
        if (pos <= 0) {
          restrictToBoundry = 0;
        }
        else if (pos >= dimensions.bar.height - dimensions.thumb.height) {
          restrictToBoundry = dimensions.bar.height - dimensions.thumb.height;
        }
        else {
          restrictToBoundry = pos;
        }
      }

      setPosition(restrictToBoundry);
      setValue(Math.round((restrictToBoundry / (dimensions.bar.height - dimensions.thumb.height)) * 100));
    }

  }, [ dimensions, axis, stepper ]);
  
  const handleDown: MouseEventHandler<HTMLDivElement> & TouchEventHandler<HTMLDivElement> = (e) => {
    setIsChanging(true);
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
    catch {
      console.error(e);
    }

    if (e.clientX || e.clientY) {
      moveThumb(axis === SliderTypes.HORIZONTAL
        ? e.clientX
        : e.clientY
      );
    } else {
      moveThumb(axis === SliderTypes.HORIZONTAL 
        ? e.targetTouches[ 0 ].clientX
        : e.targetTouches[ 0 ].clientY
      );
    }
  };

  const preventEvt = (e) => e.preventDefault();

  useEffect(() => {
    if (!containerRef.current || !thumbRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !thumbRef.current || isChanging) return;
  
      const thumbRect = thumbRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
  
      setDimensions({
        bar: {
          width: containerRect.width,
          height: containerRect.height,
          left: containerRect.left,
          top: containerRect.top
        },
        thumb: {
          width: thumbRect.width,
          height: thumbRect.height,
          left: thumbRect.left,
          top: thumbRect.top
        }
      });

      if (axis === SliderTypes.HORIZONTAL) setPosition(value * (containerRect.width - thumbRect.width) / 100);
      else setPosition(value * (containerRect.height - thumbRect.height) / 100);
    });

    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(thumbRef.current);

    return () => {
      if (!containerRef.current || !thumbRef.current) return;

      resizeObserver.unobserve(containerRef.current);
      resizeObserver.unobserve(thumbRef.current);
    };
  }, [ isChanging, value, axis ]);

  useEffect(() => {
    emitChange.current(value);
  }, [ value, emitChange ]);

  useEffect(() => {
    const handleUp = (e) => {
      e.preventDefault();
      setIsChanging(false);
    };

    const handleMove = (e: MouseEvent & TouchEvent) => {
      if (isChanging) {
        if (e.clientX || e.clientY) {
          moveThumb(axis === SliderTypes.HORIZONTAL
            ? e.clientX
            : e.clientY
          );
        } else {
          moveThumb(axis === SliderTypes.HORIZONTAL 
            ? e.targetTouches[ 0 ].clientX
            : e.targetTouches[ 0 ].clientY
          );
        }
      }
    };

    document.addEventListener('mousemove', handleMove as never);
    document.addEventListener('touchmove', handleMove as never);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);
    document.addEventListener('mouseleave', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove as never);
      document.removeEventListener('touchmove', handleMove as never);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
      document.removeEventListener('mouseleave', handleUp);
    };
  }, [ axis, isChanging, moveThumb ]);

  const style = axis === SliderTypes.HORIZONTAL 
    ? {
      '--x': `${position}px`,
      '--y': '0'
    } as CSSProperties
    : {
      '--x': '0',
      '--y': `${position}px`
    } as CSSProperties;

  const defaultTooltip = (
    <div className="ne-input-slider-tooltip-default">{Math.round(value)}%</div>
  );

  const stepsNode = steps?.map(({ label, value }, i) => {
    const percent = value ?? Math.round(100 - (100 - i * (100 / stepsLength)));

    return (
      <div
        key={i}
        className="ne-input-slider-bar-steps-step"
        draggable={false}
        style={{
          '--step-pos': `${percent}%`
        } as CSSProperties}
      >
        {label && (
          <div className={
            `ne-input-slider-bar-steps-step-tooltip ne-input-slider-bar-steps-step-tooltip--${tooltipPos}`
          }>
            {
              typeof label === 'function'
                ? label(percent)
                : label
            }
          </div>
        )}
      </div>
    );
  });

  const stepsTooltipProgress = steps?.find(
    (_, i) => Math.round(100 - (100 - i * (100 / stepsLength))) === Math.round(value)
  )?.progressTooltip;

  const tooltipFromSteps = steps && stepsTooltipProgress && (
    <div className="ne-input-slider-tooltip-steps">
      {
        typeof stepsTooltipProgress === 'function'
          ? stepsTooltipProgress(value)
          : stepsTooltipProgress
      }
    </div>
  );

  const classes = classnames(
    'ne-input-slider',
    `ne-input-slider--${axis}`,
    isChanging ? 'ne-input-slider--active' : ''
  );

  return (
    <div
      className={classes}
      onContextMenu={preventEvt}
    >
      <div
        className="ne-input-slider-bar"
        ref={containerRef}
        onMouseDown={handleDown}
        onTouchStart={handleDown as never}
        draggable={false}
      >
        {/* <div className="ne-input-slider-bar-selected" style={{ '--w': `${value}%` } as CSSProperties} /> */}
        <div className="ne-input-slider-bar-steps" draggable={false}>
          {stepsNode}
        </div>
        <div
          ref={thumbRef}
          className="ne-input-slider-thumb"
          style={style}
          draggable={false}
        >
          <div className={`ne-input-slider-tooltip ne-input-slider-tooltip--${tooltipPos}`}>
            {typeof tooltip === 'function' 
              ? tooltip(Math.round(value))
              : tooltip || tooltipFromSteps || defaultTooltip
            }
          </div>
        </div>
      </div>
    </div>
  );
};

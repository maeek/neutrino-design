import {
  MutableRefObject,
  useEffect,
  useRef,
  KeyboardEvent as ReactKeyboardEvent,
  CSSProperties,
  forwardRef,
  useImperativeHandle
} from 'react';
import classNames from 'classnames';
import useCheckbox from '../../../../hooks/inputs/useCheckbox';
import './checkbox.scss';

export interface CheckboxRef {
  checked: boolean;
  setChecked: any;
  element: MutableRefObject<HTMLInputElement> | null;
}

export interface CheckboxProps {
  ref?: MutableRefObject<CheckboxRef>;
  name?: string;
  value?: boolean;
  className?: string;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  onChange?: Function;
  style?: CSSProperties;
  [key: string]: any;
}

export const Checkbox = forwardRef((props: CheckboxProps, ref: any) => {
  const {
    name,
    className,
    required,
    disabled,
    readOnly,
    onChange,
    value: initValue,
    style,
    ...rest
  } = props;
  const innerRef = useRef<HTMLInputElement>(null);
  const { checked, setChecked, bind } = useCheckbox(
    initValue,
    readOnly || disabled
  );

  useEffect(() => {
    if (onChange) onChange(checked);
  }, [ onChange, checked ]);

  useImperativeHandle(ref, () => ({
    checked,
    setChecked,
    element: innerRef
  }));

  /**
   * Define behaviour for controlled component
   */
  useEffect(() => {
    if (!onChange) {
      setChecked(!!initValue);
    }
  }, [ initValue, onChange, setChecked ]);

  const onClick = () => {
    if (disabled || readOnly) return;

    setChecked(!checked);
  };

  const onSliderKeyUp = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if ([ 'Enter', ' ' ].includes(e.key)) {
      setChecked(!checked);
    }
  };

  const sliderTitle =
    (required && 'Required') ||
    (disabled && 'Checkbox disabled') ||
    (readOnly && 'Checkbox read only') ||
    '';

  const classes = classNames({
    'ne-checkbox': true,
    ...(className ? { [ className ]: true } : {})
  });

  return (
    <label
      className={classes}
      data-required={!!required}
      data-disabled={!!disabled}
      data-readonly={!!readOnly}
      data-checked={!!checked}
      htmlFor={name}
    >
      <input
        className="ne-checkbox-control"
        ref={innerRef as any}
        type="checkbox"
        name={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        role="disabled"
        {...bind}
        {...rest}
      />
      <div className="ne-checkbox-decorator">
        <div
          title={sliderTitle}
          className="ne-checkbox-decorator-slider"
          onKeyUp={onSliderKeyUp}
          onClick={onClick}
          tabIndex={0}
          role="checkbox"
          style={style}
        >
          {required && !checked && '!'}
        </div>
      </div>
    </label>
  );
});

export default Checkbox;

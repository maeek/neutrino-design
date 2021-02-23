import {
  createRef,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  KeyboardEvent
} from 'react';
import classNames from 'classnames';
import useCheckbox from '../../../../hooks/inputs/useCheckbox';
import './checkbox.scss';

interface CheckboxRef {
  checked: boolean;
  setChecked: any;
  element: MutableRefObject<HTMLInputElement> | null;
}

export interface CheckboxProps {
  /**
   * CheckboxRef interface consists of - checked: boolean, setChecked: any, element: MutableRefObject HTMLInputElement | null
   */
  ref?: MutableRefObject<CheckboxRef>;
  name?: string;
  value?: boolean;
  className?: string;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  onChange?: Function;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const {
    ref = createRef(),
    name,
    className,
    required,
    disabled,
    readOnly,
    onChange,
    value: initValue,
    ...rest
  } = props;
  const innerRef = useRef(null);
  const { checked, setChecked, bind } = useCheckbox(
    initValue,
    readOnly || disabled
  );

  useEffect(() => {
    if (onChange) onChange(checked);
  }, [onChange, checked]);

  useEffect(() => {
    if (innerRef.current) {
      (ref.current as CheckboxRef) = {
        checked,
        setChecked,
        element: innerRef.current
      };
    }
  }, [innerRef, checked, setChecked, ref]);

  const onSliderKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter' || e.code === 'Space') {
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
    ...(className ? { [className]: true } : {})
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
        className="ne-checkbox-controll"
        ref={innerRef}
        type="checkbox"
        name={name}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        {...bind}
        {...rest}
      />
      <div className="ne-checkbox-decorator">
        <div
          title={sliderTitle}
          className="ne-checkbox-decorator-slider"
          onKeyUp={onSliderKeyUp}
          tabIndex={0}
        >
          {required && !checked && '!'}
        </div>
      </div>
    </label>
  );
};

export default Checkbox;

import React, {
  HTMLAttributes,
  CSSProperties,
  forwardRef,
  MouseEvent,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef
} from 'react';
import classNames from 'classnames';
import useCheckbox from '../../../hooks/inputs/useCheckbox';
import './checkbox.scss';

export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  name?: string;

  /**
   * Provide 'checked' prop to use this component as a controlled component.
   */
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  className?: string;
  style?: CSSProperties;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export interface CheckboxRef {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  element: HTMLInputElement | null;
}

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => {
  const { name, checked: value, onChange, className, style, disabled, readOnly, required, ...rest } = props;
  const innerRef = useRef<HTMLInputElement>(null);
  const { checked, setChecked, bind } = useCheckbox(value, readOnly || disabled);

  useImperativeHandle(ref, () => ({
    checked,
    setChecked,
    element: innerRef.current
  }));

  useEffect(() => {
    if (value === undefined && onChange) {
      onChange(checked);
    }
  }, [checked, value, onChange]);

  const onClick = (e: MouseEvent) => {
    e.preventDefault();

    if (disabled || readOnly) return;

    setChecked(isChecked => !isChecked);
  };

  const onSliderKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
    if (['Enter', ' '].includes(e.key)) {
      setChecked(isChecked => !isChecked);
    }
  };

  const sliderTitle =
    (required && 'Required') || (disabled && 'Checkbox disabled') || (readOnly && 'Checkbox read only') || '';

  return (
    <label
      className={classNames('ne-checkbox', className)}
      style={style}
      htmlFor={name}
      data-required={!!required}
      data-disabled={!!disabled}
      data-readonly={!!readOnly}
      data-checked={!!checked}
    >
      <input
        name={name}
        className='ne-checkbox-control'
        type='checkbox'
        ref={innerRef}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        tabIndex={-1}
        {...bind}
        {...rest}
      />
      <div className='ne-checkbox-decorator'>
        <div
          className='ne-checkbox-decorator-slider'
          onKeyUp={onSliderKeyUp}
          onClick={onClick}
          tabIndex={0}
          role='checkbox'
          aria-checked={checked}
          title={sliderTitle}
        >
          {required && !checked && '!'}
        </div>
      </div>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

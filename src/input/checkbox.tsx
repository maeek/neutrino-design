import * as React from 'react';
import classNames from 'classnames';
import Style from './style/checkbox.scss';

export interface CheckboxProps {
  ref?: any;
  name?: string;
  className?: string | { [key: string]: boolean };
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: Function;
  initValue?: boolean;
  theme?: 'dark' | 'light';
}

export const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const {
    name,
    className,
    required,
    readOnly,
    disabled,
    onChange,
    theme,
    ref = null,
    initValue
  } = props;

  const classes = classNames(
    Style.checkbox,
    theme === 'light' ? Style.checkbox__light : Style.checkbox__dark,
    className
  );

  const changeCheckbox = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (readOnly || disabled) return;

    const newState = !value;
    setValue(newState);
    if (onChange) onChange(newState);
  };

  const innerRef = React.useRef(ref);
  const [value, setValue] = React.useState(initValue || false);

  return (
    <label onClick={(e) => e.stopPropagation()} className={classes}>
      <input
        type='checkbox'
        ref={innerRef}
        name={name}
        className={Style.checkbox_raw_element}
        required={required}
        disabled={disabled}
        checked={value}
        onChange={(e) => e.preventDefault()}
      />
      <button
        type='button'
        role='checkbox'
        aria-checked={value}
        className={Style.checkbox_decorator}
        onClick={changeCheckbox}
      />
    </label>
  );
};

export default Checkbox;

import * as React from 'react';
import classNames from 'classnames';
import Style from './style/input.scss';

export type inputTypes =
  | 'email'
  | 'hidden'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url';

export interface InputProps {
  type?: inputTypes;
  ref?: any;
  name?: string;
  className?: string | { [key: string]: boolean };
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: Function;
  placeholder?: string;
  initValue?: string;
  theme?: 'dark' | 'light';
  prefix?: React.ReactNode | React.ReactNode[];
  prefixClassName?: string | { [key: string]: boolean };
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    type,
    ref,
    name,
    className,
    required,
    disabled,
    readOnly,
    onChange,
    placeholder,
    initValue,
    prefix,
    theme,
    prefixClassName,
    ...rest
  } = props;

  const classes = classNames(
    Style.input,
    type === 'hidden' ? Style.input__hidden : null,
    prefix ? Style.input__with_prefix : null,
    theme === 'light' ? Style.input__light : Style.input__dark,
    className
  );

  const innerRef = React.useRef(ref);
  const [value, setValue] = React.useState(initValue);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const focusOnInput = () => {
    if (innerRef?.current) {
      innerRef.current.focus();
    }
  };

  return (
    <div className={Style.input_container}>
      {prefix && (
        <div
          onClick={focusOnInput}
          className={classNames(
            Style.input_prefix,
            theme === 'light'
              ? Style.input_prefix__light
              : Style.input_prefix__dark,
            prefixClassName
          )}
        >
          {prefix}
        </div>
      )}
      <input
        className={classes}
        disabled={disabled}
        onChange={onChangeHandler}
        required={required}
        readOnly={readOnly}
        ref={innerRef}
        type={type}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;

import {
  FC,
  MouseEventHandler,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  MouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
  useCallback,
  forwardRef
} from 'react';
import classNames from 'classnames';
import useInput from '../../../../hooks/inputs/useInput';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import './input.scss';

export type InputSupportedTypes = 'text' 
| 'search' 
| 'password' 
| 'email' 
| 'tel'
| 'time'
| 'url';

export interface InputRef {
  value: string;
  setValue: any;
  isValid: boolean;
  element: MutableRefObject<HTMLInputElement> | null;
}

export interface InputProps {
  type?: InputSupportedTypes;
  // ref?: MutableRefObject<InputRef>;
  name?: string;
  className?: string;
  title?: string;
  label?: ReactNode;

  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  clearButtonText?: ReactNode;

  onChange?: (value: string) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onSearchClear?: () => void;
  validate?: (text: string) => boolean;
  [key: string]: any;
}

export const Input: FC<InputProps> = forwardRef<InputRef, InputProps>((props, ref: any) => {
  const {
    type,
    name,
    className,
    title,
    value: initValue,
    placeholder,
    required,
    disabled,
    readOnly,
    onChange,
    onClick,
    onSearchClear,
    validate,
    clearButtonText = 'Clear',
    children,
    label,
    ...rest
  } = props;
  const innerRef: MutableRefObject<any> = useRef(null);
  const { value, setValue, bind, reset } = useInput(initValue || '');

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (innerRef.current && !disabled && !readOnly) innerRef.current.focus();
    if (onClick && !disabled) onClick(e);
  };

  const onSearchClearHandler = () => {
    if (!readOnly && !disabled) {
      reset();
      if (innerRef.current) innerRef.current.focus();
      if (onSearchClear) onSearchClear();
    }
  };

  const onKeySearchClearHandler = (e: ReactKeyboardEvent<HTMLSpanElement>) => {
    if (['Enter', ' '].includes(e.key)) {
      onSearchClearHandler();
    }
  };

  const validateInput = useCallback((text: string) => {
    if (validate) {
      return validate(text);
    }

    return text.trim().length > 0;
  }, [validate]);

  useEffect(() => {
    if (onChange) onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    if (innerRef.current && ref) {
      (ref.current as InputRef) = {
        value,
        setValue,
        isValid: validateInput(value),
        element: innerRef.current
      };
    }
  }, [innerRef, value, setValue, ref, validateInput]);

  const classes = classNames({
    'ne-input': true,
    ...(className ? { [className]: true } : {})
  });

  const isValid = required && validateInput(value);
  const isEmpty = value.trim().length === 0;

  const floatingLabel = <span className="ne-input-label-content">{label}</span>;

  const validIndicator = (
    <div className="ne-input-validation">
      {
        isValid 
          ? <CheckRoundedIcon className="ne-input-validation--valid" />
          : <CloseRoundedIcon className="ne-input-validation--invalid" />
      }
    </div>
  );

  const clearSearch = (
    <span
      aria-label="Clear search"
      tabIndex={0}
      onClick={onSearchClearHandler}
      onKeyUp={onKeySearchClearHandler}
      className="ne-input-search-clear"
    >
      {clearButtonText}
    </span>
  );

  return (
    <div
      className={classes}
      title={title}
      data-required={!!required}
      data-disabled={!!disabled}
      data-readonly={!!readOnly}
      data-valid={isValid}
      data-empty={isEmpty}
      onClick={onClickHandler}
    >
      <label className="ne-input-label">
        {label && !placeholder && floatingLabel}
        <input
          ref={innerRef}
          type={type === 'search' ? 'text' : type}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          className="ne-input-controll"
          {...bind}
          {...rest}
        />
        {
          required && validIndicator
        }
        {type === 'search' && !isEmpty && clearSearch}
      </label>
      {children}
    </div>
  );
});

export default Input;

import * as React from 'react';
import classNames from 'classnames';
import Style from './style/dropdown.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export interface DropdownProps extends ButtonProps {
  active: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (
  props
  // ref
) => {
  const { className, disabled, active, theme } = props;

  const classes = classNames(
    Style.buttonDropdown,
    active ? Style.buttonDropdown__active : null,
    theme === 'light'
      ? Style.buttonDropdown__light
      : Style.buttonDropdown__dark,
    disabled ? Style.buttonDropdown__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Dropdown;

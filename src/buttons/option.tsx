import * as React from 'react';
import classNames from 'classnames';
import Style from './style/option.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './basic';

export interface OptionItemProps extends ButtonProps {
  active: boolean;
}

export const OptionItem: React.FC<OptionItemProps> = (
  props
  // ref
) => {
  const { className, disabled, active } = props;

  const classes = classNames(
    Style.buttonOptionItem,
    active ? Style.buttonOptionItem__active : null,
    disabled ? Style.buttonOptionItem__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default OptionItem;

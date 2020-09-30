import * as React from 'react';
import classNames from 'classnames';
import Style from './style/cancel.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './basic';

export const Cancel: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled } = props;

  const classes = classNames(
    Style.buttonCancel,
    disabled ? Style.buttonCancel__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Cancel;

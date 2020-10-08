import * as React from 'react';
import classNames from 'classnames';
import Style from './style/close.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export const Close: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled } = props;

  const classes = classNames(
    Style.buttonClose,
    disabled ? Style.buttonClose__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Close;

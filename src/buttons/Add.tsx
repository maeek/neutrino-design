import * as React from 'react';
import classNames from 'classnames';
import Style from './style/add.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export const Add: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled } = props;

  const classes = classNames(
    Style.buttonAdd,
    disabled ? Style.buttonAdd__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Add;

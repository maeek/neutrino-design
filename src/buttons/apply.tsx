import * as React from 'react';
import classNames from 'classnames';
import Style from './style/apply.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './basic';

export const Apply: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled } = props;

  const classes = classNames(
    Style.buttonApply,
    disabled ? Style.buttonApply__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Apply;

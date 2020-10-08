import * as React from 'react';
import classNames from 'classnames';
import Style from './style/add.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export const Add: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled, theme } = props;

  const classes = classNames(
    Style.buttonAdd,
    theme === 'light' ? Style.buttonAdd__light : Style.buttonAdd__dark,
    disabled ? Style.buttonAdd__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Add;

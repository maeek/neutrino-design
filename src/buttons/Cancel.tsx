import * as React from 'react';
import classNames from 'classnames';
import Style from './style/cancel.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export const Cancel: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled, theme } = props;

  const classes = classNames(
    Style.buttonCancel,
    theme === 'light' ? Style.buttonCancel__light : Style.buttonCancel__dark,
    disabled ? Style.buttonCancel__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Cancel;

import * as React from 'react';
import classNames from 'classnames';
import Style from './style/close.scss';

// eslint-disable-next-line no-unused-vars
import Basic, { ButtonProps } from './Basic';

export const Close: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const { className, disabled, theme } = props;

  const classes = classNames(
    Style.buttonClose,
    theme === 'light' ? Style.buttonClose__light : Style.buttonClose__dark,
    disabled ? Style.buttonClose__disabled : null,
    className
  );

  return <Basic {...props} className={classes} />;
};

export default Close;

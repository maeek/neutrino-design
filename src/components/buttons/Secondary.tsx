import React from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/secondary.scss';

export const SecondaryButton = (props: ButtonProps) => {
  const classes = classNames({
    'ne-button_secondary': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return (
    <Button
      {...props}
      className={classes}
    />
  );
};

export default SecondaryButton;

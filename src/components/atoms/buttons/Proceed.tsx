// eslint-disable-next-line no-use-before-define
import React, { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/proceed.scss';

export const ProceedButton: FC<ButtonProps> = (props) => {
  const classes = classNames({
    'ne-button_proceed': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default ProceedButton;

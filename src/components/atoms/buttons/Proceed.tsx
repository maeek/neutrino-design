import { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from '.';
import './styles/proceed.scss';

export const SuccessButton: FC<ButtonProps> = (props) => {
  const classes = classNames({
    'ne-button_proceed': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default SuccessButton;

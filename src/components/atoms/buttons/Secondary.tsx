import { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/secondary.scss';

export const SecondaryButton: FC<ButtonProps> = (props) => {
  const classes = classNames({
    'ne-button_secondary': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default SecondaryButton;

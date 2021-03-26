import { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/action.scss';

export const ActionButton: FC<ButtonProps> = (props) => {
  const classes = classNames({
    'ne-button_act': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default ActionButton;

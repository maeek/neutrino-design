import { FC } from 'react';
import classnames from 'classnames';
import Button, { ButtonProps } from '.';
import './styles/action.scss';

export const ActionButton: FC<ButtonProps> = (props) => {
  const classes = classnames({
    'ne-button_act': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default ActionButton;

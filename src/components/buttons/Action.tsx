import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/action.scss';

export const ActionButton = (props: ButtonProps) => {
  const classes = classNames({
    'ne-button_act': true,
    ...(props.className ? { [ props.className ]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default ActionButton;

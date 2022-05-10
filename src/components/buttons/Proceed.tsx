// eslint-disable-next-line no-use-before-define
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/proceed.scss';

export const ProceedButton = (props: ButtonProps) => {
  const classes = classNames({
    'ne-button_proceed': true,
    ...(props.className ? { [ props.className ]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default ProceedButton;

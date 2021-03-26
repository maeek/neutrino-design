import { FC } from 'react';
import classNames from 'classnames';
import Button, { ButtonProps } from './Button';
import './styles/abort.scss';

export const AbortButton: FC<ButtonProps> = (props) => {
  const classes = classNames({
    'ne-button_abort': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default AbortButton;

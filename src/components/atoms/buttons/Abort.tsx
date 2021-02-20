import { FC } from 'react';
import classnames from 'classnames';
import Button, { ButtonProps } from '.';
import './styles/abort.scss';

export const AbortButton: FC<ButtonProps> = (props) => {
  const classes = classnames({
    'ne-button_abort': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default AbortButton;

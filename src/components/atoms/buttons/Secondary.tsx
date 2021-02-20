import { FC } from 'react';
import classnames from 'classnames';
import Button, { ButtonProps } from '.';
import './styles/secondary.scss';

export const CancelButton: FC<ButtonProps> = (props) => {
  const classes = classnames({
    'ne-button_secondary': true,
    ...(props.className ? { [props.className]: true } : {})
  });

  return <Button {...props} className={classes} />;
};

export default CancelButton;

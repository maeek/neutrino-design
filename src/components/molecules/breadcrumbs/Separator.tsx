import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './separator.scss';

export interface SeparatorProps {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

export const Separator: FC<SeparatorProps> = (props) => {
  const {
    children = '/',
    className,
    ...rest
  } = props;

  const classes = classNames('ne-breadcrumbs-separator', className);
  return (
    <li className={classes} {...rest}>
      {children}
    </li>
  );
};

export default Separator;

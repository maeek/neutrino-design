import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './separator.scss';

export interface SeparatorProps {
  children?: ReactNode;
  className?: string;
}

export const Separator: FC<SeparatorProps> = (props) => {
  const {
    children = '/',
    className
  } = props;

  const classes = classNames('ne-breadcrumbs-separator', className);
  return (
    <li className={classes}>
      {children}
    </li>
  );
};

export default Separator;

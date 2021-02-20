import { FC, ReactNode } from 'react';
import classnames from 'classnames';
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

  const classes = classnames('ne-breadcrumbs-separator', className);
  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Separator;

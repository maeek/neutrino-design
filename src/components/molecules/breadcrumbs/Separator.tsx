import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import './separator.scss';

export interface SeparatorProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Separator = (props: SeparatorProps) => {
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

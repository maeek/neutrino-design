import { ReactNode } from 'react';
import classnames from 'classnames';
import './center.scss';

export interface LayoutCenterProps {
  children: ReactNode;
  className?: string;
}

export const LayoutCenter = (props: LayoutCenterProps) => {
  const {children, className} = props;

  const classes = classnames('ne-layout-center', className);
  return (
    <div className={classes}>
      <div className="ne-layout-center-inner">
        {children}
      </div>
    </div>
  );
};

export default LayoutCenter;

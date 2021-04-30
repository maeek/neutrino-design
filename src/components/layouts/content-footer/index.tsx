import { ReactNode } from 'react';
import classnames from 'classnames';
import './content-footer.scss';

export interface LayoutContentFooterProps {
  children: ReactNode;
  footerNode: ReactNode;
  className?: string;
}

export const LayoutContentFooter = (props: LayoutContentFooterProps) => {
  const { children: content, className, footerNode } = props;
  const classes = classnames('ne-layout-content-footer', className);
  return (
    <div className={classes}>
      <div className="ne-layout-content-footer-content">
        {content}
      </div>
      {footerNode}
    </div>
  );
};

export default LayoutContentFooter;

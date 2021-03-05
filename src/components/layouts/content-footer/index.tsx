import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './content-footer.scss';
import LayoutTopContent from '../top-content';

export interface LayoutContentFooterProps {
  children: ReactNode;
  footerNode: ReactNode;
  className?: string;
}

export const LayoutContentFooter: FC<LayoutContentFooterProps> = (props) => {
  const {children: content, className, footerNode} = props;
  const topNode = <div />;
  const classes = classnames('ne-layout-top-content-footer', className);
  return (
    <div className={classes}>
      <LayoutTopContent topNode={topNode}>
        <div className="ne-layout-top-content-footer-content">
          {content}
        </div>
        {footerNode}
      </LayoutTopContent>
    </div>
  );
};

export default LayoutContentFooter;

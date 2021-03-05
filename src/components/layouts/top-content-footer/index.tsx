import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './top-content-footer.scss';
import LayoutTopContent, { LayoutTopContentProps } from '../top-content';
import LayoutContentFooter from '../content-footer';

export interface LayoutTopContentFooterProps extends LayoutTopContentProps {
  footerNode: ReactNode;
}

export const LayoutTopContentFooter: FC<LayoutTopContentFooterProps> = (props) => {
  const {children: content, className, topNode, footerNode} = props;

  const classes = classnames('ne-layout-top-content-footer', className);
  return (
    <div className={classes}>
      <LayoutTopContent topNode={topNode}>
        <LayoutContentFooter footerNode={footerNode}>
          {content}
        </LayoutContentFooter>
      </LayoutTopContent>
    </div>
  );
};

export default LayoutTopContentFooter;

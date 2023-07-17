import React, { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import LayoutContentFooter from '../content-footer';
import LayoutTopContent, { LayoutTopContentProps } from '../top-content';
import './top-content-footer.scss';

export interface LayoutTopContentFooterProps extends LayoutTopContentProps {
  footerNode: ReactNode;
  style?: CSSProperties;
}

export const LayoutTopContentFooter = (props: LayoutTopContentFooterProps) => {
  const { children: content, className, topNode, footerNode, style } = props;

  const classes = classnames('ne-layout-top-content-footer', className);
  return (
    <div
      className={classes}
      style={style}
    >
      <LayoutTopContent topNode={topNode}>
        <LayoutContentFooter footerNode={footerNode}>{content}</LayoutContentFooter>
      </LayoutTopContent>
    </div>
  );
};

export default LayoutTopContentFooter;

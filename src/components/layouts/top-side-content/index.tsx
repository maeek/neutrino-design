import { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import LayoutTopContent, { LayoutTopContentProps } from '../top-content';
import LayoutSideContent from '../side-content';
import './top-side-content.scss';

export interface LayoutTopSideContentProps extends LayoutTopContentProps {
  sideNode: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}

export const LayoutTopSideContent = (props: LayoutTopSideContentProps) => {
  const { children: content, className, topNode, sideNode, style } = props;

  const classes = classnames('ne-layout-top-side-content', className);
  return (
    <div className={classes} style={style}>
      <LayoutTopContent topNode={topNode}>
        <LayoutSideContent sideNode={sideNode}>
          {content}
        </LayoutSideContent>
      </LayoutTopContent>
    </div>
  );
};

export default LayoutTopSideContent;

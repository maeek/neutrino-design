import { ReactNode } from 'react';
import classnames from 'classnames';
import LayoutTopContent, { LayoutTopContentProps } from '../top-content';
import LayoutSideContent from '../side-content';
import './top-side-content.scss';

export interface LayoutTopSideContentProps extends LayoutTopContentProps {
  sideNode: ReactNode;
}

export const LayoutTopSideContent = (props: LayoutTopSideContentProps) => {
  const {children: content, className, topNode, sideNode} = props;

  const classes = classnames('ne-layout-top-side-content', className);
  return (
    <div className={classes}>
      <LayoutTopContent topNode={topNode}>
        <LayoutSideContent sideNode={sideNode}>
          {content}
        </LayoutSideContent>
      </LayoutTopContent>
    </div>
  );
};

export default LayoutTopSideContent;

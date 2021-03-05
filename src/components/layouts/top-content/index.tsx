import { FC, ReactNode } from 'react';
import classnames from 'classnames';
import './top-content.scss';

export interface LayoutTopContentProps {
  topNode: ReactNode;
  children: ReactNode;
  className?: string;
}

export const LayoutTopContent: FC<LayoutTopContentProps> = (props) => {
  const {children: content, className, topNode} = props;

  const classes = classnames('ne-layout-top-content', className);
  return (
    <div className={classes}>
      <div className="ne-layout-top-content-top">{topNode}</div>
      <div className="ne-layout-top-content-content">
        {content}
      </div>
    </div>
  );
};

export default LayoutTopContent;

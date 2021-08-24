import { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import './top-content.scss';

export interface LayoutTopContentProps {
  topNode: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const LayoutTopContent = (props: LayoutTopContentProps) => {
  const { children: content, className, topNode, style } = props;

  const classes = classnames('ne-layout-top-content', className);
  return (
    <div className={classes} style={style}>
      <div className="ne-layout-top-content-top">{topNode}</div>
      <div className="ne-layout-top-content-content">
        {content}
      </div>
    </div>
  );
};

export default LayoutTopContent;

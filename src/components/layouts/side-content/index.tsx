import React, { CSSProperties, ReactNode, useState } from 'react';
import classnames from 'classnames';
import './side-content.scss';

export interface LayoutSideContentProps {
  sideNode: ReactNode;
  children: ReactNode;
  className?: string;
  hideScroll?: boolean;
  fallbackToBurgerMenu?: boolean;
  style?: CSSProperties;
}

export const LayoutSideContent = (props: LayoutSideContentProps) => {
  const { children: content, className, sideNode, hideScroll, style } = props;
  const [isOver, setIsOver] = useState(false);

  const handleOnOver = () => {
    hideScroll && !isOver && setIsOver(true);
  };

  const handleOnOut = () => {
    hideScroll && isOver && setIsOver(false);
  };

  const classes = classnames('ne-layout-side-content', isOver && 'ne-layout-side-content--active', className);
  return (
    <div
      className={classes}
      style={style}
    >
      <div
        className='ne-layout-side-content-side'
        onMouseOut={handleOnOut}
        onMouseOver={handleOnOver}
        onFocus={handleOnOver}
        onBlur={handleOnOut}
      >
        {sideNode}
      </div>
      <div className='ne-layout-side-content-content'>{content}</div>
    </div>
  );
};

export default LayoutSideContent;

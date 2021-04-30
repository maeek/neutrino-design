import { ReactNode, useState } from 'react';
import classnames from 'classnames';
import './side-content.scss';

export interface LayoutSideContentProps {
  sideNode: ReactNode;
  children: ReactNode;
  className?: string;
  hideScroll?: boolean;
  fallbackToBurgerMenu?: boolean;
}

export const LayoutSideContent = (props: LayoutSideContentProps) => {
  const { children: content, className, sideNode, hideScroll } = props;
  const [ isOver, setIsOver ] = useState(false);

  const handleOnEnter = () => {
    hideScroll && !isOver && setIsOver(true);
  };

  const handleOnOut = () => {
    hideScroll && isOver && setIsOver(false);
  };

  const classes = classnames(
    'ne-layout-side-content',
    isOver && 'ne-layout-side-content--active',
    className
  );
  return (
    <div className={classes}>
      <div
        className="ne-layout-side-content-side"
        onMouseOut={handleOnOut}
        onMouseEnter={handleOnEnter}
      >
        {sideNode}
      </div>
      <div className="ne-layout-side-content-content">
        {content}
      </div>
    </div>
  );
};

export default LayoutSideContent;

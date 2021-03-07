import { FC, ReactNode, useState } from 'react';
import classnames from 'classnames';
import './side-content.scss';

export interface LayoutSideContentProps {
  sideNode: ReactNode;
  children: ReactNode;
  className?: string;
  fallbackToBurgerMenu?: boolean;
}

export const LayoutSideContent: FC<LayoutSideContentProps> = (props) => {
  const {children: content, className, sideNode} = props;
  const [isOver, setIsOver] = useState(false);
  // const [isBurger, setIsBurger] = useState(false);
  // useEffect(() => {
  // }, []);
  const handleOnOver = () => {
    setIsOver(true);
  };

  const handleOnOut = () => {
    setIsOver(false);
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
        onMouseOver={handleOnOver}
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

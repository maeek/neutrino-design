import { FC, ReactNode, useEffect } from 'react';
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
  // const [isBurger, setIsBurger] = useState(false);

  useEffect(() => {}, []);

  const classes = classnames('ne-layout-side-content', className);
  return (
    <div className={classes}>
      <div className="ne-layout-side-content-side">{sideNode}</div>
      <div className="ne-layout-side-content-content">
        {content}
      </div>
    </div>
  );
};

export default LayoutSideContent;

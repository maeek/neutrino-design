import { CSSProperties, MouseEventHandler, ReactNode, useRef } from 'react';
import classnames from 'classnames';
import './drawer.scss';
import { useDelayUnmount } from '../../../hooks/useDelayUnmount';

export interface DrawerProps {
  /**
   * State of the drawer: showed/hidden
   */
  isOpened?: boolean;
  /**
   * Show mask that will cover rest of the page
   * Clicking the mask will trigger onClose action
   */
  showMask?: boolean;
  /**
   * Action for closing the drawer
   */
  onClose?: MouseEventHandler;
  /**
   * Additional classname for the wrapper div
   */
  className?: string;
  /**
   * Contents that will be rendered inside the drawer
   */
  children?: ReactNode;
  /**
   * Animation speed in milliseconds
   */
  animationSpeed?: number;
  /**
   * Position where the drawer will be displayed
   */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /**
   * Any additional props that can be passed to drawer element
   */
  [key: string]: any;
}

export const Drawer = (props: DrawerProps) => {
  const {
    children,
    className,
    isOpened,
    onClose,
    showMask,
    animationSpeed = 200,
    position = 'right',
    style,
    ...rest
  } = props;
  const ref = useRef(null);
  const shouldRender = useDelayUnmount(!!isOpened, animationSpeed);
  const classes = classnames(
    'ne-drawer',
    isOpened && 'ne-drawer--opened',
    className
  );

  const drawerClasses = classnames(
    'ne-drawer-side',
    `ne-drawer-side-pos-${position}`,
    isOpened && 'animate'
  );

  const maskClasses = classnames(
    'ne-drawer-mask',
    isOpened && 'animate'
  );

  const joinedStyles: CSSProperties = {
    ...style,
    '--animation-speed': `${animationSpeed}ms`
  };

  return (
    <div className={classes}>
      {
        shouldRender && showMask && (
          <div
            className={maskClasses}
            onClick={onClose}
            style={{ '--animation-speed': `${animationSpeed}ms` } as CSSProperties}
          />
        )
      }
      {
        shouldRender && (
          <aside
            ref={ref}
            className={drawerClasses}
            style={joinedStyles}
            {...rest}
          >
            {children}
          </aside>
        )
      }
    </div>
  );
};

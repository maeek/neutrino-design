import React, { CSSProperties, HTMLAttributes, MouseEventHandler, ReactNode, useRef } from 'react';
import classnames from 'classnames';
import { useDelayUnmount } from '../../hooks/useDelayUnmount';
import './drawer.scss';

export interface DrawerProps extends HTMLAttributes<HTMLElement> {
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
  style?: CSSProperties;
}

export const Drawer = (props: DrawerProps) => {
  const {
    children,
    className,
    isOpened,
    onClose,
    showMask,
    animationSpeed = 0,
    position = 'right',
    style,
    ...rest
  } = props;
  const ref = useRef(null);
  const shouldRender = useDelayUnmount(!!isOpened, animationSpeed);
  const classes = classnames('ne-drawer', isOpened && 'ne-drawer--opened', className);

  const drawerClasses = classnames('ne-drawer-side', `ne-drawer-side-pos-${position}`, isOpened && 'animate');

  const maskClasses = classnames('ne-drawer-mask', isOpened && 'animate');

  const joinedStyles = {
    ...style,
    '--animation-speed': `${animationSpeed}ms`
  };

  return (
    <div className={classes}>
      {shouldRender && showMask && (
        <div
          className={maskClasses}
          onClick={onClose}
          role='presentation'
          style={{ '--animation-speed': `${animationSpeed}ms` } as CSSProperties}
        />
      )}
      {
        <aside
          ref={ref}
          className={drawerClasses}
          style={joinedStyles}
          {...rest}
        >
          {children}
        </aside>
      }
    </div>
  );
};

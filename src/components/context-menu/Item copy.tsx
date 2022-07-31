import classNames from 'classnames';
import {
  ReactNode,
  forwardRef,
  MouseEvent,
  CSSProperties,
  KeyboardEventHandler,
  useRef,
  useImperativeHandle
} from 'react';
import './item.scss';

export interface MenuItemRendererProps {
  value: unknown;
  disabled?: boolean;
}

export interface MenuItemProps {
  /**
   * Item renderer, overwrites `text`
   */
  children: ReactNode | ((props: any) => ReactNode);

  /**
   * Underlying value that will be passed to onClick event
   */
  value: unknown;

  className?: string;
  style?: CSSProperties;

  /**
   * Disables the item, preventing it from being clicked
   */
  disabled?: boolean;

  onClick?: (e: MouseEvent<HTMLLIElement>, value: unknown) => void;
  closeParentOnClick?: boolean;
  /**
   * Function to handle closing the parent
   */
  closeParentHandler?: () => void;

  onKeyDown?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>((
  props,
  ref
) => {
  const {
    children,
    value,
    className,
    closeParentHandler,
    closeParentOnClick,
    disabled,
    onClick,
    style,
    ...rest
  } = props;

  const innerRef = useRef();

  useImperativeHandle(ref, () => innerRef.current);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onClick?.(e, value);

    if (closeParentOnClick) {
      closeParentHandler?.();
    }
  };

  const classes = classNames(
    'ne-menu-item',
    {
      'ne-menu-item--disabled': disabled
    },
    className
  );

  return (
    <li
      ref={innerRef}
      className={classes}
      style={style}
      onClick={handleClick}
      {...rest}
    >
      {
        typeof children === 'function'
          ? children({ value, disabled })
          : children
      }
    </li>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;

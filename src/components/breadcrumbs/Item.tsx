import React, {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useRef,
  useState,
  HTMLAttributes
} from 'react';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import classNames from 'classnames';
import { useAccessibility } from '../../hooks';
import ContextMenu, { ContextMenuItems } from '../context-menu/Menu';
import './item.scss';

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  title?: string;
  children: ReactNode;
  className?: string;
  moreMenuItems?: ContextMenuItems[];
  onClick?: MouseEventHandler<HTMLLIElement>;
  onKeyUp?: KeyboardEventHandler;
  disabled?: boolean;
  style?: CSSProperties;
}

export const Item = (props: BreadcrumbItemProps) => {
  const { className, children, title, onClick, onKeyUp, moreMenuItems, disabled, ...rest } = props;
  const { onEnter } = useAccessibility();
  const moreMenuRef = useRef(null);
  const expandRef = useRef<HTMLSpanElement>(null);
  const [showMore, setShowMore] = useState(false);

  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (onClick && !disabled) onClick(e);
  };

  const onKeyUpHandler = (e: ReactKeyboardEvent) => {
    if (onKeyUp) onKeyUp(e);
  };

  const onClickShowMoreHandler = () => {
    setShowMore(!showMore);
  };

  const onKeyShowMoreHandler = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (['Enter', ' '].includes(e.key)) onClickShowMoreHandler();
  };

  const closeContextMenuMenu = (_: MouseEvent, isInside: boolean) => {
    if (expandRef.current) {
      expandRef.current.focus();
    }
    setShowMore(isInside);
  };

  const classes = classNames({
    'ne-breadcrumbs-item': true,
    ...(className ? { [className]: true } : {})
  });

  const menuItems = (
    <>
      <span
        role='button'
        className='ne-breadcrumbs-item-show-more'
        onClick={onClickShowMoreHandler}
        onKeyUp={onKeyShowMoreHandler}
        tabIndex={0}
        ref={expandRef}
      >
        {showMore ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
      </span>
      {showMore && (
        <ContextMenu
          closeContextMenu={closeContextMenuMenu}
          innerRef={moreMenuRef}
          items={moreMenuItems}
        />
      )}
    </>
  );

  return (
    <li
      className={classes}
      title={title}
      data-disabled={!!disabled}
      onClick={onClickHandler}
      tabIndex={0}
      onKeyUp={onEnter(onClickHandler)}
      role='menuitem'
      {...rest}
    >
      <div
        role='button'
        className='ne-breadcrumbs-item-content'
        tabIndex={disabled ? -1 : 0}
        onKeyUp={onKeyUpHandler}
      >
        {children}
      </div>
      {moreMenuItems && moreMenuItems.length > 0 && menuItems}
    </li>
  );
};

export default Item;

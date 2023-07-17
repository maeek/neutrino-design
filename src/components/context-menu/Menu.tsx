import React, {
  MouseEventHandler,
  KeyboardEventHandler,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  createRef,
  useEffect,
  useRef,
  CSSProperties,
  HTMLAttributes
} from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import Item, { ItemProps } from './Item';
import './context-menu.scss';

export interface ContextMenuItems extends ItemProps {
  text: string;
  render?:
    | ReactNode
    | ((itemRef: MutableRefObject<HTMLLIElement>, menuRef: MutableRefObject<HTMLDivElement | null>) => ReactNode);
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  closeOnClick?: boolean;
}

export interface ContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  suffixNode?: ReactNode;
  className?: string;
  items?: ContextMenuItems[];
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  showMaskOnMobile?: boolean;
  closeContextMenu?: (
    e: MouseEvent,
    clickedInsideContextMenu: boolean,
    elementRef?: MutableRefObject<HTMLDivElement | null>
  ) => void;
  style?: CSSProperties;
}

export const ContextMenu = (props: ContextMenuProps) => {
  const {
    className,
    children: prefixNode,
    suffixNode,
    items,
    innerRef = createRef(),
    closeContextMenu,
    showMaskOnMobile,
    ...rest
  } = props;
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const itemsRefs = useRef<MutableRefObject<HTMLLIElement>[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
      if (
        innerRef.current &&
        e.target !== innerRef.current &&
        !innerRef.current.contains(e.target as Node) &&
        closeContextMenu
      ) {
        closeContextMenu(e, false, innerRef);
      }
    };

    const abortController = new AbortController();

    document.addEventListener('click', handleClickOutside as unknown as EventListener, {
      signal: abortController.signal
    });
    document.addEventListener('contextmenu', handleClickOutside as unknown as EventListener, {
      signal: abortController.signal
    });
    document.addEventListener('keyup', handleClickOutside as unknown as EventListener, {
      signal: abortController.signal
    });

    return () => abortController.abort();
  }, [innerRef, closeContextMenu]);

  const handleCloseOnClick = () => {
    if (closeContextMenu) closeContextMenu({} as MouseEvent, false, innerRef);
  };

  const preventScroll: KeyboardEventHandler = e => {
    if (['ArrowDown', 'ArrowUp'].includes(e.code)) {
      e.preventDefault();
    }
  };

  const onKeyUp: (i: number) => KeyboardEventHandler = i => e => {
    if (e.code === 'ArrowDown') {
      e.preventDefault();

      if (i === itemsRefs.current.length - 1) {
        itemsRefs.current[0].current.focus();
      } else {
        itemsRefs.current[i + 1].current.focus();
      }
    }

    if (e.code === 'ArrowUp') {
      e.preventDefault();

      if (i === 0) {
        itemsRefs.current[itemsRefs.current.length - 1].current.focus();
      } else {
        itemsRefs.current[i - 1].current.focus();
      }
    }
  };

  const classes = classNames({
    'ne-context-menu': true,
    ...(className ? { [className]: true } : {})
  });

  const renderItems = items?.map((item, i) => {
    const tmpRef = itemsRefs.current[i] || createRef();
    itemsRefs.current[i] = tmpRef;

    return (
      <Item
        ref={tmpRef}
        key={item.text}
        closeHandler={handleCloseOnClick}
        onKeyUp={onKeyUp(i)}
        onKeyDown={preventScroll}
        {...item}
      >
        {typeof item.render === 'function' ? item.render(tmpRef, innerRef) : item.render}
      </Item>
    );
  });

  return (
    <div
      className={classes}
      ref={innerRef}
      onContextMenu={e => e.stopPropagation()}
      {...rest}
    >
      {isMobile && showMaskOnMobile ? (
        <div
          onClick={handleCloseOnClick}
          role='presentation'
          className='ne-context-menu-mask'
        />
      ) : null}
      <div className='ne-context-menu-wrapper'>
        {prefixNode}
        <ul className='ne-context-menu-list'>{renderItems}</ul>
        {suffixNode}
      </div>
    </div>
  );
};

export default ContextMenu;

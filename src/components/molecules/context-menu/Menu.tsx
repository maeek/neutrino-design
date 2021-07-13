import {
  MouseEventHandler,
  KeyboardEventHandler,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  createRef,
  useEffect,
  useRef
} from 'react';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import Item from './Item';
import './context-menu.scss';

export interface ContextMenuItems {
  index?: number;
  text: string;
  node?: ReactNode;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  closeOnClick?: boolean;
  [key: string]: any;
}

export interface ContextMenuProps {
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
  [key: string]: any;
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
    const handleClickOutside = (e: MouseEvent<any>) => {
      if (
        innerRef.current
        && e.target !== innerRef.current
        && !(innerRef.current as any).contains(e.target)
        && closeContextMenu
      ) {
        closeContextMenu(e, false, innerRef);
      }
    };

    document.addEventListener('click', handleClickOutside as any);
    document.addEventListener('keyup', handleClickOutside as any);
    return () => {
      document.removeEventListener('click', handleClickOutside as any);
      document.removeEventListener('keyup', handleClickOutside as any);
    };
  }, [ innerRef, closeContextMenu ]);

  const handleCloseOnClick = () => {
    if (closeContextMenu) closeContextMenu({} as MouseEvent, false, innerRef);
  };

  const onKeyUp: (i: number) => KeyboardEventHandler = (i) => (e) => {
    if (e.code === 'ArrowDown') {
      e.preventDefault();

      if (i === itemsRefs.current.length - 1) {
        itemsRefs.current[ 0 ].current.focus();
      }
      else {
        itemsRefs.current[ i + 1 ].current.focus();
      }
    }

    if (e.code === 'ArrowUp') {
      e.preventDefault();

      if (i === 0) {
        itemsRefs.current[ itemsRefs.current.length - 1 ].current.focus();
      }
      else {
        itemsRefs.current[ i - 1 ].current.focus();
      }
    }
  };

  const classes = classNames({
    'ne-context-menu': true,
    ...(className ? { [ className ]: true } : {})
  });

  const renderItems = items?.map((item, i) => {
    const tmpRef = itemsRefs.current[ i ] || createRef();
    itemsRefs.current[ i ] = tmpRef;

    return (
      <Item
        ref={tmpRef}
        key={item.index + item.text}
        closeHandler={handleCloseOnClick}
        onKeyUp={onKeyUp(i)}
        {...item}
      >
        {item.node}
      </Item>);
  });

  useEffect(() => {
    if (
      itemsRefs.current.length > 0
      && !itemsRefs.current.some((r) => r.current === document.activeElement)
    ) {
      itemsRefs.current[ 0 ].current.focus();
    }
  }, [ itemsRefs ]);

  return (
    <div className={classes} ref={innerRef} {...rest}>
      {
        isMobile && showMaskOnMobile
          ? <div onClick={handleCloseOnClick} className="ne-context-menu-mask" />
          : null
      }
      <div className="ne-context-menu-wrapper">
        {prefixNode}
        <ul className="ne-context-menu-list">
          {renderItems}
        </ul>
        {suffixNode}
      </div>
    </div>
  );
};

export default ContextMenu;

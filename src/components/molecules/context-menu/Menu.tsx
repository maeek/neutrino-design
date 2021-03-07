import {
  FC,
  MouseEventHandler,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  createRef,
  useEffect
} from 'react';
import classNames from 'classnames';
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
  className?: string;
  items?: ContextMenuItems[];
  innerRef?: MutableRefObject<HTMLDivElement | null>;
  closeContextMenu?: (e: MouseEvent, clickedInsideContextMenu: boolean, elementRef?: MutableRefObject<HTMLDivElement | null>) => void;
  [key: string]: any;
}

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const {
    className,
    children,
    items,
    innerRef = createRef(),
    closeContextMenu,
    ...rest
  } = props;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent<any>) => {
      if (
        innerRef.current &&
        e.target !== innerRef.current &&
        !(innerRef.current as any).contains(e.target) &&
        closeContextMenu
      ) {
        closeContextMenu(e, false, innerRef);
      }
    };

    document.addEventListener('click', handleClickOutside as any);
    return () => {
      document.removeEventListener('click', handleClickOutside as any);
    };
  }, [innerRef, closeContextMenu]);

  const handleCloseOnClick = () => {
    if (closeContextMenu) closeContextMenu({} as MouseEvent, false, innerRef);
  };

  const classes = classNames({
    'ne-context-menu': true,
    ...(className ? {[className]: true} : {})
  });

  return (
    <div className={classes} ref={innerRef} {...rest}>
      <div className="ne-context-menu-wrapper">
        <ul className="ne-context-menu-list">
          {items?.map((item) => (
            <Item
              key={item.index + item.text}
              closeHandler={handleCloseOnClick}
              {...item}
            >
              {item.node}
            </Item>)
          )}
        </ul>
      </div>
    </div>
  );
};

export default ContextMenu;

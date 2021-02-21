import {
  FC,
  MouseEventHandler,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  createRef,
  useEffect
} from 'react';
import classnames from 'classnames';
import Item from './Item';
import './context-menu.scss';

export interface ContextMenuItems {
  index?: number;
  text: string;
  node?: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export interface ContextMenuProps {
  children?: ReactNode;
  className?: string;
  items?: ContextMenuItems[];
  innerRef?: MutableRefObject<HTMLUListElement | null>;
  onClickOutside?: (e: MouseEvent, isWithin: boolean, elementRef?: MutableRefObject<HTMLUListElement | null>) => void;
}

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const {
    className,
    children,
    items,
    innerRef = createRef(),
    onClickOutside,
    ...rest
  } = props;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent<any>) => {
      if (
        innerRef.current &&
        e.target !== innerRef.current &&
        !(innerRef.current as any).contains(e.target) &&
        onClickOutside
      ) {
        onClickOutside(e, false, innerRef);
      }
    };

    document.addEventListener('click', handleClickOutside as any);
    return () => {
      document.removeEventListener('click', handleClickOutside as any);
    };
  }, [innerRef, onClickOutside]);

  const classes = classnames({
    'ne-context-menu': true,
    ...(className ? {[className]: true} : {})
  });

  return (
    <ul className={classes} ref={innerRef} {...rest}>
      {items?.map((item) => (
        <Item
          key={item.text}
          onClick={item.onClick}
          text={item.text}
        >
          {item.node}
        </Item>)
      )}
    </ul>
  );
};

export default ContextMenu;

import {
  FC,
  MouseEventHandler,
  MutableRefObject,
  ReactNode
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
}

export const ContextMenu: FC<ContextMenuProps> = (props) => {
  const {
    className,
    children,
    items,
    innerRef = null,
    ...rest
  } = props;

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

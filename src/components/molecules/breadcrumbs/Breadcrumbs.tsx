import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import './breadcrumbs.scss';
import Item from './Item';
import { ContextMenuItems } from '../context-menu/Menu';
import Separator from './Separator';

export interface Breadcrumb {
  text: string;
  onClick: MouseEventHandler<HTMLLIElement>;
  menuItems?: ContextMenuItems[];
}

export interface BreadcrumbsProps {
  items: Breadcrumb[];
  className?: string;
  separator?: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { items, className, separator, style } = props;

  const classes = classNames('ne-breadcrumbs', className);
  return (
    <ul className={classes} style={style}>
      {items.map(({ text, menuItems, ...item }, i, arr) => {
        const disabled = i === arr.length - 1;

        return (
          <>
            <Item
              key={text}
              disabled={disabled}
              moreMenuItems={menuItems}
              {...item}
            >
              {text}
            </Item>
            { !disabled && <Separator key={i}>{separator}</Separator> }
          </>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;

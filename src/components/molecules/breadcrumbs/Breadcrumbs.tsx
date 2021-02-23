import { FC, MouseEventHandler, ReactNode } from 'react';
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
}

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { items, className, separator } = props;

  const classes = classNames('ne-breadcrumbs', className);
  return (
    <ul className={classes}>
      {items.map((item, i, arr) => {
        const disabled = i === arr.length - 1;

        return (
          <>
            <Item
              key={item.text}
              disabled={disabled}
              moreMenuItems={item.menuItems}
            >
              {item.text}
            </Item>
            { !disabled && <Separator key={i}>{separator}</Separator> }
          </>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;

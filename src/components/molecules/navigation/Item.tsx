import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import classNames from 'classnames';
import './item.scss';

export interface NavSubItemProps {
  path?: string;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
}

export interface NavItemProps extends NavSubItemProps {
  subItems?: NavSubItemProps[];
  collapsible?: boolean;
  stickySelectionWhenCollapsed?: boolean;
}

export const NavItem: FC<NavItemProps> = (props) => {
  const {
    className,
    children,
    onClick
  } = props;

  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (onClick) onClick(e);
  };

  const classes = classNames('ne-nav-item', className);
  return (
    <li className={classes} onClick={onClickHandler}>
      {children}
    </li>
  );
};

export default NavItem;

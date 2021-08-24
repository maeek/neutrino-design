import {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useState
} from 'react';
import classNames from 'classnames';
import './item.scss';
import { Text } from '../../atoms/typography';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
export interface NavSubItemProps {
  active?: boolean;
  title?: string;
  link?: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export interface NavItemProps extends NavSubItemProps {
  subItems?: NavSubItemProps[];
  collapsible?: boolean;
  dontCollapseActive?: boolean;
}

export const NavItem = (props: NavItemProps) => {
  const {
    className,
    children,
    icon,
    active,
    subItems,
    onClick,
    collapsible,
    style
  } = props;

  const [ isExpanded, setIsExpanded ] = useState(false);

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
  };

  const onKeyUpHandler = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if ([ 'Enter', ' ' ].includes(e.key) && onClick) {
      onClick(e as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const handleExpandClick = () => setIsExpanded(!isExpanded);
  const handleExpandKey = (e: ReactKeyboardEvent<HTMLDivElement>) => [ 'Enter', ' ' ].includes(e.key)
                                                                      && setIsExpanded(!isExpanded);

  const iconNode = icon && <span className="ne-nav-item-content-icon">{icon}</span>;
  const subItemsNode = subItems && subItems.length > 0 && isExpanded && (
    <ul className="ne-nav-item-sub">
      {subItems.map((subItem) => subItem)}
    </ul>
  );
  const expandNode = (
    <div className="ne-nav-item-content-expand" onClick={handleExpandClick} onKeyUp={handleExpandKey} tabIndex={0}>
      {isExpanded && <ExpandLessRoundedIcon /> || <ExpandMoreRoundedIcon />}
    </div>
  );

  const classes = classNames(
    'ne-nav-item',
    active && 'ne-nav-item--active',
    className
  );
  return (
    <li className={classes} data-active={active} style={style}>
      <div className="ne-nav-item-content">
        <div className="ne-nav-item-content-wrapper" onClick={onClickHandler} onKeyUp={onKeyUpHandler} tabIndex={0}>
          {iconNode}
          <Text className="ne-nav-item-content-children">
            {children}
          </Text>
        </div>
        {collapsible && expandNode}
      </div>
      {subItemsNode}
    </li>
  );
};

export default NavItem;

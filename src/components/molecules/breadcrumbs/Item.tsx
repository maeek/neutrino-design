import {
  FC,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import classnames from 'classnames';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ContextMenu, { ContextMenuItems } from '../context-menu/Menu';
import './item.scss';

export interface BreadcrumbItemProps {
  title?: string;
  children: ReactNode;
  className?: string;
  moreMenuItems?: ContextMenuItems[];
  onClick?: MouseEventHandler<HTMLLIElement>;
  onKeyUp?: KeyboardEventHandler;
  disabled?: boolean;
}

export const Item: FC<BreadcrumbItemProps> = (props) => {
  const {
    className,
    children,
    title,
    onClick,
    onKeyUp,
    moreMenuItems,
    disabled,
    ...rest
  } = props;

  const moreMenuRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    if (onClick && !disabled) onClick(e);
  };

  const onKeyUpHandler = (e: KeyboardEvent) => {
    if (onKeyUp) onKeyUp(e);
  };

  const onClickShowMoreHandler = (e: MouseEvent<HTMLLIElement>) => {
    setShowMore(!showMore);
  };

  const onKeyShowMoreHandler = (e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') onClickShowMoreHandler(e as any);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showMore &&
        moreMenuRef.current &&
        e.target !== moreMenuRef.current &&
        !(moreMenuRef.current as any).contains(e.target)
      ) {
        setShowMore(!showMore);
      }
    };

    document.addEventListener('click', handleClickOutside as any);
    return () => {
      document.removeEventListener('click', handleClickOutside as any);
    };
  }, [showMore, moreMenuRef]);

  const classes = classnames({
    'ne-breadcrumbs-item': true,
    ...(className ? {[className]: true} : {})
  });

  const menuItems = (
    <>
      <span
        className="ne-breadcrumbs-item-show-more"
        onClick={onClickShowMoreHandler}
        onKeyUp={onKeyShowMoreHandler}
        tabIndex={0}
      >
        {
          showMore ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />
        }
      </span>
      { showMore && <ContextMenu innerRef={moreMenuRef} items={moreMenuItems} />}
    </>
  );

  return (
    <li
      className={classes}
      title={title}
      data-disabled={!!disabled}
      onClick={onClickHandler}
      {...rest}
    >
      <div className="ne-breadcrumbs-item-content" tabIndex={0} onKeyUp={onKeyUpHandler}>
        {children}
      </div>
      {
        moreMenuItems && moreMenuItems.length > 0 && menuItems
      }
    </li>
  );
};

export default Item;

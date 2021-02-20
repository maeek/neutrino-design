import classnames from 'classnames';
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode
} from 'react';
import './item.scss';

export interface ItemProps {
  index?: number;
  text: string;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  disabled?: boolean;
}

export const Item: FC<ItemProps> = (props) => {
  const {
    children,
    onClick,
    className,
    text,
    disabled,
    ...rest
  } = props;


  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (onClick && !disabled) onClick(e);
  };

  const onKeyUpHandler = (e: KeyboardEvent) => {
    onClickHandler(e as any);
  };

  const classes = classnames({
    'ne-context-menu-item': true,
    ...(className ? {[className]: true} : {})
  });

  return (
    <li
      className={classes}
      onClick={onClickHandler}
      onKeyUp={onKeyUpHandler}
      tabIndex={0}
      title={text}
      data-disabled={!!disabled}
      {...rest}
    >
      {children || text}
    </li>
  );
};

export default Item;

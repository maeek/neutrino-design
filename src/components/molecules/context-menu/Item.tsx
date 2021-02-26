import classNames from 'classnames';
import {
  FC,
  KeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode
} from 'react';
import { Text } from '../../atoms/typography';
import './item.scss';

export interface ItemProps {
  index?: number;
  text: string;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  closeOnClick?: boolean;
  closeHandler?: Function;
  disabled?: boolean;
}

export const Item: FC<ItemProps> = (props) => {
  const {
    children,
    onClick,
    className,
    text,
    disabled,
    closeOnClick,
    closeHandler,
    ...rest
  } = props;


  const onClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    if (closeOnClick && closeHandler) {
      closeHandler();
    }
    if (onClick && !disabled) {
      onClick(e);
    }
  };

  const onKeyUpHandler = (e: KeyboardEvent) => {
    if (['Enter', 'Space'].includes(e.code)) onClickHandler(e as any);
  };

  const classes = classNames({
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
      <Text className="ne-context-menu-item-text">
        {children || text}
      </Text>
    </li>
  );
};

export default Item;

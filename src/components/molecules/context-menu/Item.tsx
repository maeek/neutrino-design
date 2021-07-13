import classNames from 'classnames';
import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  forwardRef,
  KeyboardEventHandler
} from 'react';
import { Text } from '../../atoms/typography';
import './item.scss';

export interface ItemProps {
  index?: number;
  text: string;
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
  closeOnClick?: boolean;
  closeHandler?: Function;
  disabled?: boolean;
  onKeyUp?: KeyboardEventHandler;
  [key: string]: any;
}

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    children,
    onClick,
    className,
    text,
    disabled,
    closeOnClick,
    closeHandler,
    icon,
    iconPosition = 'right',
    onKeyUp,
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

  const onKeyUpHandler = (e: ReactKeyboardEvent) => {
    if ([ 'Enter', ' ' ].includes(e.key)) onClickHandler(e as any);

    if(onKeyUp) onKeyUp(e); 
  };

  const iconNode = icon && (
    <span className={`ne-context-menu-item-icon ne-context-menu-item-icon--${iconPosition}`}>
      {icon}
    </span>
  );

  const classes = classNames({
    'ne-context-menu-item': true,
    ...(className ? { [ className ]: true } : {})
  });

  return (
    <li
      ref={ref}
      className={classes}
      onClick={onClickHandler}
      onKeyUp={onKeyUpHandler}
      tabIndex={0}
      title={text}
      data-disabled={!!disabled}
      {...rest}
    >
      {iconPosition === 'left' && iconNode}
      {children || <Text className="ne-context-menu-item-text">{text}</Text>}
      {iconPosition === 'right' && iconNode}
    </li>
  );
});

export default Item;

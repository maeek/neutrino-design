import React, { ReactNode, MouseEventHandler, CSSProperties, forwardRef, DragEventHandler } from 'react';
import { CloseRounded } from '@material-ui/icons';
import classNames from 'classnames';
import { useAccessibility } from '../../hooks/useAccessibility';
import './styles/tab.scss';

export interface TabProps {
  index?: number;
  children: ReactNode;
  title: ReactNode;
  active?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  onClick?: MouseEventHandler;
  onClose?: MouseEventHandler;
  onDrag?: DragEventHandler;
  onDrop?: DragEventHandler;
  style?: CSSProperties;
  className?: string;
  type?: 'compact' | 'default';
}

export const Tab = forwardRef<HTMLLIElement | null, TabProps>((props, ref) => {
  const {
    index,
    title,
    disabled = false,
    active,
    onClick,
    onClose,
    onDrag,
    onDrop,
    draggable,
    style,
    className,
    type
  } = props;
  const { onEnterOrSpace, onEnter } = useAccessibility();

  const onCloseClick: MouseEventHandler = e => {
    if (disabled) return;

    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <li
      ref={ref}
      className={classNames(
        'ne-tab',
        `ne-tab--${type}`,
        {
          'ne-tab--disabled': disabled,
          'ne-tab--active': active
        },
        className
      )}
      style={style}
      onClick={disabled ? undefined : onClick}
      onKeyUp={disabled ? undefined : onEnterOrSpace(onClick)}
      tabIndex={disabled ? -1 : 0}
      onDragStart={onDrag}
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
      role='tab'
      draggable={draggable}
      title={`${typeof title === 'string' ? title : undefined}${disabled && ' (Disabled)'}`}
      data-index={index}
    >
      <div className='ne-tab-title'>{title}</div>
      {onClose && !disabled && (
        <div
          role='button'
          className='ne-tab-close'
          title='Close tab'
          onClick={onCloseClick}
          tabIndex={0}
          onKeyUp={onEnter(onCloseClick)}
        >
          <CloseRounded />
        </div>
      )}
    </li>
  );
});

Tab.displayName = 'Tab';

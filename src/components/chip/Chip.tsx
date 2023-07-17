import React, { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import { CloseRounded } from '@material-ui/icons';
import classNames from 'classnames';
import { useAccessibility } from '../../hooks';
import './chip.scss';

export interface ChipProps {
  icon?: ReactNode;
  children?: ReactNode;
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple';
  size: 'small' | 'medium' | 'large';
  deletable?: boolean;
  onDelete?: MouseEventHandler;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type?: 'round' | 'rounded' | 'square';
  style?: CSSProperties;
  className?: string;
}

export const Chip = (props: ChipProps) => {
  const {
    type = 'rounded',
    icon,
    color,
    size = 'medium',
    children,
    deletable = false,
    onDelete,
    onClick,
    style,
    className,
    disabled = false
  } = props;
  const { onEnter } = useAccessibility();

  const classes = classNames(
    'ne-chip',
    `ne-chip--${type}`,
    'ne-chip--color-primary',
    `ne-chip--color-${color}`,
    `ne-chip--size-${size}`,
    {
      'ne-chip--disabled': disabled,
      'ne-chip--deletable': deletable,
      'ne-chip--icon': !!icon
    },
    className
  );

  const onDeleteHandler: MouseEventHandler = e => {
    e.stopPropagation();

    if (onDelete && !disabled && deletable) {
      onDelete(e);
    }
  };

  return (
    <div
      className={classes}
      style={style}
      onClick={onClick}
      tabIndex={disabled ? -1 : 0}
      role='button'
      onKeyDown={onEnter(onClick)}
    >
      {icon && <span className='ne-chip-icon'>{icon}</span>}
      <span className='ne-chip-content'>{children}</span>
      {deletable && (
        <button
          className='ne-chip-delete'
          onClick={onDeleteHandler}
          disabled={disabled}
        >
          <CloseRounded />
        </button>
      )}
    </div>
  );
};

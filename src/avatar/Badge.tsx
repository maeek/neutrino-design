/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames';
import Avatar, { AvatarProps } from './Base';
import Style from './badge.scss';

export interface BadgeEnhancedProps {
  badgeType?: 'number' | 'icon';
  avatarClassName?: string;
  indicator: string | React.ReactNode;
  indicatorOnClick: React.MouseEventHandler<HTMLSpanElement>;
}

export type BadgeProps = Partial<BadgeEnhancedProps & AvatarProps>;

export const DEFAULT_DIMENSIONS = 30;

export const Badge = (props: BadgeProps) => {
  const {
    type = 'square',
    className,
    src,
    text,
    avatarClassName,
    onClick,
    indicatorOnClick,
    children,
    indicator,
    options,
    ...rest
  } = props;

  const classes = classNames(Style.badge, className);
  const regionClasses = classNames(
    Style.badge__region,
    type === 'circle' ? Style.badge__region_circle : Style.badge__region_square,
    indicator ? Style.badge__region_not_empty : null,
    className && `${className}__region`
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      (onClick as React.MouseEventHandler<HTMLDivElement>)(e);
    }
  };

  const handleIndicatorClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (indicatorOnClick) {
      e.stopPropagation();
      (indicatorOnClick as React.MouseEventHandler<HTMLDivElement>)(e);
    }
  };

  const renderBadge = () => {
    const indicatorClasses = classNames(
      Style.badge__indicator,
      type === 'circle' ? Style.badge__indicator_circle : null
    );
    const restSquareDiagonal = options?.size?.width
      ? (1 / 2) * (options?.size?.width * Math.sqrt(2) - options?.size?.width)
      : -5;
    return (
      <div
        className={indicatorClasses}
        style={
          (type === 'circle' && {
            bottom: `${restSquareDiagonal - 8}px`,
            right: `${restSquareDiagonal - 8}px`
          }) ||
          {}
        }
      >
        {indicator && (
          <span
            onClick={handleIndicatorClick}
            className={Style.badge__indicator__content}
          >
            {indicator}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className={classes} onClick={handleClick}>
      <div
        className={regionClasses}
        data-width={(options?.size?.width || DEFAULT_DIMENSIONS) + 'px'}
        data-height={(options?.size?.height || DEFAULT_DIMENSIONS) + 'px'}
      >
        {children || (
          <Avatar
            type={type}
            src={src}
            text={text}
            className={avatarClassName}
            options={options}
            {...rest}
          />
        )}
      </div>
      {renderBadge()}
    </div>
  );
};

export default Badge;

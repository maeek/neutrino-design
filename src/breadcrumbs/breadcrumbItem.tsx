import React from 'react';
import Separator from './breadcrumbSeparator';
import classNames from 'classnames';
import Style from './breadcrumbs.scss';

export interface BreadcrumbItemProps {
  text?: string;
  href?: string;
  children?: React.ReactNode;
  rel?: string;
  anchorTarget?: string;

  theme: 'light' | 'dark';
  separator?: boolean;
  separatorNode?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (
  props: BreadcrumbItemProps
) => {
  const {
    text,
    href,
    className,
    rel,
    anchorTarget,
    children,
    theme = 'dark',
    onClick,
    separator,
    separatorNode,
    ...rest
  } = props;
  const classes = classNames(
    Style.breadcrumbItem,
    theme === 'light'
      ? Style.breadcrumbItem__light
      : Style.breadcrumbItem__dark,
    className
  );

  const clickHandler: React.MouseEventHandler<HTMLAnchorElement> = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLAnchorElement>)(e);
    }
  };

  return (
    <li className={Style.breadcrumbItem_element}>
      <a
        className={classes}
        href={href}
        onClick={clickHandler}
        title={text}
        rel={rel}
        target={anchorTarget}
        {...rest}
      >
        {children}
      </a>
      {separator && <Separator theme={theme}>{separatorNode}</Separator>}
    </li>
  );
};

export default BreadcrumbItem;

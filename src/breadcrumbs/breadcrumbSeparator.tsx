import React from 'react';
import Style from './breadcrumbs.scss';
import classNames from 'classnames';

interface BreadcrumbSeparatorProps {
  className?: string;
  children?: React.ReactNode;
  theme: 'light' | 'dark';
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = (
  props: BreadcrumbSeparatorProps
) => {
  const { className, children, theme = 'dark', ...rest } = props;
  const classes = classNames(
    Style.breadcrumbSeparator,
    theme === 'light'
      ? Style.breadcrumbSeparator_light
      : Style.breadcrumbSeparator_dark,
    className
  );

  return (
    <span className={classes} {...rest}>
      {children || '/'}
    </span>
  );
};

export default BreadcrumbSeparator;

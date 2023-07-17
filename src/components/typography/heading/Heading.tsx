import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './heading.scss';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  style?: CSSProperties;
}

export const Heading = (props: HeadingProps) => {
  const { children, className, level = 1, ...rest } = props;

  const classes = classNames('ne-typo', 'ne-typo-heading', `ne-typo-heading-level-${level}`, className);

  switch (level) {
    case 2:
      return (
        <h2
          className={classes}
          {...rest}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={classes}
          {...rest}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={classes}
          {...rest}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5
          className={classes}
          {...rest}
        >
          {children}
        </h5>
      );
    default:
      return (
        <h1
          className={classes}
          {...rest}
        >
          {children}
        </h1>
      );
  }
};

export default Heading;

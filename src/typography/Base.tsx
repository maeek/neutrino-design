import * as React from 'react';
import classNames from 'classnames';
import Style from './style/base.scss';

export interface BaseTypoProps {
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  theme: 'light' | 'dark';
}

export const Basic: React.FC<BaseTypoProps> = (props) => {
  const { theme, title, children, style, className, ...rest } = props;
  const classes = classNames(
    Style.baseTypo,
    theme === 'light' ? Style.baseTypo__light : Style.baseTypo__dark,
    className
  );

  return (
    <span style={style} className={classes} title={title} {...rest}>
      {children}
    </span>
  );
};

export default Basic;

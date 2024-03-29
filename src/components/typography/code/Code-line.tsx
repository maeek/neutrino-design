import React, { CSSProperties, HTMLAttributes, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { Text } from '../';
import './code-line.scss';

export interface CodeLineProps extends HTMLAttributes<HTMLPreElement> {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLPreElement>) => void;
  wrap?: boolean;
  highlight?: boolean;
  style?: CSSProperties;
}

export const CodeLine = (props: CodeLineProps) => {
  const { children: code, className, onClick, wrap = true, highlight, ...rest } = props;

  const classes = classNames(
    'ne-typo',
    'ne-typo-code-line-content',
    wrap && 'ne-typo-code-line-content--wrap',
    className
  );

  return (
    <pre
      className={classes}
      onClick={onClick}
      role='presentation'
      {...rest}
    >
      <Text
        highlight={highlight}
        monospace
      >
        {code}
      </Text>
    </pre>
  );
};

export default CodeLine;

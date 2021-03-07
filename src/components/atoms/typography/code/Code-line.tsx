import classNames from 'classnames';
import { FC, MouseEvent } from 'react';
import './code-line.scss';
import { Text } from '../';

export interface CodeLineProps {
  children: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLPreElement>) => void;
  wrap?: boolean;
  highlight?: boolean;
  [key: string]: any;
}

export const CodeLine: FC<CodeLineProps> = (props) => {
  const {
    children: code,
    className,
    onClick,
    wrap = true,
    highlight,
    ...rest
  } = props;

  const classes = classNames(
    'ne-typo', 'ne-typo-code-line-content',
    wrap && 'ne-typo-code-line-content--wrap',
    className
  );

  return <pre className={classes} onClick={onClick} {...rest}>
    <Text highlight={highlight} monospace>{code}</Text>
  </pre>;
};

export default CodeLine;

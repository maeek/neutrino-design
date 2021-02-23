import classNames from 'classnames';
import { FC } from 'react';
import './code-line.scss';

export interface CodeLineProps {
  children: string;
  className?: string;
}

export const CodeLine: FC<CodeLineProps> = (props) => {
  const {
    children: code,
    className,
    ...rest
  } = props;

  const classes = classNames(
    'ne-typo', 'ne-typo-code-line-content',
    className
  );

  return <pre className={classes} {...rest}>{code}</pre>;
};

export default CodeLine;

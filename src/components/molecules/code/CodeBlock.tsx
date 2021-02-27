import { FC } from 'react';
import classNames from 'classnames';
import { Code, CodeProps } from './Code';
import './code.scss';

export const CodeBlock: FC<CodeProps> = (props) => {
  const {
    children: code = '',
    className,
    ...rest
  } = props;

  const classes = classNames(
    'ne-typo', 'ne-typo-code', 'ne-typo-code--block',
    className
  );

  return (
    <Code className={classes} {...rest}>{code}</Code>
  );
};

export default CodeBlock;

import classNames from 'classnames';
import { Code, CodeProps } from './Code';
import './codeblock.scss';

export const CodeBlock = (props: CodeProps) => {
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

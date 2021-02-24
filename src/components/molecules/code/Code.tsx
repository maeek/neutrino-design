import { FC } from 'react';
import classNames from 'classnames';
import CodeLine from '../../atoms/typography/code/Code-line';
import './code.scss';

export interface CodeProps {
  children: string;
  className?: string;
  numbers?: boolean;
}

export const Code: FC<CodeProps> = (props) => {
  const {
    children: code,
    className,
    numbers,
    ...rest
  } = props;

  const classes = classNames(
    'ne-typo', 'ne-typo-code',
    className
  );

  return (
    <code className={classes} {...rest}>
      {
        code.split('\n')
          .map((line, i) => (
            <span className="ne-typo-code-line">
              {numbers && <span className="ne-typo-code-line-number">{i + 1}</span>}
              <CodeLine>{line}</CodeLine>
            </span>
          ))
      }
    </code>
  );
};

export default Code;

import { CSSProperties, MouseEvent } from 'react';
import classNames from 'classnames';
import CodeLine from '../../atoms/typography/code/Code-line';
import './code.scss';

export interface CodeProps {
  children: string;
  className?: string;
  numbers?: boolean;
  onLineClick?: (line: string, lineNumber: number, e: MouseEvent<HTMLSpanElement>) => void
  onNumberClick?: (line: string, lineNumber: number, e: MouseEvent<HTMLSpanElement>) => void
  style?: CSSProperties;
}

export const Code = (props: CodeProps) => {
  const {
    children: code,
    className,
    numbers,
    onNumberClick,
    onLineClick,
    ...rest
  } = props;

  const onNumberClickHandler = (line: string, num: number) => (e: MouseEvent<HTMLSpanElement>) => {
    if (onNumberClick) onNumberClick(line, num, e);
  };

  const onLineClickHandler = (line: string, num: number) => (e: MouseEvent<any>) => {
    if (onLineClick) onLineClick(line, num, e);
  };

  const classes = classNames(
    'ne-typo', 'ne-typo-code',
    className
  );

  return (
    <code className={classes} {...rest}>
      {
        code.split('\n')
          .map((line, i) => (
            <span key={line} className="ne-typo-code-line">
              {
                numbers && (
                  <span onClick={onNumberClickHandler(line, i)} className="ne-typo-code-line-number">{i + 1}</span>
                )
              }
              <CodeLine onClick={onLineClickHandler(line, i)}>{line}</CodeLine>
            </span>
          ))
      }
    </code>
  );
};

export default Code;

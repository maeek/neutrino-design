import classNames from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './text.scss';

export type TextType = 'primary' |
'secondary' |
'warning' |
'danger' |
'success';

export interface TextProps {
  type?: TextType;
  children: ReactNode;
  className?: string;
  monospace?: boolean;
  disabled?: boolean;
  strong?: boolean;
  underline?: boolean;
  highlight?: boolean;
  lineThrough?: boolean;
  link?: string;
  pre?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}

export const Text = (props: TextProps) => {
  const {
    type = 'primary',
    children,
    className,
    pre,
    strong,
    underline,
    lineThrough,
    link,
    highlight,
    monospace,
    disabled,
    ...rest
  } = props;

  const classes = classNames(
    'ne-typo', 'ne-typo-text',
    `ne-typo-text--${type}`,
    disabled && 'ne-typo-text--disabled',
    highlight && 'ne-typo-text--highlight',
    monospace && 'ne-typo-text--mono',
    strong && 'ne-typo-text--strong',
    underline && 'ne-typo-text--underline',
    link && 'ne-typo-text--link',
    lineThrough && 'ne-typo-text--delete',
    pre && 'ne-typo-text--pre',
    className
  );

  const linkType = (
    <a href={link} className={classes} {...rest}>
      {children}
    </a>
  );

  return (
    link && linkType || (
      <span className={classes} {...rest}>
        {children}
      </span>
    )
  );
};

export default Text;

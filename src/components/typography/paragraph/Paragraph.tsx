import React, { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import Text from '../text/Text';
import './paragraph.scss';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
  pre?: boolean;
  style?: CSSProperties;
}

export const Paragraph = (props: ParagraphProps) => {
  const { children, className, pre, ...rest } = props;

  const classes = classNames('ne-typo', 'ne-typo-paragraph', pre && 'ne-typo-paragraph--pre', className);

  return (
    <p
      className={classes}
      {...rest}
    >
      <Text>{children}</Text>
    </p>
  );
};

export default Paragraph;

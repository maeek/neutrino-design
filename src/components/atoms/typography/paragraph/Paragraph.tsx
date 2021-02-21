import classnames from 'classnames';
import { FC, ReactNode } from 'react';
import Text from '../text';
import './paragraph.scss';

export interface ParagraphProps {
  children: ReactNode;
  className?: string;
  pre?: boolean;
}

export const Paragraph: FC<ParagraphProps> = (props) => {
  const {
    children,
    className,
    pre,
    ...rest
  } = props;

  const classes = classnames(
    'ne-typo', 'ne-typo-paragraph',
    pre && 'ne-typo-paragraph--pre',
    className
  );

  return (
    <p className={classes} {...rest}>
      <Text>{children}</Text>
    </p>
  );
};

export default Paragraph;

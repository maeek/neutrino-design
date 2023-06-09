import classNames from 'classnames';
import { ReactNode } from 'react';
import { Line, Link, Mention } from './useMessageParser';
import './styles/bubble-content.scss';

export type AdvancedContentType = {
  rawText: string;
  lines: Line[];
  links: Link[];
  mentions: Mention[];
};
export type DefaultContentType = 'text';
export type ContentType = DefaultContentType | 'image' | 'file' | 'video' | 'audio' | 'sticker';

export interface BubbleContentProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ContentType;
  content?: ReactNode;
  bubbleType?: 'sender' | 'recipient';
  className?: string;
}

export const BubbleContent = (props: BubbleContentProps) => {
  const { type, content, className, bubbleType, ...rest } = props;

  const contentNode: { [key in ContentType]: ReactNode} = {
    text: content,
    image: content,
    file: content,
    video: content,
    audio: undefined,
    sticker: undefined
  };

  const classes = classNames(
    'ne-bubble-content',
    bubbleType === 'recipient'
      ? 'ne-bubble-content--recipient'
      : 'ne-bubble-content--sender',
    className
  );

  return (
    <div className={classes} {...rest}>
      {contentNode[ type ]}
    </div>
  );
};

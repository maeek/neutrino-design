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

export interface BubbleContent {
  type: ContentType;
  content?: ReactNode;
  bubbleType?: 'sender' | 'recipient';
  className?: string;
}

export const BubbleContent = (props: BubbleContent) => {
  const { type, content, className, bubbleType } = props;

  const contentNode = {
    text: content
  };

  const classes = classNames(
    'ne-bubble-content',
    bubbleType === 'recipient'
      ? 'ne-bubble-content--recipient'
      : 'ne-bubble-content--sender',
    className
  );

  return (
    <div className={classes}>
      {contentNode[ type ]}
    </div>
  );
};

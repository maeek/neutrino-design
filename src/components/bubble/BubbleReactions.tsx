import React, { ReactNode } from 'react';
import classNames from 'classnames';
import './styles/bubble-reactions.scss';

export interface Reaction {
  id: string;
  icon: string | ReactNode;
  type?: 'utf-8';
  addedTimestamp?: number | string | Date;
  addedBy?: string;
}

export interface BubbleReactionsProps {
  className?: string;
  showCount?: boolean;
  reactions?: Reaction[];
  onReact?: (reaction: Reaction, allReactions: Reaction[]) => void;
  onReactRemove?: (reactionId: string, allReactions: Reaction[]) => void;
}

export const BubbleReactions = (props: BubbleReactionsProps) => {
  const { className } = props;

  const classes = classNames('ne-bubble-reactions', className);

  return (
    <div className={classes}>
      <div className='ne-bubble-reactions-container'></div>
      <div className='ne-bubble-reactions-counter'></div>
      {/* <EmojiQuickSelector quickAccessEmojis={[
        '😀',
        '🤯',
        '🥸',
        '💣',
        '🥺',
        '❤'
      ]} /> */}
    </div>
  );
};

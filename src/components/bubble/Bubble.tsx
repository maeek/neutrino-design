import {  CSSProperties, ReactNode, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { BubbleContent, ContentType } from './BubbleContent';
import { BubbleAction, BubbleActions } from './BubbleActions';
import { BubbleTimestamp } from './BubbleTimestamp';
import { BubbleAvatar, BubbleType } from './BubbleAvatar';
import { BubbleReactions, Reaction } from './BubbleReactions';
import './styles/bubble.scss';

export interface BubbleProps {
  sender?: string;
  type?: BubbleType;
  avatar?: string | ReactNode | null;
  onAvatarInteraction?: (event: MouseEvent | KeyboardEvent) => void;

  showReactions?: boolean;
  reactions?: Reaction[];
  onReact?: (reaction: Reaction, allReactions: Reaction[]) => void;

  timestamp: string | number | Date | null;
  isRemoved?: boolean;

  locked?: boolean;
  actions?: BubbleAction[];

  className?: string;
  style?: CSSProperties;

  contentType?: ContentType;
  content?: ReactNode;

  inBulk?: boolean;
  isFirstInBulk?: boolean;
  isLastInBulk?: boolean;
}

export const Bubble = (props: BubbleProps) => {
  const {
    className,
    style,
    sender,
    type = 'sender',
    avatar,
    showReactions,
    reactions,
    onReact,
    timestamp = new Date().getTime(),
    isRemoved = false,
    locked,
    actions = [],
    contentType = 'text',
    content,
    inBulk,
    isFirstInBulk,
    isLastInBulk
  } = props;

  const classes = classNames(
    'ne-bubble',
    type === 'recipient' ? 'ne-bubble--recipient' : 'ne-bubble--sender',
    inBulk && 'ne-bubble--bulked',
    isFirstInBulk && 'ne-bubble--first-in-bulked',
    isLastInBulk && 'ne-bubble--last-in-bulked',
    className
  );

  const avatarNode = type === 'recipient' && avatar
    ? (
      <BubbleAvatar
        avatar={avatar}
        inBulk={inBulk}
        isLastInBulk={isLastInBulk}
        sender={sender}
        type={type}
      />
    ) : null;

  const timestampNode = (
    <BubbleTimestamp timestamp={timestamp} isLastInBulk={isLastInBulk} inBulk={inBulk} />
  );

  return (
    <div className={classes} style={style}>
      <div className="ne-bubble-row">
        {avatarNode}

        <div className="ne-bubble-content-wrapper">
          {/* {inBulk && !isLastInBulk ? timestampNode : null} */}
          <div className='ne-bubble-content-row'>
            <BubbleContent
              bubbleType={type}
              type={contentType}
              content={content}
            />
            <BubbleActions actions={actions} />
          </div>
        </div>
      </div>
      <div className="ne-bubble-row">
        <BubbleReactions reactions={reactions} onReact={onReact} />
      </div>
      <div className="ne-bubble-row">
        {!inBulk || isLastInBulk ? timestampNode : null}
      </div>
    </div>
  );
};

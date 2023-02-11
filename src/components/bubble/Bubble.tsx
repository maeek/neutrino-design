import {
  CSSProperties,
  ReactNode,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent,
  useState,
  useRef,
  useEffect
} from 'react';
import classNames from 'classnames';
import { BubbleContent, ContentType } from './BubbleContent';
import { BubbleAction, BubbleActions } from './BubbleActions';
import { BubbleTimestamp } from './BubbleTimestamp';
import { BubbleAvatar, BubbleType } from './BubbleAvatar';
import { BubbleReactions, Reaction } from './BubbleReactions';
import { useMediaQuery } from 'react-responsive';
import './styles/bubble.scss';

export interface BubbleProps {
  sender?: string;
  type?: BubbleType;
  avatar?: string | ReactNode | null;
  onAvatarInteraction?: (event: ReactMouseEvent | KeyboardEvent) => void;

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
    reactions,
    onReact,
    timestamp = new Date().getTime(),
    actions = [],
    contentType = 'text',
    content,
    inBulk,
    isFirstInBulk,
    isLastInBulk
  } = props;
  const [ actionsVisible, setActionsVisible ] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const isPc = useMediaQuery({ query: '(min-width: 768px)' });

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

  useEffect(() => {
    if (actionsVisible) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (rowRef.current && !rowRef.current.contains(event.target as Node)) {
          setActionsVisible(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [ actionsVisible ]);

  const onContextMenu = (event: ReactMouseEvent) => {
    if (actionsVisible) return;

    event.preventDefault();
    setActionsVisible(true);
  };

  const onReactHandler = (reaction: Reaction, allReactions: Reaction[]) => {
    setActionsVisible(false);
    onReact?.(reaction, allReactions || []);
  };

  return (
    <div className={classes} style={style} ref={rowRef}>
      <div className="ne-bubble-row">
        {avatarNode}

        <div className="ne-bubble-content-wrapper">
          {/* {inBulk && !isLastInBulk ? timestampNode : null} */}
          <div className='ne-bubble-content-row'>
            <BubbleContent
              bubbleType={type}
              type={contentType}
              content={content}
              onContextMenu={onContextMenu}
              onClick={() => !isPc && setActionsVisible(true)}
            />
            <BubbleActions visible={actionsVisible} actions={actions} type={type} />
          </div>
        </div>
      </div>
      <div className="ne-bubble-row">
        {actionsVisible && <BubbleReactions reactions={reactions} onReact={onReactHandler} />}
      </div>
      <div className="ne-bubble-row">
        {!inBulk || isLastInBulk ? timestampNode : null}
      </div>
    </div>
  );
};

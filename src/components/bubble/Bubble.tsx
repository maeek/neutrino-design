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
import './styles/bubble.scss';
import { useMediaQuery } from 'react-responsive';

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
  const [ isScrolling, setIsScrolling ] = useState(false);
  const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
    if (actionsVisible && !isPc) {
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
  }, [ actionsVisible, isPc ]);

  const onPressDown = () => {
    if (isPc || isScrolling) return;

    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current);
    }
    pressTimeoutRef.current = setTimeout(() => {
      navigator.vibrate(10);
      setActionsVisible(true);
    }, 500);
  };

  const onPressUp = () => {
    if (pressTimeoutRef.current) {
      clearTimeout(pressTimeoutRef.current);
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);

      timeout = setTimeout(() => {
        if (!mounted) return;
        setIsScrolling(false);
      }, 100);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timeout);
      mounted = false;
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              onMouseDown={onPressDown}
              onMouseUp={onPressUp}
              onTouchStart={onPressDown}
              onTouchEnd={onPressUp}
            />
            <BubbleActions visible={actionsVisible} actions={actions} type={type} />
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

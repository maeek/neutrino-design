import { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Avatar } from '../../atoms/avatar';
import './styles/bubble-avatar.scss';

export type BubbleType = 'sender' | 'recipient';

export interface BubbleAvatarProps {
  sender?: string;
  type?: BubbleType;
  avatar?: string | ReactNode | null;
  onAvatarInteraction?: (event: MouseEvent | KeyboardEvent) => void;

  className?: string;

  inBulk?: boolean;
  isLastInBulk?: boolean;
}

export const BubbleAvatar = (props: BubbleAvatarProps) => {
  const {
    className,
    sender,
    type = 'sender',
    avatar,
    inBulk,
    isLastInBulk
  } = props;

  return (
    <div className={classNames('ne-bubble-avatar', className)}>
      {
        (!inBulk || (inBulk && isLastInBulk)) && (
          typeof avatar === 'string'
            ? (
              <Avatar src={avatar} type="round" name={sender} />
            )
            : avatar
        )
      }
      {
        (!inBulk || (inBulk && isLastInBulk)) && type === 'recipient' && (
          <>
            <div className="ne-bubble-avatar-tooltip" title={sender}>
              {sender}
            </div>
            <div className="ne-bubble-avatar-tooltip-arrow" />
          </>
        )
      }
    </div>
  );
};

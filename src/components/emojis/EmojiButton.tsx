import {
  CSSProperties,
  ReactNode,
  useCallback,
  useState,
  useEffect,
  MouseEvent
} from 'react';
import classNames from 'classnames';
import { Twemoji } from './Twemoji';
import { EmojiType } from './emoji-types';
import { useAccessibility } from '../../hooks/useAccessibility';
import { convertEmojiFromCodePoint } from './emojiHelper';
import emojisJson from './emojis.min.json';
import './styles/emoji-button.scss';

export interface EmojiButtonProps {
  id: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (selectedEmoji: string, evt: MouseEvent) => void;
  animated?: boolean;
  emoji?: string | EmojiType;
  native?: boolean;
}

export const EmojiButton = (props: EmojiButtonProps) => {
  const {
    id,
    className,
    style,
    children,
    onClick,
    animated,
    emoji,
    native
  } = props;
  const { onEnter } = useAccessibility();
  const [ diversity, setDiversity ] = useState<string[] | null>(null);
  const [ emojiDescriptor, setEmojiDescriptor ] = useState<EmojiType | null>(null);
  const isEmojiOverride = !!emoji;

  useEffect(() => {
    if (!emoji && native) return;

    const emojiItem = typeof emoji === 'string' ? emojisJson[ emoji as keyof typeof emojisJson ] as EmojiType : emoji;

    if (!emojiItem) return;

    setEmojiDescriptor(emojiItem);
    setDiversity(emojiItem?.diversity_children);
  }, [ emoji, native ]);

  const emojiNode = emojiDescriptor && convertEmojiFromCodePoint(emojiDescriptor.code_points.fully_qualified);
  const emojiToUse = isEmojiOverride ? emojiNode : children;

  const onEmojiSelect = useCallback((emoji: string) => (evt: MouseEvent) => {
    onClick?.(emoji, evt);
  }, [ onClick ]);

  return (
    <li
      className={classNames('ne-emoji-button', className, {
        'ne-emoji-button--animated': animated
      })}
      style={style}
      onClick={onEmojiSelect(id)}
      onKeyUp={onEnter(onClick)}
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
      title={
        isEmojiOverride
          ? typeof emoji === 'string'
            ? emoji
            : `${emoji.name.substring(0, 1).toUpperCase()}${emoji.name.substring(1)}`
          : undefined
      }
    >
      {
        !!diversity && (
          <ul
            className={classNames('ne-emoji-button-diversity', { 'ne-emoji-button-diversity--visible': true })}
            onClick={(e) => e.stopPropagation()}
          >
            {
              diversity.map((diversityItem) => (
                <EmojiButton
                  id={diversityItem}
                  key={diversityItem}
                  native={native}
                  emoji={diversityItem}
                  animated={animated}
                  onClick={(emj, evt) => onEmojiSelect(emj)(evt)}
                />
              ))
            }
          </ul>
        )
      }
      <div className="ne-emoji-button-icon">
        {
          native
            ? emojiToUse
            : <Twemoji>{emojiToUse}</Twemoji>
        }
      </div>
    </li>
  );
};

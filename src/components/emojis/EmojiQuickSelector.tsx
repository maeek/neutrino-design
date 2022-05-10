import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { AddRounded } from '@material-ui/icons';
import { EmojiButton } from './EmojiButton';
import './styles/emoji-quick-selector.scss';

export interface EmojiQuickSelectorProps {
  quickAccessEmojis?: [string, string, string, string, string, string, ];
  className?: string;
  style?: CSSProperties;
  onSelect?: (emoji: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  selectedEmoji?: string;
  renderMoreSelector?: ((selectedEmoji?: string) => ReactNode) | ReactNode | boolean;

  customizable?: boolean;
  onCustomize?: (quickAccessEmojis: [string, string, string, string, string, string, ]) => void;
}

export const EmojiQuickSelector = (props: EmojiQuickSelectorProps) => {
  const {
    quickAccessEmojis,
    className,
    style,
    onSelect,
    onClose,
    onOpen,
    renderMoreSelector,
    customizable
  } = props;
  const [ index, setIndex ] = useState(null);
  const [ isInit, setIsInit ] = useState(false);
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    setIsInit(index !== null);
  }, [ index ]);

  useEffect(() => {
    onOpen?.();

    return () => {
      onClose?.();
    };
  }, [ onClose, onOpen ]);

  const thumbClasses = classNames(
    'ne-emoji-selector-thumb',
    isInit && 'ne-emoji-selector-thumb--visible'
  );

  const selectEmoji = (emoji: string, i: number) => {
    setIndex(p => p === i ? null : i);
    onSelect?.(emoji);
  };

  return (
    <div className="ne-emoji-selector">
      {
        index !== null && <div className={thumbClasses} data-index={index} />
      }

      <ul className="ne-emoji-selector-quick">
        {
          quickAccessEmojis?.map((emoji, i) => (
            <EmojiButton key={emoji} onClick={() => selectEmoji(emoji, i)}>{emoji}</EmojiButton>
          ))
        }
      </ul>

      {
        renderMoreSelector && (
          <div className="ne-emoji-selector-more-btn" onClick={() => setIsOpen(o => !o)}>
            <AddRounded />
          </div>
        )
      }

      {
        isOpen && typeof renderMoreSelector !== 'boolean' && (
          <div className="ne-emoji-selector-more-container">
            {typeof renderMoreSelector === 'function' ? renderMoreSelector() : renderMoreSelector}
          </div>
        )
      }
    </div>
  );
};

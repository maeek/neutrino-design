import { CSSProperties, Suspense, useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
// import { convertEmojiFromCodePoint } from './emojiHelper';
import { useAccessibility } from '../../hooks/useAccessibility';
import { EmojisType } from './emoji-types';
import { EmojiButton } from './EmojiButton';
import emojiCategories from './emojiCategories.json';
import emojisJson from './emojis.min.json';
import './styles/emoji-more-selector.scss';

export interface EmojiMoreSelectorProps {
  quickAccessEmojis?: [string, string, string, string, string, string];
  className?: string;
  style?: CSSProperties;
  onSelect?: (emoji: string) => void;
  onClose?: () => void;
  onOpen?: () => void;
  selectedEmoji?: string;
  customizable?: boolean;
  onCustomize?: (quickAccessEmojis: [string, string, string, string, string, string]) => void;
  emojis?: EmojisType;
  excludeCategories?: string[];
}

export const EmojiMoreSelector = (props: EmojiMoreSelectorProps) => {
  const { className, onClose, onOpen, customizable, emojis = emojisJson, excludeCategories = ['modifier'] } = props;
  const { onEnter } = useAccessibility();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getEmojiByCategory = useCallback(
    (category: string) => {
      return Object.values(emojis as EmojisType)
        .filter(
          emoji => (category === 'all' || emoji.category === category) && emoji.diversity === null && emoji.display
        )
        .sort((a, b) => {
          return a.order - b.order;
        });
    },
    [emojis]
  );

  useEffect(() => {
    onOpen?.();

    return () => {
      onClose?.();
    };
  }, [onClose, onOpen]);

  const onCategorySelect = (category: string) => () => {
    setSelectedCategory(category);
  };

  const classes = classNames('ne-emoji-selector-more', className, {
    'ne-emoji-selector-more--customizable': customizable
  });

  return (
    <div className={classes}>
      <div className='ne-emoji-selector-more-header'>
        <ul className='ne-emoji-selector-more-header-categories'>
          <li
            className='ne-emoji-selector-more-header-category'
            tabIndex={0}
            onClick={onCategorySelect('all')}
            onKeyUp={onEnter(onCategorySelect('all'))}
          >
            All
          </li>
          {emojiCategories
            .filter(category => !excludeCategories.includes(category))
            .map(category => {
              return (
                <li
                  key={category}
                  className='ne-emoji-selector-more-header-category'
                  tabIndex={0}
                  onClick={onCategorySelect(category)}
                  onKeyUp={onEnter(onCategorySelect(category))}
                >
                  {category.toUpperCase()}
                </li>
              );
            })}
        </ul>
      </div>
      <ul className='ne-emoji-selector-more-body'>
        {getEmojiByCategory(selectedCategory).map(emoji => (
          <div
            key={emoji.name}
            className='ne-emoji-selector-more-body-item'
          >
            <Suspense fallback={null}>
              <EmojiButton
                emoji={emoji}
                id={emoji.code_points.fully_qualified}
              />
            </Suspense>
          </div>
        ))}
      </ul>
    </div>
  );
};

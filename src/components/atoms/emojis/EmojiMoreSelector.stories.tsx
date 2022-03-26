import { Story, Meta } from '@storybook/react/types-6-0';
// import emojis from './emojis.json';

import { EmojiMoreSelector as EmojiMoreSelectorComponent, EmojiMoreSelectorProps } from './EmojiMoreSelector';

export default {
  title: 'Atoms/Emoji',
  component: EmojiMoreSelectorComponent
} as Meta;

const Template: Story<EmojiMoreSelectorProps> = (args) => <EmojiMoreSelectorComponent {...args} />;

export const MoreSelector = Template.bind({});
MoreSelector.args = {
  quickAccessEmojis: [
    '😀',
    '🤯',
    '🥸',
    '💣',
    '🥺',
    '❤'
  ]
  // emojis
};

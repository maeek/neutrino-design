import { Story, Meta } from '@storybook/react';
// import emojis from './emojis.json';

import { EmojiMoreSelector as EmojiMoreSelectorComponent, EmojiMoreSelectorProps } from './EmojiMoreSelector';

export default {
  title: 'Components/Emoji',
  component: EmojiMoreSelectorComponent
} as Meta;

const Template: Story<EmojiMoreSelectorProps> = args => <EmojiMoreSelectorComponent {...args} />;

export const MoreSelector = Template.bind({});
MoreSelector.args = {
  quickAccessEmojis: ['😀', '🤯', '🥸', '💣', '🥺', '❤']
  // emojis
};

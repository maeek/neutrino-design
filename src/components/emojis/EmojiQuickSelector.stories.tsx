import { Story, Meta } from '@storybook/react';
import { EmojiQuickSelector as EmojiQuickSelectorComponent, EmojiQuickSelectorProps } from './EmojiQuickSelector';

export default {
  title: 'Components/Emoji',
  component: EmojiQuickSelectorComponent
} as Meta;

const Template: Story<EmojiQuickSelectorProps> = args => <EmojiQuickSelectorComponent {...args} />;

export const QuickSelector = Template.bind({});
QuickSelector.args = {
  quickAccessEmojis: ['😀', '🤯', '🥸', '💣', '🥺', '❤']
};

export const QuickSelectorAdvanced = Template.bind({});
QuickSelectorAdvanced.args = {
  quickAccessEmojis: ['😀', '🤯', '🥸', '💣', '🥺', '❤'],
  renderMoreSelector: true
};

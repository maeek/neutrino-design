import { Story, Meta } from '@storybook/react';
import { Twemoji as TwemojiComponent, TwemojiProps } from './Twemoji';

export default {
  title: 'Components/Twemoji',
  component: TwemojiComponent
} as Meta;

const Template: Story<TwemojiProps> = args => <TwemojiComponent {...args} />;

export const Twemoji = Template.bind({});
Twemoji.args = {
  children: '🤯'
};

export const TwemojiChildren = Template.bind({});
TwemojiChildren.args = {
  children: <div style={{ height: '100px', width: '100%' }}>🤯🤯🤯</div>
};

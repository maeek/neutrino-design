import { Story, Meta } from '@storybook/react/types-6-0';

import { Avatar as AvatarComponent, AvatarProps } from './avatar';

export default {
  title: 'Atoms/Avatar',
  component: AvatarComponent
} as Meta;

const Template: Story<AvatarProps> = (args) => <AvatarComponent {...args} />;

export const AvatarRound = Template.bind({});
AvatarRound.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'large'
};

export const AvatarRounded = Template.bind({});
AvatarRounded.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'rounded',
  size: 'large'
};

export const AvatarSquare = Template.bind({});
AvatarSquare.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'square',
  size: 'large'
};

export const AvatarSmall = Template.bind({});
AvatarSmall.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'small'
};

export const AvatarMedium = Template.bind({});
AvatarMedium.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'medium'
};

export const AvatarLarge = Template.bind({});
AvatarLarge.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'large'
};

export const AvatarLarger = Template.bind({});
AvatarLarger.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'larger'
};

export const AvatarExtraLarge = Template.bind({});
AvatarExtraLarge.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'extra-large'
};

export const AvatarSelectable = Template.bind({});
AvatarSelectable.args = {
  name: 'text',
  src: 'https://static.suchanecki.me/pepe1.jpg',
  type: 'round',
  size: 'extra-large',
  tabIndex: 0,
  selectable: true
};



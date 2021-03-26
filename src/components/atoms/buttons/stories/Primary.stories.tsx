import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '../Button';

export default {
  title: 'Atoms/Buttons/Primary',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Clear all sessions</Button>
);

export const TypeButton = Template.bind({});
TypeButton.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

export const TypeLink = Template.bind({});
TypeLink.args = {
  type: 'link',
  href: 'https://google.com/',
  target: '_blank',
  title: 'This button will open google.com in new tab',
  className: 'ne-button-story'
};


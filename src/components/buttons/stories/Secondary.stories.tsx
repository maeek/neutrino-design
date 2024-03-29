import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ButtonProps } from '../Button';
import SecondaryButtonComponent from '../Secondary';

export default {
  title: 'Components/Buttons/Secondary',
  component: SecondaryButtonComponent
} as Meta;

const Template: Story<ButtonProps> = args => (
  <SecondaryButtonComponent {...args}>Get more info</SecondaryButtonComponent>
);
export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

import React from 'react';
import { Story, Meta } from '@storybook/react';
import AbortButtonComponent from '../Abort';
import { ButtonProps } from '../Button';

export default {
  title: 'Components/Buttons/Abort',
  component: AbortButtonComponent
} as Meta;

const Template: Story<ButtonProps> = args => <AbortButtonComponent {...args}>Cancel</AbortButtonComponent>;
export const Abort = Template.bind({});
Abort.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

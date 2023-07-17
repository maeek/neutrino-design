import React from 'react';
import { Story, Meta } from '@storybook/react';
import ActionButtonComponent from '../Action';
import { ButtonProps } from '../Button';

export default {
  title: 'Components/Buttons/Action',
  component: ActionButtonComponent
} as Meta;

const Template: Story<ButtonProps> = args => <ActionButtonComponent {...args}>Add new channel</ActionButtonComponent>;
export const Action = Template.bind({});
Action.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

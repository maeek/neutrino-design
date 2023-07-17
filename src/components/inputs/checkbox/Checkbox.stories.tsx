import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Components/Inputs/Checkbox',
  component: CheckboxComponent
} as Meta;

const Template: Story<CheckboxProps> = args => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
  className: 'ne-checkbox-story'
};

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Input as InputComponent, InputProps } from './Input';

export default {
  title: 'Components/Inputs/Text',
  component: InputComponent
} as Meta;

const Template: Story<InputProps> = args => <InputComponent {...args} />;

export const Input = Template.bind({});
Input.args = {
  type: 'text',
  className: 'ne-input-story'
};

export const InputDynamicLabel = Template.bind({});
InputDynamicLabel.args = {
  type: 'text',
  className: 'ne-input-story',
  renderLabel: 'Username'
};

export const InputPlaceholder = Template.bind({});
InputPlaceholder.args = {
  type: 'text',
  className: 'ne-input-story',
  placeholder: 'Username'
};

export const InputSearch = Template.bind({});
InputSearch.args = {
  type: 'search',
  className: 'ne-input-story',
  renderLabel: 'Search'
};

export const InputRequired = Template.bind({});
InputRequired.args = {
  type: 'password',
  className: 'ne-input-story',
  placeholder: 'Password',
  required: true
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  type: 'text',
  className: 'ne-input-story',
  disabled: true,
  value: 'This is disabled'
};

export const InputReadonly = Template.bind({});
InputReadonly.args = {
  type: 'text',
  className: 'ne-input-story',
  readOnly: true,
  value: 'This is read only'
};

export const InputCustomValidation = Template.bind({});
InputCustomValidation.args = {
  type: 'text',
  className: 'ne-input-story',
  required: true,
  validate: (text: string) => text === 'foo bar',
  renderLabel: 'Only "foo bar" string will be valid'
};

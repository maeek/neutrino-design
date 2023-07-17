import React from 'react';
import { Story, Meta } from '@storybook/react';
import TextComponent, { TextProps } from './Text';

export default {
  title: 'Components/Typography/Text',
  component: TextComponent
} as Meta;

const Template: Story<TextProps> = args => <TextComponent {...args}>{args.children}</TextComponent>;

export const Default = Template.bind({});
Default.args = {
  children: 'Neutrino Design (default)'
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  children: 'Neutrino Design (Secondary)'
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  children: 'Neutrino Design (Success)'
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  children: 'Neutrino Design (Warning)'
};

export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  children: 'Neutrino Design (Danger)'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: 'Neutrino Design (Disabled)'
};

export const Highlight = Template.bind({});
Highlight.args = {
  highlight: true,
  children: 'Neutrino Design (Highlight)'
};

export const Underline = Template.bind({});
Underline.args = {
  underline: true,
  children: 'Neutrino Design (Underline)'
};

export const Strong = Template.bind({});
Strong.args = {
  strong: true,
  children: 'Neutrino Design (Strong)'
};

export const Link = Template.bind({});
Link.args = {
  link: 'http://google.com/',
  children: 'Neutrino Design (Link)'
};

export const Delete = Template.bind({});
Delete.args = {
  lineThrough: true,
  children: 'Neutrino Design (Delete)'
};

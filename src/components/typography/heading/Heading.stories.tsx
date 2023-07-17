import React from 'react';
import { Story, Meta } from '@storybook/react';
import HeadingComponent, { HeadingProps } from './Heading';

export default {
  title: 'Components/Typography/Heading',
  component: HeadingComponent
} as Meta;

const Template: Story<HeadingProps> = args => (
  <HeadingComponent {...args}>h{args.level}. Neutrino-design</HeadingComponent>
);

export const Heading = Template.bind({});
Heading.args = {
  level: 1
};

import React from 'react';
import { Story, Meta } from '@storybook/react';
import SeparatorComponent, { SeparatorProps } from './Separator';

export default {
  title: 'Components/Breadcrumbs/Separator',
  component: SeparatorComponent
} as Meta;

const Template: Story<SeparatorProps> = args => <SeparatorComponent {...args}>/</SeparatorComponent>;

export const Separator = Template.bind({});
Separator.args = {};

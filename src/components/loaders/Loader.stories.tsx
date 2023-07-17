import React from 'react';
import { Story, Meta } from '@storybook/react';
import LoaderComponent, { LoaderProps } from './Loader';

export default {
  title: 'Components/Loaders',
  component: LoaderComponent
} as Meta;

const Template: Story<LoaderProps> = args => <LoaderComponent {...args} />;

export const Loader = Template.bind({});
Loader.args = {};

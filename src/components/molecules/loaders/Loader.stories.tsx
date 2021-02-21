import { Story, Meta } from '@storybook/react/types-6-0';

import LoaderComponent, { LoaderProps } from './Loader';

export default {
  title: 'Molecules/Loaders',
  component: LoaderComponent
} as Meta;

const Template: Story<LoaderProps> = (args) => (
  <LoaderComponent {...args} />
);

export const Loader = Template.bind({});
Loader.args = {};

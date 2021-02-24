import { Story, Meta } from '@storybook/react/types-6-0';

import BreadcrumbsComponent, { BreadcrumbsProps } from './';

export default {
  title: 'Molecules/Breadcrumbs',
  component: BreadcrumbsComponent
} as Meta;

const Template: Story<BreadcrumbsProps> = (args) => (<BreadcrumbsComponent {...args}>/</BreadcrumbsComponent>);

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  items: [
    {text: 'Home', onClick: () => ({})},
    {text: 'Channels', onClick: () => ({}), menuItems: [
      { text: 'Direct Messages' },
      { text: 'Users' }
    ]},
    {text: 'Main', onClick: () => ({})}
  ]
};

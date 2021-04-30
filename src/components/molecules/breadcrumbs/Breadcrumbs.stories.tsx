import { Story, Meta } from '@storybook/react/types-6-0';

import BreadcrumbsComponent, { BreadcrumbsProps } from './Breadcrumbs';

export default {
  title: 'Molecules/Breadcrumbs',
  component: BreadcrumbsComponent
} as Meta;

const Template: Story<BreadcrumbsProps> = (args) => (<BreadcrumbsComponent {...args}>/</BreadcrumbsComponent>);

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  items: [
    { text: 'Home', onClick: () => ({}) },
    { text: 'Channels', onClick: () => ({}), menuItems: [
      { text: 'Direct Messages' },
      { text: 'Users' }
    ] },
    { text: 'Main', onClick: () => ({}) }
  ]
};

export const BreadcrumbsLongPath = Template.bind({});
BreadcrumbsLongPath.args = {
  separator: '/',
  items: [
    { text: 'Home', onClick: () => ({}) },
    { text: 'Channels', onClick: () => ({}), menuItems: [
      { text: 'Direct Messages', closeOnClick: true },
      { text: 'Users', closeOnClick: true }
    ] },
    { text: 'Main', onClick: () => ({}) },
    { text: 'Groups', onClick: () => ({}) },
    { text: 'All', onClick: () => ({}) },
    { text: 'Connection', onClick: () => ({}), menuItems: [
      { text: 'Firewall', closeOnClick: true },
      { text: 'Docker', closeOnClick: true },
      { text: 'Kubernetes', closeOnClick: true },
      { text: 'Mainframe', closeOnClick: true }
    ] },
    { text: 'Internal', onClick: () => ({}) },
    { text: 'Routing', onClick: () => ({}) },
    { text: 'Advanced', onClick: () => ({}) },
    { text: 'Path', onClick: () => ({}) },
    { text: 'Main', onClick: () => ({}) },
    { text: 'Users', onClick: () => ({}) },
    { text: 'maeek', onClick: () => ({}) }
  ]
};

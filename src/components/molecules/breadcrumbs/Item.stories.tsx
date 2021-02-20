import { Story, Meta } from '@storybook/react/types-6-0';

import { Item as BreadcrumbItemComponent, BreadcrumbItemProps } from './Item';

export default {
  title: 'Molecules/Breadcrumbs/Item',
  component: BreadcrumbItemComponent
} as Meta;

const TemplatePrimary: Story<BreadcrumbItemProps> = (args) => (
  <BreadcrumbItemComponent {...args}>Channels</BreadcrumbItemComponent>
);

export const Item = TemplatePrimary.bind({});
Item.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story',
  moreMenuItems: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' }
  ]
};

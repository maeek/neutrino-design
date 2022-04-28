/* eslint-disable no-console */
import { DnsRounded } from '@material-ui/icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Item as BreadcrumbItemComponent, BreadcrumbItemProps } from './Item';

export default {
  title: 'Components/Breadcrumbs/Item',
  component: BreadcrumbItemComponent
} as Meta;

const Template: Story<BreadcrumbItemProps> = (args) => (
  <BreadcrumbItemComponent {...args}>Channels</BreadcrumbItemComponent>
);

export const ItemWithMenu = Template.bind({});
ItemWithMenu.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story',
  moreMenuItems: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    {
      text: 'Item 3, this closes context-menu on click',
      icon: <DnsRounded />,
      iconPosition: 'left',
      closeOnClick: true,
      onClick: (...args: any) => console.log(args)
    },
    { text: 'Item 4' }
  ]
};

export const Item = Template.bind({});
Item.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story'
};

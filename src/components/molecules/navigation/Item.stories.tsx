/* eslint-disable no-console */
import {
  PeopleRounded, ChatRounded //, SendRounded
} from '@material-ui/icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { NavItem, NavItemProps } from './Item';

export default {
  title: 'Molecules/Navigation/Item',
  component: NavItem
} as Meta;

const Template: Story<NavItemProps> = (args) => <NavItem {...args}>Contacts</NavItem>;

// <NavItem icon={<SendRounded />}>Direct messages</NavItem>
// <NavItem icon={<ChatRounded />}>Channels</NavItem>
// <NavItem>Item</NavItem>

export const Item = Template.bind({});
Item.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story'
};

export const ItemWithIcon = Template.bind({});
ItemWithIcon.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story',
  icon: <PeopleRounded />
};

const TemplateSub: Story<NavItemProps> = (args) => <NavItem {...args}>Contacts</NavItem>;

export const ItemWithSubitems = TemplateSub.bind({});
ItemWithSubitems.args = {
  title: 'This is an item',
  className: 'ne-breadcrumbs-item-story',
  icon: <PeopleRounded />,
  collapsible: true,
  subItems: [
    <NavItem key="k1" icon={<ChatRounded />}>Item</NavItem>,
    <NavItem key="k2">Item</NavItem>,
    <NavItem key="k3">Item</NavItem>
  ]
};

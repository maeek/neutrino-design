import { PeopleRounded } from '@material-ui/icons';
import { Story, Meta } from '@storybook/react/types-6-0';

import ItemComponent, { ItemProps } from './Item';

export default {
  title: 'Components/Context Menu/Item',
  component: ItemComponent
} as Meta;

const Template: Story<ItemProps> = (args) => (
  <ItemComponent {...args}>Channels</ItemComponent>
);

export const Item = Template.bind({});
Item.args = {};

const TemplateWithIcon: Story<ItemProps> = (args) => (
  <ItemComponent {...args}>Channels</ItemComponent>
);
export const ItemWithIcon = TemplateWithIcon.bind({});
ItemWithIcon.args = {
  icon: <PeopleRounded />
};

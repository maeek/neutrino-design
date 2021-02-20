import { Story, Meta } from '@storybook/react/types-6-0';

import ContextMenuComponent, { ContextMenuProps } from './Menu';

export default {
  title: 'Molecules/Context Menu/Menu',
  component: ContextMenuComponent
} as Meta;

const Template: Story<ContextMenuProps> = (args) => (
  <ContextMenuComponent {...args} />
);

export const Menu = Template.bind({});
Menu.args = {
  items: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' }
  ]
};

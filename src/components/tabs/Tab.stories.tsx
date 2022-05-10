import { Story, Meta } from '@storybook/react/types-6-0';

import { Tab as TabComponent, TabProps } from './Tab';

export default {
  title: 'Components/Tabs/Tab',
  component: TabComponent
} as Meta;

const Template: Story<TabProps> = (args) => <TabComponent {...args} />;

export const Tab = Template.bind({});
Tab.args = {
  index: 0,
  title: 'Tab 1',
  closable: true
};

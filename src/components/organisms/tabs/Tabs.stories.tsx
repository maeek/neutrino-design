import { Story, Meta } from '@storybook/react/types-6-0';
import { Tab } from './Tab';

import { Tabs as TabsComponent, TabsProps } from './Tabs';

export default {
  title: 'Organisms/Tabs',
  component: TabsComponent
} as Meta;

const Template: Story<TabsProps> = (args) => <TabsComponent {...args} />;

export const Tabs = Template.bind({});
Tabs.args = {
  children: [
    <Tab draggable key="tab1" title="Tabs.tsx">Test content 1</Tab>,
    <Tab draggable key="tab2" title="Tab.tsx">Test content 2</Tab>,
    <Tab draggable key="tab5" title="Tabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalugaaaaaaaaaa.tsx">Test content 2 aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Tab>,
    <Tab draggable key="tab4" title="very long name for a file that is not that compliacated.json">Test content 3</Tab>,
    <Tab draggable disabled key="tab3" title="tsconfig.json">Test content 34</Tab>
  ]
};

import { Story, Meta } from '@storybook/react/types-6-0';

import SeparatorComponent, { SeparatorProps } from './Separator';

export default {
  title: 'Molecules/Breadcrumbs/Separator',
  component: SeparatorComponent
} as Meta;

const Template: Story<SeparatorProps> = (args) => (<SeparatorComponent {...args}>/</SeparatorComponent>);

export const Separator = Template.bind({});
Separator.args = {};

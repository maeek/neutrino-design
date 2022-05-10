import { Story, Meta } from '@storybook/react/types-6-0';

import CodeComponent, { CodeLineProps } from './Code-line';

export default {
  title: 'Components/Typography/Code',
  component: CodeComponent
} as Meta;

const Template: Story<CodeLineProps> = (args) => (<CodeComponent {...args}>{args.children}</CodeComponent>);

const text = 'Code. Neutrino Design';

export const Code = Template.bind({});
Code.args = {
  children: text
};

import { Story, Meta } from '@storybook/react/types-6-0';

import CodeComponent, { CodeProps } from './Code';

export default {
  title: 'Molecules/Code',
  component: CodeComponent
} as Meta;

const Template: Story<CodeProps> = (args) => (
  <CodeComponent {...args}>
    {args.children}
  </CodeComponent>);

const text = `Code. Neutrino Design

Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione voluptatibus voluptatum voluptatem quidem veniam sunt vitae,
quis earum quas inventore natus exercitationem vero maiores porro culpa est ea. Asperiores!`;

export const Code = Template.bind({});
Code.args = {
  children: text
};

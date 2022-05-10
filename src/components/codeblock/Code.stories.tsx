/* eslint-disable max-len */
import { Story, Meta } from '@storybook/react/types-6-0';

import CodeComponent, { CodeProps } from './Code';
import CodeBlockComponent from './CodeBlock';

export default {
  title: 'Components/Codeblock',
  component: CodeComponent
} as Meta;

const text = `Code. Neutrino Design

Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione voluptatibus voluptatum voluptatem quidem veniam sunt vitae,
quis earum quas inventore natus exercitationem vero maiores porro culpa est ea. Asperiores!`;

const Template: Story<CodeProps> = (args) => (
  <CodeComponent {...args}>{text}</CodeComponent>);

export const Code = Template.bind({});
Code.args = {};

const TemplateBlock: Story<CodeProps> = (args) => (
  <CodeBlockComponent {...args}>{text}</CodeBlockComponent>);

export const CodeBlock = TemplateBlock.bind({});
Code.args = {
  numbers: true
};

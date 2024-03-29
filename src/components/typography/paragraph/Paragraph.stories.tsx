/* eslint-disable max-len */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import ParagraphComponent, { ParagraphProps } from './Paragraph';

export default {
  title: 'Components/Typography/Paragraph',
  component: ParagraphComponent
} as Meta;

const Template: Story<ParagraphProps> = args => <ParagraphComponent {...args}>{args.children}</ParagraphComponent>;

const text = `Paragraph. Neutrino Design

Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ratione voluptatibus voluptatum voluptatem quidem veniam sunt vitae,
quis earum quas inventore natus exercitationem vero maiores porro culpa est ea. Asperiores!`;

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: text
};

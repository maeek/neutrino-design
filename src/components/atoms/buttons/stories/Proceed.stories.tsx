import { Story, Meta } from '@storybook/react/types-6-0';
import { ButtonProps } from '..';
import ProceedButtonComponent from '../Proceed';

export default {
  title: 'Atoms/Buttons/Proceed',
  component: ProceedButtonComponent
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <ProceedButtonComponent {...args}>Sign in</ProceedButtonComponent>
);
export const Proceed = Template.bind({});
Proceed.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

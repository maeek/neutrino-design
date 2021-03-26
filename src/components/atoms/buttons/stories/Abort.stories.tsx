import { Story, Meta } from '@storybook/react/types-6-0';
import { ButtonProps } from '../Button';
import AbortButtonComponent from '../Abort';

export default {
  title: 'Atoms/Buttons/Abort',
  component: AbortButtonComponent
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <AbortButtonComponent {...args}>Cancel</AbortButtonComponent>
);
export const Abort = Template.bind({});
Abort.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

import { Story, Meta } from '@storybook/react/types-6-0';
import { ButtonProps } from '..';
import SecondaryButtonComponent from '../Secondary';

export default {
  title: 'Atoms/Buttons/Secondary',
  component: SecondaryButtonComponent
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <SecondaryButtonComponent {...args}>Get more info</SecondaryButtonComponent>
);
export const Secondary = Template.bind({});
Secondary.args = {
  type: 'button',
  title: 'This is a button',
  className: 'ne-button-story'
};

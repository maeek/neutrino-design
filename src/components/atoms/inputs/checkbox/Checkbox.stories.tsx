import { Story, Meta } from '@storybook/react/types-6-0';

import { Checkbox as CheckboxComponent, CheckboxProps } from './Checkbox';

export default {
  title: 'Atoms/Inputs/Checkbox',
  component: CheckboxComponent
} as Meta;

const Template: Story<CheckboxProps> = (args) => (
  <CheckboxComponent {...args} />
);

export const Checkbox = Template.bind({});
Checkbox.args = {
  className: 'ne-checkbox-story'
};

import { Story, Meta } from '@storybook/react/types-6-0';

import { Select as SelectComponent, SelectProps } from './Select';

export default {
  title: 'Atoms/Inputs/Select',
  component: SelectComponent
} as Meta;

const Template: Story<SelectProps> = (args) => <SelectComponent {...args} />;

export const Select = Template.bind({});
Select.args = {
  placeholder: 'Select an option',
  items: [
    {
      index: 0,
      value: 'John Doe'
    },
    {
      index: 1,
      value: 'Alice Cooper'
    },
    {
      index: 2,
      value: 'Bob Smith'
    },
    {
      index: 3,
      value: 'Bob Parker'
    },
    {
      index: 4,
      value: 'Karen Williams'
    },
    {
      index: 5,
      value: 'Karen Parker'
    },
    {
      index: 6,
      value: 'Karen Cooper'
    },
    {
      index: 7,
      value: 'Karen Smith'
    },
    {
      index: 8,
      value: 'Anthony Walker'
    }
  ]
};

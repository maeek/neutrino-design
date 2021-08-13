/* eslint-disable no-console */
import { Story, Meta } from '@storybook/react/types-6-0';

import { Progress as ProgressComponent, ProgressProps } from './Progress';

export default {
  title: 'Atoms/Progress',
  component: ProgressComponent
} as Meta;

const Template: Story<ProgressProps> = (args) => (
  <ProgressComponent {...args} />
);

export const ProgressHorizontal = Template.bind({});
ProgressHorizontal.args = {
  value: 58
};

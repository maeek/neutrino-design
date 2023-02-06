import { Story, Meta } from '@storybook/react/types-6-0';
import { AppShell as AppShellComponent, AppShellProps } from '.';

export default {
  title: 'AppShell',
  component: AppShellComponent
} as Meta;

const Template: Story<AppShellProps> = (args) => (
  <AppShellComponent {...args} />
);

export const AppShell = Template.bind({});
AppShell.args = {};

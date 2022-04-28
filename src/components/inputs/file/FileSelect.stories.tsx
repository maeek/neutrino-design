import { Story, Meta } from '@storybook/react/types-6-0';

import { FileSelect as FileSelectComponent, FileSelectProps } from './FileSelect';

export default {
  title: 'Components/Inputs/File Select',
  component: FileSelectComponent
} as Meta;

const Template: Story<FileSelectProps> = (args) => <FileSelectComponent {...args} />;

export const FileSelect = Template.bind({});
FileSelect.args = {
  name: 'Upload',
  description: 'Upload your profile photos'
};

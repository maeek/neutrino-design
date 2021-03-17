import { Story, Meta } from '@storybook/react/types-6-0';

import { ImageContainer as ImageContainerComponent, ImageContainerProps } from './image';

export default {
  title: 'Atoms/Image',
  component: ImageContainerComponent
} as Meta;

const Template: Story<ImageContainerProps> = (args) => <ImageContainerComponent {...args} />;

export const ImageContainer = Template.bind({});
ImageContainer.args = {
  alt: 'text',
  src: 'https://static.suchanecki.me/neony.jpeg'
};

export const ImageContainerWithLoader = Template.bind({});
ImageContainerWithLoader.args = {
  alt: 'text',
  src: 'https://static.suchanecki.me/neony.jpeg',
  loader: 'Loading...'
};

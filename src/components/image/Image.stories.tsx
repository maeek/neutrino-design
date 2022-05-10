/* eslint-disable no-console */
import { Story, Meta } from '@storybook/react/types-6-0';

import { Image as ImageContainerComponent, ImageProps } from './Image';

export default {
  title: 'Components/Image',
  component: ImageContainerComponent
} as Meta;

const Template: Story<ImageProps> = (args) => <div style={{
  width: '700px',
  height: '500px'
}}><ImageContainerComponent {...args} /></div>;

export const ImageContainer = Template.bind({});
ImageContainer.args = {
  alt: 'text',
  src: 'https://static.suchanecki.me/tape2.jpg',
  fallbackSrc: 'https://static.suchanecki.me/tape2.jpg',
  onLoad: () => console.log('onLoad'),
  onError: (err) => console.log('onError', err)
};

export const ImageContainerWithLoader = Template.bind({});
ImageContainerWithLoader.args = {
  alt: 'text',
  src: 'https://static.suchanecki.me/tape2.jpg',
  onLoad: () => console.log('onLoad'),
  loader: 'Loading...',
  animations: false
};

export const ImageContainerWithBlurhash = Template.bind({});
ImageContainerWithBlurhash.args = {
  alt: 'text',
  src: 'https://static.suchanecki.me/tape2.jpg',
  onLoad: () => console.log('onLoad'),
  blurhash: 'L35$bTD7WEad.jD7%_VuMRR6ozVu'
};

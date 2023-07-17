/* eslint-disable no-console */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import AbortButton from '../buttons/Abort';
import Heading from '../typography/heading/Heading';
import { Drawer as DrawerComponent, DrawerProps } from './Drawer';

export default {
  title: 'Components/Drawer',
  component: DrawerComponent
} as Meta;

const Template: Story<DrawerProps> = args => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpened(true)}>Open drawer</button>
      <DrawerComponent
        {...args}
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <Heading>Drawer Example</Heading>
        <AbortButton onClick={() => setIsOpened(false)}>Close</AbortButton>
      </DrawerComponent>
    </>
  );
};

export const Drawer = Template.bind({});
Drawer.args = {
  showMask: true,
  position: 'right',
  animationSpeed: 250,
  style: { padding: '1rem' }
};

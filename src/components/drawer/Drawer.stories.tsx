/* eslint-disable no-console */
import { Story, Meta } from '@storybook/react/types-6-0';
import { useState } from 'react';
import { Drawer as DrawerComponent, DrawerProps } from './Drawer';
import Heading from '../typography/heading/Heading';
import AbortButton from '../buttons/Abort';

export default {
  title: 'Components/Drawer',
  component: DrawerComponent
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  const [ isOpened, setIsOpened ] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpened(true)}>Open drawer</button>
      <DrawerComponent {...args} isOpened={isOpened} onClose={() => setIsOpened(false)}>
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

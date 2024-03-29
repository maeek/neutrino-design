import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { Modal as ModalComponent, ModalProps } from './Modal';

export default {
  title: 'Components/Modal',
  component: ModalComponent
} as Meta;

const Template: Story<ModalProps> = args => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpened(true)}>Open modal</button>
      {isOpened && (
        <ModalComponent {...args}>
          <button onClick={() => setIsOpened(false)}>Close modal</button>
        </ModalComponent>
      )}
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {};

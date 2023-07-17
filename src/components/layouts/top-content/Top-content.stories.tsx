import React from 'react';
import { Story, Meta } from '@storybook/react';
import LayoutTopContentComponent, { LayoutTopContentProps } from '.';

export default {
  title: 'Layouts/Top Content',
  component: LayoutTopContentComponent
} as Meta;

const contStyle = {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutTopContentProps> = args => (
  <div style={{ height: '600px' }}>
    <LayoutTopContentComponent {...args}>
      <div style={contStyle}>Neutrino-design</div>
    </LayoutTopContentComponent>
  </div>
);

export const TopContent = Template.bind({});
TopContent.args = {
  topNode: (
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '1rem'
      }}
    >
      Neutrino-design top bar
    </div>
  )
};

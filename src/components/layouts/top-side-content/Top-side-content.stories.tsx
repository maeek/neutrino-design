import React from 'react';
import { Story, Meta } from '@storybook/react';
import LayoutTopSideContentComponent, { LayoutTopSideContentProps } from '.';

export default {
  title: 'Layouts/Top Side Content',
  component: LayoutTopSideContentComponent
} as Meta;

const contStyle = {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutTopSideContentProps> = args => (
  <div style={{ height: '600px' }}>
    <LayoutTopSideContentComponent {...args}>
      <div style={contStyle}>Neutrino-design</div>
    </LayoutTopSideContentComponent>
  </div>
);

export const TopSideContent = Template.bind({});
TopSideContent.args = {
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
  ),
  sideNode: (
    <div
      style={{
        width: '300px',
        height: '100%',
        backgroundColor: '#1f1f1f',
        color: '#fff',
        padding: '1rem'
      }}
    >
      Neutrino-design sidebar
    </div>
  )
};

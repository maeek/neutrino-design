import React from 'react';
import { Story, Meta } from '@storybook/react';
import LayoutSideContentComponent, { LayoutSideContentProps } from '.';

export default {
  title: 'Layouts/Side Content',
  component: LayoutSideContentComponent
} as Meta;

const contStyle = {
  maxWidth: '1200px',
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutSideContentProps> = args => (
  <div style={{ height: '600px' }}>
    <LayoutSideContentComponent {...args}>
      <div style={contStyle}>Neutrino-design</div>
    </LayoutSideContentComponent>
  </div>
);

export const SideContent = Template.bind({});
SideContent.args = {
  sideNode: (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '1rem'
      }}
    >
      Neutrino-design side bar
    </div>
  )
};

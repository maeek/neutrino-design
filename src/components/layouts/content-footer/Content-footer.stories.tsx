import React from 'react';
import { Story, Meta } from '@storybook/react';
import LayoutContentFooterComponent, { LayoutContentFooterProps } from '.';

export default {
  title: 'Layouts/Content Footer',
  component: LayoutContentFooterComponent
} as Meta;

const contStyle = {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutContentFooterProps> = args => (
  <div style={{ height: '600px' }}>
    <LayoutContentFooterComponent {...args}>
      <div style={contStyle}>Neutrino-design</div>
    </LayoutContentFooterComponent>
  </div>
);

export const ContentFooter = Template.bind({});
ContentFooter.args = {
  footerNode: (
    <div
      style={{
        width: '100%',
        height: '60px',
        backgroundColor: '#0f0f0f',
        color: '#fff',
        padding: '1rem'
      }}
    >
      Neutrino-design footer
    </div>
  )
};

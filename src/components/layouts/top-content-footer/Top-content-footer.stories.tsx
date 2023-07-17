import React from 'react';
import { Story, Meta } from '@storybook/react';
import LayoutTopContentFooterComponent, { LayoutTopContentFooterProps } from '.';

export default {
  title: 'Layouts/Top Content Footer',
  component: LayoutTopContentFooterComponent
} as Meta;

const contStyle = {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutTopContentFooterProps> = args => (
  <div style={{ height: '600px' }}>
    <LayoutTopContentFooterComponent {...args}>
      <div style={contStyle}>Neutrino-design</div>
    </LayoutTopContentFooterComponent>
  </div>
);

export const TopContentFooter = Template.bind({});
TopContentFooter.args = {
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

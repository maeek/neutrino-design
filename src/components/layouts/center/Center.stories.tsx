import { Story, Meta } from '@storybook/react/types-6-0';

import LayoutCenterComponent, { LayoutCenterProps } from './';

export default {
  title: 'Layouts/Center',
  component: LayoutCenterComponent
} as Meta;

const contStyle = {
  width: '300px',
  height: '200px',
  backgroundColor: '#0e0e0e',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<LayoutCenterProps> = (args) => (
  <div style={{height: '600px', backgroundColor: '#1f1f1f'}}>
    <LayoutCenterComponent {...args}>
      <div style={contStyle}>I'm centered</div>
    </LayoutCenterComponent>
  </div>
);

export const Center = Template.bind({});
Center.args = {};

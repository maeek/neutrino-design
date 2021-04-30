import { Story, Meta } from '@storybook/react/types-6-0';
import LayoutCenterComponent  from './center';
import LayoutSideContentComponent  from './side-content';
import LayoutTopContentComponent from './top-content';
import LayoutContentFooterComponent from './content-footer';

// import LayoutTopSideContentComponent, { LayoutTopSideContentProps } from '.';

export default {
  title: 'Layouts/Advanced Examples' 
  // component: 
} as Meta;
const contStyle = {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  backgroundColor: '#222',
  color: '#fff',
  padding: '1rem'
};

const Template: Story<any> = (args) => (
  <div style={{ height: '600px' }}>
    <LayoutTopContentComponent topNode={args.topNode}>
      <LayoutSideContentComponent sideNode={args.sideNode}>
        <LayoutContentFooterComponent footerNode={args.footerNode}>
          <LayoutCenterComponent>
            <div style={contStyle}>Neutrino-design</div>
          </LayoutCenterComponent>
        </LayoutContentFooterComponent>
      </LayoutSideContentComponent>
    </LayoutTopContentComponent>
  </div>
);

export const TopContentFooter = Template.bind({});
TopContentFooter.args = {
  topNode: (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#0f0f0f',
      color: '#fff',
      padding: '1rem'
    }}>
      Neutrino-design top bar
    </div>
  ),
  footerNode: (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#0f0f0f',
      color: '#fff',
      padding: '1rem'
    }}>
      Neutrino-design footer
    </div>
  ),
  sideNode: (
    <div style={{
      width: '100%',
      height: 'auto',
      backgroundColor: '#1f1f1f',
      color: '#fff',
      padding: '1rem'
    }}>
      <div>Neutrino-design sidebar</div>
    </div>
  )
};

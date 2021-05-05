/* eslint-disable no-console */
import { VolumeMuteRounded, VolumeOffRounded, VolumeUpRounded } from '@material-ui/icons';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SliderInput as SliderInputComponent, SliderInputProps } from './Slider';

export default {
  title: 'Atoms/Inputs/Slider',
  component: SliderInputComponent
} as Meta;

const Template: Story<SliderInputProps> = (args) => (
  <SliderInputComponent {...args} />
);

export const SliderHorizontal = Template.bind({});
SliderHorizontal.args = {
  onChange: (v) => console.log(v),
  tooltipPos: 'top'
};

export const SliderHorizontalWithSteps = Template.bind({});
SliderHorizontalWithSteps.args = {
  onChange: (v) => console.log(v),
  tooltipPos: 'top',
  steps: [
    { progressTooltip: (<VolumeOffRounded />), label: (<VolumeMuteRounded />) },
    { progressTooltip: (p) => p, value: 10 },
    { progressTooltip: (p) => p, value: 15 },
    { progressTooltip: (p) => p, value: 75 },
    { progressTooltip: (<VolumeUpRounded />), label: (<VolumeUpRounded />) }
  ]
};

export const SliderVertical = Template.bind({});
SliderVertical.args = {
  onChange: (v) => console.log(v),
  axis: 'vertical',
  tooltipPos: 'right'
};

export const SliderVerticalWithSteps = Template.bind({});
SliderVerticalWithSteps.args = {
  onChange: (v) => console.log(v),
  tooltipPos: 'right',
  axis: 'vertical',
  initValue: 100,
  steps: [
    { progressTooltip: (<VolumeOffRounded />), label: (<VolumeMuteRounded />) },
    { progressTooltip: (<VolumeMuteRounded />) },
    { progressTooltip: (<VolumeMuteRounded />) },
    { progressTooltip: (<VolumeUpRounded />) },
    { progressTooltip: (<VolumeUpRounded />), label: (<VolumeUpRounded />) }
  ]
};

export const SliderCustomTooltip = Template.bind({});
SliderCustomTooltip.args = {
  onChange: (v) => console.log(v),
  tooltipPos: 'bottom',
  // eslint-disable-next-line react/display-name
  tooltip: (v) => (
    <div style={{ padding: '1rem', background: '#f0f0f0', color: '#000' }}>Custom tooltip {v}%</div>
  )
};

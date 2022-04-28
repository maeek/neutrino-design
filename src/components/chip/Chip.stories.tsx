import { PersonRounded } from '@material-ui/icons';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Chip as ChipComponent, ChipProps } from './Chip';

export default {
  title: 'Components/Chip',
  component: ChipComponent
} as Meta;

const Template: Story<ChipProps> = (args) => <ChipComponent {...args} />;

export const Chip = Template.bind({});
Chip.args = {
  // icon: <Avatar size='small' src='https://static.suchanecki.me/pepe1.jpg' />,
  children: 'Bogdan Kowalski',
  deletable: true
};

const MultipleTemplate: Story<ChipProps> = (args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <ChipComponent
      icon={<PersonRounded />}
      style={{ margin: '0.1rem' }}
      {...args}
      color='blue'
    >
      Bobab Kowalczyk
    </ChipComponent>
    <ChipComponent
      icon={<PersonRounded />}
      style={{ margin: '0.1rem' }}
      {...args}
      color='red'
    >
      Bobab Kowalczyk
    </ChipComponent>
    <ChipComponent
      icon={<PersonRounded />}
      style={{ margin: '0.1rem' }}
      {...args}
      color='yellow'
    >
      Bobab Kowalczyk
    </ChipComponent>
    <ChipComponent
      icon={<PersonRounded />}
      style={{ margin: '0.1rem' }}
      {...args}
      color='purple'
    >
        Bobab Kowalczyk
    </ChipComponent>
    <ChipComponent
      icon={<PersonRounded />}
      style={{ margin: '0.1rem' }}
      {...args}
      color='green'>
        Bobab Kowalczyk
    </ChipComponent>
  </div>
);

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {};

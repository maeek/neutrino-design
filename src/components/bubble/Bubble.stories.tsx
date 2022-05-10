import { Story, Meta } from '@storybook/react/types-6-0';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticonRounded';

import { Bubble as BubbleComponent, BubbleProps } from './Bubble';
import { DeleteForeverRounded, MoreHorizRounded } from '@material-ui/icons';
import ContextMenu from '../context-menu/Menu';

export default {
  title: 'Components/Bubble',
  component: BubbleComponent
} as Meta;

const Template: Story<BubbleProps> = (args) => <BubbleComponent {...args} />;

export const Bubble = Template.bind({});
Bubble.args = {
  type: 'sender',
  avatar: 'https://static.suchanecki.me/pepe1.jpg',
  timestamp: 1646400100001,
  content: 'Welcome to the chat!'
};

export const BubbleLong = Template.bind({});
BubbleLong.args = {
  type: 'recipient',
  avatar: 'https://static.suchanecki.me/avatar.png',
  timestamp: new Date(),
  // eslint-disable-next-line max-len
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  actions: [
    {
      key: 'action-1',
      name: 'Action 1',
      icon: <InsertEmoticonIcon />,
      onClick: () => {
        console.log('action 1');
      }
    },
    {
      key: 'action-2',
      name: 'More',
      icon: <MoreHorizRounded />,
      onClick: () => {
        console.log('action 2');
      },
      children: (
        <ContextMenu items={[
          { text: 'Details' },
          { text: 'Forward' },
          { text: 'Remove', icon: <DeleteForeverRounded /> }
        ]} />
      )
    }
  ]
};

const actions = [
  {
    key: 'action-1',
    name: 'Action 1',
    icon: <InsertEmoticonIcon />,
    onClick: () => {
      console.log('action 1');
    }
  },
  {
    key: 'action-2',
    name: 'More',
    icon: <MoreHorizRounded />,
    onClick: () => {
      console.log('action 2');
    },
    children: (
      <ContextMenu items={[
        { text: 'Details' },
        { text: 'Forward' },
        { text: 'Remove', icon: <DeleteForeverRounded /> }
      ]} />
    )
  }
];

const TemplateChain: Story = () => (
  <>
    <BubbleComponent
      type="sender"
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={Date.now() - 60 * 1000 * 60}
      content="Welcome to the chat!"
      actions={actions}
    />
    <BubbleComponent
      type="recipient"
      sender='maeek'
      avatar="https://static.suchanecki.me/pepe1.jpg"
      timestamp={Date.now() - 60 * 1000 * 60}
      // eslint-disable-next-line max-len
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      actions={actions}
    />
    <BubbleComponent
      type="sender"
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={new Date()}
      content="Yeee"
      inBulk
      isFirstInBulk
      actions={actions}
    />
    <BubbleComponent
      type="sender"
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={new Date()}
      content="Yeee"
      inBulk
      actions={actions}
    />
    <BubbleComponent
      type="sender"
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={new Date()}
      // eslint-disable-next-line max-len
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      inBulk
      actions={actions}
    />
    <BubbleComponent
      type="sender"
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={new Date()}
      content="This is alright"
      inBulk
      isLastInBulk
      actions={actions}
    />
    <BubbleComponent
      type="recipient"
      sender='zyczu1337'
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={Date.now() - 55 * 1000}
      // eslint-disable-next-line max-len
      content="Good to hear"
      actions={actions}
      inBulk
      isFirstInBulk
    />
    <BubbleComponent
      type="recipient"
      sender='zyczuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu1337'
      avatar="https://static.suchanecki.me/avatar.png"
      timestamp={Date.now() - 55 * 1000}
      // eslint-disable-next-line max-len
      content="(y)"
      actions={actions}
      inBulk
      isLastInBulk
    />
  </>
);

export const BubbleChain = TemplateChain.bind({});

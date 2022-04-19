import { Story, Meta } from '@storybook/react/types-6-0';
import { FullscreenButton, PictureInPictureButton, PlayButton, VolumeButton } from './buttons/';
import { Controls, LeftControls, RightControls } from './Controls';
import { Player as PlayerComponent, PlayerProps } from './Player';
import { VideoRenderer } from './renderers/VideoRenderer';
import { SeekBar } from './SeekBar';
import { Timestamp } from './Timestamp';

export default {
  title: 'Organisms/Player/Player',
  component: PlayerComponent
} as Meta;

const Template: Story<PlayerProps> = (args) => <div style={{ height: '1100px' }}><PlayerComponent {...args} /></div>;

export const Player = Template.bind({});
Player.args = {
  url: 'https://video.blender.org/download/videos/bf1f3fb5-b119-4f9f-9930-8e20e892b898-720.mp4',
  poster: 'https://static.suchanecki.me/jupiter.jpg',
  aspectRatio: '4:3',
  keyboardControl: true,
  children: (
    <>
      <Controls renderer={<VideoRenderer interactive />}>
        <SeekBar />
        <LeftControls>
          <PlayButton size='medium' />
          <VolumeButton size='medium' />
          <Timestamp />
        </LeftControls>
        <RightControls>
          <PictureInPictureButton size='medium' />
          <FullscreenButton size='medium' />
        </RightControls>
      </Controls>
    </>
  )
};

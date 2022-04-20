import { CSSProperties } from 'react';
import { useStats } from './hooks/useStats';
import './styles/seekbar.scss';

export interface SeekBarProps {
}

export const SeekBar = ({}: SeekBarProps) => {
  const { currentTime, duration } = useStats();

  const thumbPosition = (currentTime / duration) * 100;

  console.log(thumbPosition);

  return (
    <div className='ne-player-seek-bar'>
      <div className='ne-player-seek-bar-timeline'></div>
      <div className='ne-player-seek-bar-live' style={{ '--pos': thumbPosition } as CSSProperties} />
    </div>
  );
};

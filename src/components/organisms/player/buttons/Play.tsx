import classNames from 'classnames';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import PauseRounded from '@material-ui/icons/PauseRounded';
import PlayArrowRounded from '@material-ui/icons/PlayArrowRounded';
import { ButtonProps } from './types';
import '../styles/buttons.scss';

export const PlayButton = ({ size = 'medium' }: ButtonProps) => {
  const { playing, stalled, play } = useVideoPlayer();

  const classes = classNames(
    'ne-player-button',
    `ne-player-button--${size}`,
    'ne-player-button-play',
    playing && 'ne-player-button-play--playing'
  );

  const btn = (
    <div className="ne-player-button-icon">
      {
        playing
          ? <PauseRounded />
          : <PlayArrowRounded />
      }
    </div>
  );

  return (
    <button className={classes} onClick={() => {
      if (stalled) return;

      play(!playing);
    }}>
      {!stalled && btn}
      {stalled && 'Loading...'}
    </button>
  );
};

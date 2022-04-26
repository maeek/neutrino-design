import classNames from 'classnames';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import VolumeDownRounded from '@material-ui/icons/VolumeDownRounded';
import VolumeOffRounded from '@material-ui/icons/VolumeOffRounded';
import VolumeUpRounded from '@material-ui/icons/VolumeUpRounded';
import VolumeMuteRounded from '@material-ui/icons/VolumeMuteRounded';
import { ButtonProps } from './types';
import './buttons.scss';

export const VolumeButton = ({ size = 'medium' }: ButtonProps) => {
  const { volume, setVolume } = useVideoPlayer();

  const classes = classNames(
    'ne-player-button',
    `ne-player-button--${size}`,
    'ne-player-button-volume',
    `ne-player-button-volume--${volume > 0 ? 'high' : 'low'}`
  );

  const btn = (
    <div className="ne-player-button-icon">
      {
        volume > 0 && volume <= 0.2 && (
          <VolumeMuteRounded />
        )
      }
      {
        volume > 0.2 && volume < 0.6 && (
          <VolumeDownRounded />
        )
      }
      {
        volume >= 0.6 && (
          <VolumeUpRounded />
        )
      }
      {
        volume === 0 && (
          <VolumeOffRounded />
        )
      }
    </div>
  );

  return (
    <button className={classes} onClick={() => {
      setVolume(volume === 0 ? 1 : 0);
    }}>
      {btn}
    </button>
  );
};

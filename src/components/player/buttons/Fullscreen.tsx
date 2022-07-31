import classNames from 'classnames';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import FullscreenExitRounded from '@mui/icons-material/FullscreenExitRounded';
import FullscreenRounded from '@mui/icons-material/FullscreenRounded';
import { ButtonProps } from './types';
import './buttons.scss';

export const FullscreenButton = ({ size = 'medium' }: ButtonProps) => {
  const { toggleFullscreen, isFullscreen } = useVideoPlayer();

  const classes = classNames(
    'ne-player-button',
    `ne-player-button--${size}`,
    'ne-player-button-pnp'
  );

  const btn = (
    <div className="ne-player-button-icon">
      {
        isFullscreen
          ? <FullscreenExitRounded />
          : <FullscreenRounded />
      }
    </div>
  );

  return (
    <button className={classes} onClick={() => {
      toggleFullscreen();
    }}>
      {btn}
    </button>
  );
};

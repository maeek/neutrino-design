import classNames from 'classnames';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import PictureInPictureRounded from '@material-ui/icons/PictureInPictureRounded';
import { ButtonProps } from './types';
import '../styles/buttons.scss';

export const PictureInPictureButton = ({ size = 'medium' }: ButtonProps) => {
  const { mediaElement, canPlay } = useVideoPlayer();

  const classes = classNames(
    'ne-player-button',
    `ne-player-button--${size}`,
    'ne-player-button-pnp'
  );

  const btn = (
    <div className="ne-player-button-icon">
      <PictureInPictureRounded />
    </div>
  );

  return canPlay && (
    <button className={classes} onClick={() => {
      if (mediaElement.current instanceof HTMLVideoElement) {
        mediaElement.current.requestPictureInPicture();
      }
    }}>
      {btn}
    </button>
  );
};

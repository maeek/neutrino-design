import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { Children, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { SeekBar } from './SeekBar';
import './styles/controls.scss';

export interface ControlsProps {
  children?: ReactElement | ReactElement[];
  renderer?: ReactNode;
  autohide?: boolean;
}

export const LeftControls = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);
export const RightControls = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);

export const Controls = ({ children, renderer, autohide }: ControlsProps) => {
  const { playerElement, playing, controlsHidden, hideControls } = useVideoPlayer();
  const [ isHovering, setIsHovering ] = useState(false);
  const hideTimeout = useRef(debounce(() => {
    hideControls(true);
    setIsHovering(false);
  }, 2500, { leading: false, trailing: true }));

  const leftChildren = Children.map(children, (child) => {
    if (child.type === LeftControls) {
      return child;
    }
    return null;
  }).filter(Boolean);
  const rightChildren = Children.map(children, (child) => {
    if (child.type === RightControls) {
      return child;
    }
    return null;
  }).filter(Boolean);
  const seekBar = Children.map(children, (child) => {
    if (child.type === SeekBar) {
      return child;
    }
    return null;
  }).filter(Boolean);

  useEffect(() => {
    const element = playerElement.current;
    let debFunc;

    const handleMouseMove = (e: MouseEvent) => {
      if (autohide && (e.target === element || element?.contains(e.target as Node))) {
        hideControls(false);
        setIsHovering(true);
        debFunc = hideTimeout.current();
      } else {
        setIsHovering(false);
        debFunc?.cancel();
      }
    };

    const handleMouseStop = () => {
      if (autohide) {
        hideControls(true);
        setIsHovering(false);
        debFunc?.cancel();
      }
    };

    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseStop);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseStop);
      }
      debFunc?.cancel();
    };
  }, [ autohide, hideControls, playerElement ]);

  return (
    <div className={classNames('ne-player-controls', {
      'ne-player-controls--hidden': playing && autohide && controlsHidden && !isHovering
    })}>
      {renderer && (
        <div className='ne-player-controls-renderer'>
          {renderer}
        </div>
      )}
      <div className="ne-player-controls-content-mask"></div>
      <div className="ne-player-controls-content">
        {seekBar}
        <div className="ne-player-controls-content-wrapper">
          <div
            className="ne-player-controls-content-elements ne-player-controls-content-elements--left"
          >
            {leftChildren}
          </div>
          <div
            className="ne-player-controls-content-elements ne-player-controls-content-elements--right"
          >
            {rightChildren}
          </div>
        </div>
      </div>
    </div>
  );
};

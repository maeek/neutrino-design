import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { Children, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import { SeekBar } from '../seekbar';
import './controls.scss';

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
export const HeaderLeft = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);
export const HeaderRight = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);

export const Controls = ({ children, renderer, autohide }: ControlsProps) => {
  const { playerElement, playing, controlsHidden, hideControls, seeking } = useVideoPlayer();
  const [ isHovering, setIsHovering ] = useState(false);
  const [ wasSeeking, setWasSeeking ] = useState(false);

  const hideTimeout = useRef(debounce(() => {
    hideControls(true);
    setIsHovering(false);
  }, 2500, { leading: false, trailing: true }));

  useEffect(() => {
    if (seeking) {
      setWasSeeking(true);
    }

    const timeout = setTimeout(() => {
      setWasSeeking(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
    };
  }, [ seeking ]);

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
  const headerLeft = Children.map(children, (child) => {
    if (child.type === HeaderLeft) {
      return child;
    }
    return null;
  }).filter(Boolean);
  const headerRight = Children.map(children, (child) => {
    if (child.type === HeaderRight) {
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
      'ne-player-controls--hidden': playing && autohide && controlsHidden && !isHovering && !wasSeeking,
      'ne-player-controls--seeking': seeking
    })}>
      {(headerLeft || headerRight) && (
        <div className='ne-player-controls-header'>
          <div className="ne-player-controls-header-content">
            {headerLeft}
          </div>
          <div className='ne-player-controls-header-actions'>
            {headerRight}
          </div>
        </div>
      )}
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

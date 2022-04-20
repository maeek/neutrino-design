import { Children, ReactElement, ReactNode } from 'react';
import { SeekBar } from './SeekBar';
import './styles/controls.scss';

export interface ControlsProps {
  children?: ReactElement | ReactElement[];
  renderer?: ReactNode;
}

export const LeftControls = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);
export const RightControls = ({ children }: { children: ReactNode}) => (
  <>{children}</>
);

export const Controls = ({ children, renderer }: ControlsProps) => {
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

  return (
    <div className='ne-player-controls'>
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

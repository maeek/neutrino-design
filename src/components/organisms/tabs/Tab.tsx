// React tab component

import { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import classNames from 'classnames';
import { useTabContext } from './TabsContext';

export interface TabProps {
  index: number;
  children: ReactNode;
  disabled?: boolean;
  onClick?: MouseEventHandler;
  style?: CSSProperties;
  className?: string;
}

export const Tab = (props: TabProps) => {
  const {
    children,
    disabled = false,
    onClick,
    style,
    className
  } = props;
  const tabs = useTabContext();

  return (
    <div

      className={classNames(
        'ne-tab',
        {
          'ne-tab--disabled': disabled
        },
        className
      )}
      style={style}
      tabIndex={0}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

import { ReactNode, MouseEvent, useState, useCallback } from 'react';
import classNames from 'classnames';
import './styles/bubble-actions.scss';
import { BubbleType } from './BubbleAvatar';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useMediaQuery } from 'react-responsive';

export interface BubbleAction {
  key: string;
  name: string;
  icon?: string | ReactNode;
  onClick: (event: MouseEvent) => void;
  children?: ReactNode;
}

export interface BubbleActionsProps {
  actions?: BubbleAction[];
  className?: string;
  type?: BubbleType;
  visible?: boolean;
}

export const BubbleActions = (props: BubbleActionsProps) => {
  const {
    className,
    actions = [],
    type = 'sender',
    visible
  } = props;
  const { onEnterOrSpace } = useAccessibility();
  const isPc = useMediaQuery({ query: '(min-width: 768px)' });

  const [ xAutoPosition, setXAutoPosition ] = useState<number | null>(null);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    // adjust overflow when children is out of the window, on left side or right side
    const { left, width } = node.getBoundingClientRect();
    const { innerWidth } = window;

    if (left < 0) {
      setXAutoPosition(-left + 10);
    } else if (left + width > innerWidth) {
      setXAutoPosition(innerWidth - left - width);
    } else {
      setXAutoPosition(null);
    }
  }, []);

  const actionsNode = actions.map((action, i) => (
    <li
      key={action.key}
      className='ne-bubble-actions-item'
      tabIndex={i + 1}
      onClick={visible ? action.onClick : undefined}
      onKeyUp={visible ? onEnterOrSpace(action.onClick) : undefined}
    >
      {action.icon}
      {
        action.children
          ? (
            <div
              className='ne-bubble-actions-item-children'
              ref={containerRef}
              style={{ left: `${xAutoPosition}px` }}
            >
              {action.children}
            </div>
          )
          : null
      }
    </li>
  ));

  return (
    actions?.length ? (
      <ul className={classNames(
        'ne-bubble-actions', {
          'ne-bubble-actions--left': type === 'sender',
          'ne-bubble-actions--right': type === 'recipient',
          'ne-bubble-actions--visible': visible,
          'ne-bubble-actions--pc': isPc
        },
        className
      )}
      >
        {actionsNode}
      </ul>
    ) : null
  );
};

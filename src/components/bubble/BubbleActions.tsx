import { ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';
import './styles/bubble-actions.scss';

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
}

export const BubbleActions = (props: BubbleActionsProps) => {
  const {
    className,
    actions = []
  } = props;

  const actionsNode = actions.map((action, i) => (
    <li
      key={action.key}
      className='ne-bubble-actions-item'
      tabIndex={i + 1}
    >
      {action.icon}
      {
        action.children
          ? (
            <div className='ne-bubble-actions-item-children'>
              {action.children}
            </div>
          )
          : null
      }
    </li>
  ));

  return (
    actions?.length ? (
      <ul className={classNames('ne-bubble-actions', className)}>
        {actionsNode}
      </ul>
    ) : null
  );
};

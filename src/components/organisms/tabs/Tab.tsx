import { ReactNode, MouseEventHandler, CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';
import { CloseRounded } from '@material-ui/icons';
import { useAccessibility } from '../../../hooks/useAccessibility';
import './styles/tab.scss';

export interface TabProps {
  index: number;
  children: ReactNode;
  title: ReactNode;
  active?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  onClick?: MouseEventHandler;
  onClose?: MouseEventHandler;
  moveTab?: (dragIndex: number, hoverIndex: number) => void;
  style?: CSSProperties;
  className?: string;
}

export const Tab = forwardRef<HTMLLIElement, TabProps>((props, ref) => {
  const {
    index,
    title,
    disabled = false,
    active,
    onClick,
    onClose,
    draggable,
    style,
    className
  } = props;
  const { onEnterOrSpace } = useAccessibility();

  const onCloseClick: MouseEventHandler = (e) => {
    if (disabled) return;

    e.stopPropagation();
    onClose?.(e);
  };

  return (
    <li
      className={classNames(
        'ne-tab',
        {
          'ne-tab--disabled': disabled,
          'ne-tab--active': active
        },
        className
      )}
      style={style}
      onClick={disabled ? undefined : onClick}
      onKeyUp={disabled ? undefined : onEnterOrSpace(onClick)}
      tabIndex={disabled ? -1 : 0}
      role="tab"
      draggable={draggable}
      ref={ref}
      title={`${
        typeof title === 'string'
          ? title
          : undefined
      }${disabled && ' (Disabled)'}`
      }
      data-index={index}
    >
      <div className="ne-tab-title">
        {title}
      </div>
      {
        onClose && !disabled && (
          <div role="button" className="ne-tab-close" title="Close tab" onClick={onCloseClick}>
            <CloseRounded />
          </div>
        )
      }
    </li>
  );
});

Tab.displayName = 'Tab';

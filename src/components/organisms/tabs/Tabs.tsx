import {
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent
} from 'react';
import classNames from 'classnames';
import { Tab } from './Tab';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import './styles/tabs.scss';

export interface TabsProps {
  children: ReactElement;
  onTabChange?: (index: number) => void;
  onTabClose?: (index: number) => void;
  onOrderChange?: (order: number[]) => void;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  showControlls?: boolean;
}

export const Tabs = (props: TabsProps) => {
  const {
    children,
    onTabClose,
    onTabChange,
    disabled,
    className,
    style,
    showControlls
  } = props;
  const [ selectedTab, setSelectedTab ] = useState<number | null>(null);
  const [ order, setOrder ] = useState<number[]>([]);
  const scrollingPanel = useRef(null);

  useEffect(() => {
    const tabs = Children.map(
      children,
      child => child.type === Tab ? child : null
    )
      .filter(Boolean);
    const tabsLength = tabs.length;

    if (tabsLength > 0) {
      setSelectedTab(0);
      setOrder(Array.from(tabs.keys()));
    } else {
      setSelectedTab(null);
    }
  }, [ children ]);

  const tabChildren = useMemo(
    () => Children.map(children, child => child)
      .filter(child => child.type === Tab),
    [ children ]
  );

  const onTabSelect = (index: number) => {
    if (disabled) return;

    setSelectedTab(index);
    onTabChange?.(index);
  };

  const onLeftArrowClick = () => {
    const newIndex = selectedTab - 1;
    const calculatedIndex = newIndex < 0 ? 0 : newIndex;

    if (disabled || tabChildren[ calculatedIndex ].props.disabled) return;

    setSelectedTab(newIndex < 0 ? 0 : newIndex);
  };

  const onRightArrowClick = () => {
    const newIndex = selectedTab + 1;
    const calculatedIndex = newIndex === tabChildren.length ? tabChildren.length - 1 : newIndex;

    if (disabled || tabChildren[ calculatedIndex ].props.disabled) return;

    setSelectedTab(calculatedIndex);
  };

  const onWheel = (e: WheelEvent<HTMLUListElement>) => {
    const x = e.deltaX;
    const y = e.deltaY;

    scrollingPanel.current.scrollBy({
      left: (Math.abs(x) > Math.abs(y) ? x : y) * 0.1
    });
  };

  const onScroll = (e: WheelEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={classNames('ne-tabs', className)} style={style}>
      <div className="ne-tabs-panel">
        <ul className="ne-tabs-panel-left" onScroll={onScroll} onWheel={onWheel} ref={scrollingPanel}>
          {
            order.map((index) => {
              return cloneElement(tabChildren[ index ], {
                index,
                active: selectedTab === index,
                onClick: () => onTabSelect(index),
                onClose: () => onTabClose?.(index),
                ...tabChildren[ index ].props,
                disabled: tabChildren[ index ].props.disabled || disabled
              });
            })
          }
        </ul>
        {
          showControlls && (
            <div className="ne-tabs-panel-right">
              <span className="ne-tabs-panel-btn" onClick={onLeftArrowClick}><KeyboardArrowLeft/></span>
              <span className="ne-tabs-panel-btn" onClick={onRightArrowClick}><KeyboardArrowRight/></span>
            </div>
          )
        }
      </div>
      <div className="ne-tabs-content">
        {
          tabChildren.map((child, index) => {
            if (selectedTab === index) {
              return child.props.children;
            }

            return null;
          }).filter(Boolean)
        }
      </div>
    </div>
  );
};

export { Tab, TabProps } from './Tab';

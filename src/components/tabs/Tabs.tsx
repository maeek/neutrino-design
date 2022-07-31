import {
  Children,
  cloneElement,
  createRef,
  CSSProperties,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
  DragEvent,
  MutableRefObject
} from 'react';
import classNames from 'classnames';
import { Tab } from './Tab';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

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
  type?: 'compact' | 'default';
}

export const Tabs = (props: TabsProps) => {
  const {
    children,
    onTabClose,
    onTabChange,
    disabled,
    className,
    style,
    showControlls,
    type
  } = props;
  const [ selectedTab, setSelectedTab ] = useState<number | null>(null);
  const [ order, setOrder ] = useState<number[]>([]);
  const scrollingPanel = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<{ index: number; element: MutableRefObject<HTMLLIElement> }[]>([]);

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
    if (selectedTab === null || disabled) return;

    const newIndex = selectedTab - 1;
    const calculatedIndex = newIndex < 0 ? 0 : newIndex;

    if (tabChildren[ calculatedIndex ].props.disabled) return;

    setSelectedTab(newIndex < 0 ? 0 : newIndex);
  };

  const onRightArrowClick = () => {
    if (selectedTab === null || disabled) return;

    const newIndex = selectedTab + 1;
    const calculatedIndex = newIndex === tabChildren.length ? tabChildren.length - 1 : newIndex;

    if (tabChildren[ calculatedIndex ].props.disabled) return;

    setSelectedTab(calculatedIndex);
  };

  const onWheel = (e: WheelEvent<HTMLUListElement>) => {
    const x = e.deltaX;
    const y = e.deltaY;

    if (scrollingPanel.current === null) return;

    scrollingPanel.current.scrollBy({
      left: (Math.abs(x) > Math.abs(y) ? x : y) * 0.1
    });
  };

  const onScroll = (e: WheelEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrag = (e: DragEvent<HTMLUListElement>) => {
    e.dataTransfer.setData('dragIndex', e.currentTarget.dataset?.index || '');
  };

  const onDrop = (e: DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const dragIndex = Number(e.dataTransfer.getData('dragIndex'));
    const hoverIndex = Number(e.currentTarget.getAttribute('data-index'));

    if (dragIndex === hoverIndex) return;

    const newOrder = [ ...order ];
    newOrder.splice(hoverIndex, 0, newOrder.splice(dragIndex, 1)[ 0 ]);

    setOrder(newOrder);
  };

  return (
    <div className={classNames('ne-tabs', className)} style={style}>
      <div className="ne-tabs-panel">
        <ul className="ne-tabs-panel-left" onScroll={onScroll} onWheel={onWheel} ref={scrollingPanel}>
          {
            order.map((index, i) => {
              const foundRef = tabsRef.current.find(ref => ref.index === index);
              const currRef = foundRef?.element || createRef();

              if (!foundRef) {
                tabsRef.current.push({
                  index,
                  element: currRef as MutableRefObject<HTMLLIElement>
                });
              }

              return cloneElement(tabChildren[ index ], {
                index: i,
                ref: currRef,
                type,
                active: selectedTab === index,
                onClick: () => onTabSelect(index),
                onClose: () => onTabClose?.(index),
                onDrag,
                onDrop,
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

export { Tab } from './Tab';
export type { TabProps } from './Tab';

import {
  createRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  useMemo,
  MutableRefObject,
  RefObject
} from 'react';
import classNames from 'classnames';
import { KeyboardArrowDown } from '@material-ui/icons';
import { useAccessibility } from '../../../hooks/useAccessibility';
import { useContinuativeSearch } from '../../../hooks/useContinuativeSearch';
import { useClickOutside } from '../../../hooks/useClickOutside';
import './select.scss';

export interface ItemDefinition {
  index: number;
  value: string;
  render: (() => ReactNode) | ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface SelectProps {
  name: string;
  placeholder?: string | ReactNode;
  items: ItemDefinition[]
  onChange: (selectedIndexes: number[]) => void;
  selectedIndexes: number[] | null;
  className?: string;
  disabled?: boolean;
  // TODO: refactor
  multiple?: boolean;
  highlightSearched?: boolean;
}

export const Select = (props: SelectProps) => {
  const {
    items,
    onChange,
    selectedIndexes,
    className,
    placeholder,
    multiple,
    highlightSearched
  } = props;
  const {
    onEnterOrSpace,
    onArrowUp,
    onArrowDown,
    onEscape
  } = useAccessibility();
  const selectRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<RefObject<HTMLLIElement>[]>([]);
  const [ selectedItems, setSelectItems ] = useState<number[] | null | undefined>();
  const [ isOpened, setIsOpened ] = useState<boolean | null>(null);
  const itemsValues = useMemo(() => items.map(item => item.value), [ items ]);
  const { search, firstIndex, value: searchValue } = useContinuativeSearch(itemsValues);

  useClickOutside(() => {
    setIsOpened(false);
  }, selectRef as MutableRefObject<HTMLDivElement>);

  const handleChange = (item: ItemDefinition) => {
    if (multiple) {
      setSelectItems(p => (
        p?.includes(item.index)
          ? p?.filter(i => i !== item.index)
          : [ ...(p || []), item.index ]
      ));
    } else {
      setSelectItems(p => p !== null && p?.includes(item.index) ? null : [ item.index ]);
    }
  };

  const onItemKeyUpHandler = (item: ItemDefinition, i: number) => (e: any) => {
    onEnterOrSpace((evt: KeyboardEvent) => {
      evt.stopPropagation();
      if (selectedIndexes === undefined) {
        handleChange(item);
      }

      if (evt.key !== ' ') {
        setIsOpened(false);
        selectRef.current?.focus();
      }
    })(e);

    onArrowUp((evt: KeyboardEvent) => {
      evt.stopPropagation();
      if (i === 0) {
        itemsRef.current[ items.length - 1 ]?.current?.focus();
      } else {
        itemsRef.current[ i - 1 ]?.current?.focus();
      }
    })(e);

    onArrowDown((evt: KeyboardEvent) => {
      evt.stopPropagation();
      if (i === items.length - 1) {
        itemsRef.current[ 0 ]?.current?.focus();
      } else {
        itemsRef.current[ i + 1 ]?.current?.focus();
      }
    })(e);

    onEscape((evt: KeyboardEvent) => {
      evt.stopPropagation();
      setIsOpened(false);
      selectRef.current?.focus();
    })(e);

    search(e);
  };

  const getHighlightNode = (value: string, matcher: string) => {
    const index = value.toLowerCase().indexOf(matcher);
    const before = value.substring(0, index);
    const inbetween = value.substring(index, index + matcher.length);
    const after = value.substring(index + matcher.length);
    return (
      <>
        { before }
        <span className="ne-select-list-item-highlighted">{ inbetween }</span>
        { after }
      </>
    );
  };

  const onSelectedHandler = (e: KeyboardEvent) => {
    search(e);
    setIsOpened(p => !p);
  };

  useEffect(() => {
    if (selectedIndexes === undefined) return;

    setSelectItems(selectedIndexes);
  }, [ selectedIndexes ]);

  useEffect(() => {
    if (isOpened && itemsRef.current.length && firstIndex !== null) {
      const selectedItem = itemsRef.current[ firstIndex || 0 ];
      selectedItem?.current?.focus();
    }
  }, [ firstIndex, isOpened ]);

  useEffect(() => {
    if (isOpened === false && selectedIndexes === undefined) {
      onChange?.(selectedItems || []);
    }

    if (isOpened) {
      const firstIndex = !selectedItems || (Array.isArray(selectedItems) && selectedItems.length === 0)
        ? 0
        : selectedItems[ selectedItems.length - 1 ];
      itemsRef.current[ firstIndex ]?.current?.focus();
      return;
    }

    if (isOpened !== null) {
      selectRef.current?.focus();
    }
  }, [ isOpened, onChange, selectedIndexes, selectedItems ]);

  const listNode = (
    <ul className={classNames('ne-select-list')}>
      {
        items?.map((item, i) => {
          let ref: RefObject<HTMLLIElement> = itemsRef.current[ i ];
          if (!itemsRef.current[ i ]) {
            ref = createRef<HTMLLIElement>();
            itemsRef.current.push(ref);
          }

          return (
            <li
              key={item.index}
              ref={ref}
              className={classNames('ne-select-list-item', {
                'ne-select-list-item--selected': selectedItems?.includes(item.index)
              })}
              tabIndex={0}
              onKeyUp={onItemKeyUpHandler(item, i)}
              onClick={() => {
                if (selectedIndexes === undefined) {
                  handleChange(item);
                }

                selectRef.current?.focus();
              }}
            >
              {
                (typeof item.render === 'function' ? item.render() : item.render)
                || (
                  highlightSearched
                  && item.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                  && searchValue.length > 1
                    ? (
                      getHighlightNode(item.value, searchValue)
                    )
                    : item.value
                )
              }
            </li>
          );
        })
      }
    </ul>
  );

  const isPlaceholder = (
    !selectedItems || (Array.isArray(selectedItems) && selectedItems.length === 0)
  ) && !searchValue;
  const activeClasses = {
    'ne-select-active--placeholder': isPlaceholder
  };
  return (
    <div
      className={classNames('ne-select', className)}
      onClick={() => setIsOpened(p => !p)}
      tabIndex={0}
      ref={selectRef}
      onKeyUp={onEnterOrSpace(onSelectedHandler)}
    >
      <label className='ne-select-label'>
        <div className={classNames('ne-select-active', activeClasses)}>
          {
            searchValue || (
              Array.isArray(selectedItems) && selectedItems.length > 0
                ? items?.filter(item => selectedItems.includes(item.index))
                  .map(item => item.value).join(', ')
                : placeholder
            )
          }
          <div
            className={classNames('ne-select-active-icon', { 'ne-select-active-icon--opened': isOpened })}
          >
            <KeyboardArrowDown />
          </div>
        </div>
        {
          isOpened && listNode
        }
      </label>
    </div>
  );
};

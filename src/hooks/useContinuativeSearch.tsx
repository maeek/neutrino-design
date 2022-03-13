import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAccessibility } from './useAccessibility';

const CANCEL_TIMEOUT = 1000;

export const useContinuativeSearch = (items: string[], timeout = CANCEL_TIMEOUT) => {
  const [ value, setValue ] = useState('');
  const [ firstIndex, setFirstIndex ] = useState<number | null>(null);
  const [ foundItems, setFoundItems ] = useState<string[]>([]);
  const resetTimeout = useRef(null);
  const {
    onEnterOrSpace,
    onEscape
  } = useAccessibility();

  useEffect(() => {
    if (value.length > 1) {
      const index = items.findIndex((item) => item.toLowerCase().startsWith(value));
      setFirstIndex(index);
      setFoundItems(items.filter((item) => item.toLowerCase().startsWith(value)));
    }
    else {
      setFirstIndex(null);
    }
  }, [ items, value ]);

  useEffect(() => {
    const cancelQuery = () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      setValue('');
    };

    window.addEventListener('click', cancelQuery);
    return () => {
      window.removeEventListener('click', cancelQuery);
    };
  }, []);

  const search = useCallback((e: KeyboardEvent) => {
    e.stopPropagation();
    const acceptedKeys = [ 'Key', 'Digit', 'Numpad' ];

    if (acceptedKeys.some(key => e.code.toLowerCase().startsWith(key.toLowerCase()))) {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);

      setValue(v => v + e.key.toLowerCase());
      resetTimeout.current = setTimeout(() => setValue(''), timeout);
    }

    const cancelQuery = () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      setValue('');
    };

    onEnterOrSpace(cancelQuery)(e);
    onEscape(cancelQuery)(e);

  }, [ onEnterOrSpace, onEscape, timeout ]);

  return {
    value,
    firstIndex,
    foundItems,
    search
  };
};

import { useCallback, KeyboardEvent } from 'react';

type EventHandlerMatcherType = string | string[] | (() => boolean | string | string[]) | boolean;

export const keyboardEventHandler =
  (handler: unknown, match: EventHandlerMatcherType) => (event: KeyboardEvent<Element>) => {
    let matchResult: boolean = typeof match === 'boolean' ? match : false;

    if (typeof match === 'function') {
      match = match();
    }
    if (typeof match === 'string') {
      matchResult = event.key === match;
    }
    if (Array.isArray(match)) {
      matchResult = match.includes(event.key);
    }

    if (matchResult) {
      event.preventDefault();
      (handler as (...args: unknown[]) => unknown)(event);
    }
  };

export const useAccessibility = () => {
  const onEnter = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Enter'), []);
  const onSpace = useCallback((callback: unknown) => keyboardEventHandler(callback, ' '), []);
  const onEnterOrSpace = useCallback((callback: unknown) => keyboardEventHandler(callback, ['Enter', ' ']), []);
  const onEscape = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Escape'), []);
  const onArrowUp = useCallback((callback: unknown) => keyboardEventHandler(callback, 'ArrowUp'), []);
  const onArrowDown = useCallback((callback: unknown) => keyboardEventHandler(callback, 'ArrowDown'), []);
  const onArrowLeft = useCallback((callback: unknown) => keyboardEventHandler(callback, 'ArrowLeft'), []);
  const onArrowRight = useCallback((callback: unknown) => keyboardEventHandler(callback, 'ArrowRight'), []);
  const onTab = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Tab'), []);
  const onBackspace = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Backspace'), []);
  const onDelete = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Delete'), []);
  const onHome = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Home'), []);
  const onEnd = useCallback((callback: unknown) => keyboardEventHandler(callback, 'End'), []);
  const onShift = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Shift'), []);
  const onControl = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Control'), []);
  const onAlt = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Alt'), []);
  const onMeta = useCallback((callback: unknown) => keyboardEventHandler(callback, 'Meta'), []);

  return {
    onEnter,
    onSpace,
    onEscape,
    onEnterOrSpace,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onTab,
    onBackspace,
    onDelete,
    onHome,
    onEnd,
    onShift,
    onControl,
    onAlt,
    onMeta
  };
};

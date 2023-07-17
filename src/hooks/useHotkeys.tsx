import { useEffect } from 'react';

export type UseHotKeysMapping = [[string, (event: KeyboardEvent) => void, ...Array<(event: KeyboardEvent) => void>]];

const shouldFire = (event: KeyboardEvent): boolean => {
  if (event.target instanceof HTMLElement) {
    return !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName);
  }

  return true;
};

interface NormalizedKeybinds {
  key: string;
  meta: boolean;
  mod: boolean;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}

const SPECIAL_KEYS = ['meta', 'ctrl', 'shift', 'alt', 'mod'];
const normalizeKeybinds = (mapping: string): NormalizedKeybinds => {
  const keybinds = mapping.split('+');

  return {
    key: (keybinds.find(key => !SPECIAL_KEYS.includes(key)) || '').toLowerCase(),
    meta: keybinds.includes('meta'),
    mod: keybinds.includes('mod'),
    ctrl: keybinds.includes('ctrl'),
    shift: keybinds.includes('shift'),
    alt: keybinds.includes('alt')
  };
};

const isExactMatch = (match: NormalizedKeybinds, event: KeyboardEvent): boolean => {
  return (
    event.ctrlKey === match.ctrl &&
    event.shiftKey === match.shift &&
    event.altKey === match.alt &&
    event.metaKey === match.meta &&
    event.key === match.key
  );
};

export const useHotkeys = (mapping: UseHotKeysMapping) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (!shouldFire(event)) return;

      mapping.forEach(([key, ...handlers]) => {
        const normalized = normalizeKeybinds(key.toLowerCase());

        if (isExactMatch(normalized, event)) {
          handlers.forEach(handler => handler(event));
        }
      });
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [mapping]);
};

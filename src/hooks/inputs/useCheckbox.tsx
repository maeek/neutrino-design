import { useEffect, useState, ChangeEvent } from 'react';

export interface UseCheckbox {
  checked: boolean;
  setChecked: (value: boolean | ((prevState: boolean) => boolean)) => void;
  reset: () => void;
  bind: {
    checked: boolean;
    onChange: (event: ChangeEvent<unknown>) => void;
  };
}

export const useCheckbox = (initialValue?: boolean, readOnly?: boolean): UseCheckbox => {
  const [checked, setChecked] = useState(!!initialValue);

  useEffect(() => {
    setChecked(!!initialValue);
  }, [initialValue]);

  return {
    checked,
    setChecked,
    reset: () => setChecked(!!initialValue),
    bind: {
      checked,
      onChange: event => !readOnly && setChecked((event.target as HTMLInputElement).checked)
    }
  };
};

export default useCheckbox;

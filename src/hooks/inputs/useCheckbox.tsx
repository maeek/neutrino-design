import { useEffect, useState } from 'react';

export interface UseCheckbox {
  checked: boolean;
  setChecked: (value: boolean | ((prevState: boolean) => boolean)) => void;
  reset: () => void;
  bind: {
    checked: boolean;
    onChange: (event: React.ChangeEvent<any>) => void;
  };
}

export const useCheckbox = (
  initialValue?: boolean,
  readOnly?: boolean
): UseCheckbox => {
  const [ checked, setChecked ] = useState(!!initialValue);

  useEffect(() => {
    setChecked(!!initialValue);
  }, [ initialValue ]);

  return {
    checked,
    setChecked,
    reset: () => setChecked(!!initialValue),
    bind: {
      checked,
      onChange: (event) => !readOnly && setChecked(event.target.checked)
    }
  };
};

export default useCheckbox;

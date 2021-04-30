import { ChangeEvent, useState } from 'react';

export interface UseInput {
  value: string;
  setValue: (text: string) => void;
  reset: () => void;
  bind: {
    value: string;
    onChange: (event: ChangeEvent<any>) => void;
  };
}

export const useInput = (initialValue: string): UseInput => {
  const [ value, setValue ] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => setValue(event.target.value)
    }
  };
};

export default useInput;

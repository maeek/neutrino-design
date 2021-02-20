import { useEffect, useState } from 'react';

export const useConnection = (): boolean | null => {
  const [connectionState, setConnectionState] = useState<boolean | null>(null);

  const updateNetwork = () => {
    if (window.navigator.onLine) {
      setConnectionState(true);
    } else {
      setConnectionState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('offline', updateNetwork);
    window.addEventListener('online', updateNetwork);
    return () => {
      window.removeEventListener('offline', updateNetwork);
      window.removeEventListener('online', updateNetwork);
    };
  }, []);

  return connectionState;
};

export default useConnection;

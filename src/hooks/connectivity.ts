import { useEffect, useState } from 'react';

export default (): boolean | null => {
  const [connectionState, setConnectionState] = useState(null);

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

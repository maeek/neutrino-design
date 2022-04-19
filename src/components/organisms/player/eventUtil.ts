export const listenToEvent = (
  element: HTMLElement,
  eventName: string,
  callback: (...args: unknown[]) => void,
  options?: boolean | AddEventListenerOptions
) => {
  const unsubscribe = () => {
    element.removeEventListener(eventName, callback, options);
  };

  element.addEventListener(eventName, callback, options);

  return unsubscribe;
};

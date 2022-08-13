import { useCallback, useEffect, useRef } from 'react';

/**
 *
 * Delaying function calls, returns a callback to use for cancelling.
 *
 * @param callback - function to call, if a new callback gets created each render, then the previous callback will be cancelled.
 * @param timeout -  delay in ms (default: immediately put into JS Event Queue)
 * @returns - a callback used for cancelling
 */

export const useTimeout = (callback: () => void, timeout = 0): (() => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return () => {
      cancel();
    };
  }, [callback, timeout, cancel]);

  return cancel;
};

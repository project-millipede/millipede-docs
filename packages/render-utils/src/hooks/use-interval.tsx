import { useEffect, useRef } from 'react';

export const useInterval = (cb: () => void, delay: number) => {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    if (delay > 0) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

import { MittEmitter } from '@app/render-utils';
import { features } from '@page/layout';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

/**
 * Note:
 * Do not use the NextJs hook "use-router" in this custom hook; constant re-renders get executed;
 * unfortunately, there are some bugs in the implementation.
 *
 * Instead, the NextJs router events object from the _app component is given as an argument.
 */

export const useResetScrollOnRouteChange = (events: MittEmitter) => {
  const {
    scroll: {
      states: { scrollState }
    }
  } = features;

  const resetScrollState = useResetRecoilState(scrollState);

  useEffect(() => {
    resetScrollState();

    const handleRouteChangeStart = () => resetScrollState();

    events.on('routeChangeStart', handleRouteChangeStart);

    // If the component unmounts, unsubscribe from the event with the 'off' method.
    return () => {
      events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, []);
};

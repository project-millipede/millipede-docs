import { features } from '@page/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

export const useResetScrollOnRouteChange = () => {
  const { events } = useRouter();

  const {
    scroll: {
      states: { scrollState }
    }
  } = features;

  const resetScrollState = useResetRecoilState(scrollState);

  useEffect(() => {
    resetScrollState();

    const handleRouteChange = () => {
      resetScrollState();
    };

    events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, []);
};

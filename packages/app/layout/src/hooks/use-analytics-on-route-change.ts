import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAnalytics } from 'use-analytics';

export const useAnalyticsOnRouteChange = () => {
  const { events } = useRouter();

  const { page } = useAnalytics();

  useEffect(() => {
    page();

    const handleRouteChange = () => {
      page();
    };

    events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe from the event with the `off` method:
    return () => {
      events.off('routeChangeStart', handleRouteChange);
    };
  }, []);
};

import { MittEmitter } from '@app/render-utils';
import { useEffect } from 'react';

/**
 * The scrolling behavior is always set to smooth, see global css.
 * On route change, it switches to auto before it snaps back to smooth.
 *
 * Note:
 * Do not use the nextJs hook "use-router" in this custom hook; constant re-renders get executed;
 * unfortunately, there are some bugs in the implementation.
 *
 * Instead, the nextJs router events object from the _app component is given as an argument.
 */

export const useSmoothScroll = (events: MittEmitter) => {
  const setSmoothScroll = (isSmooth: boolean) => {
    document.documentElement.style.scrollBehavior = isSmooth
      ? 'smooth'
      : 'auto';
  };

  useEffect(() => {
    setSmoothScroll(true);

    const handleRouteChangeStart = () => setSmoothScroll(false);
    const handleRouteChangeComplete = () => setSmoothScroll(true);

    events.on('routeChangeStart', handleRouteChangeStart);
    events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      events.off('routeChangeStart', handleRouteChangeStart);
      events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);
};

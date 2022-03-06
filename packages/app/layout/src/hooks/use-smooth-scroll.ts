import { useRouter } from 'next/router';
import { useEffect } from 'react';

const setSmoothScroll = (isSmooth: boolean) => {
  const html = document.documentElement;
  html.style.setProperty('scroll-behavior', isSmooth ? 'smooth' : 'auto');
};

export const useSmoothScroll = () => {
  const { events } = useRouter();

  useEffect(() => {
    const disableSmoothScrolling = () => setSmoothScroll(false);
    const enableSmoothScrolling = () => setSmoothScroll(true);

    // Enable smooth scrolling by default
    enableSmoothScrolling();

    // Disable smooth scrolling when changing pages
    events.on('routeChangeStart', disableSmoothScrolling);

    // Re-enable smooth scrolling when the route-change completes
    events.on('routeChangeComplete', enableSmoothScrolling);

    // Enable smooth scrolling on hash change
    events.on('hashChangeStart', enableSmoothScrolling);

    return () => {
      // Remove event handlers when the component unmounts
      events.off('routeChangeStart', disableSmoothScrolling);
      events.off('routeChangeComplete', enableSmoothScrolling);
      events.off('hashChangeStart', enableSmoothScrolling);
    };
  }, [events]);
};

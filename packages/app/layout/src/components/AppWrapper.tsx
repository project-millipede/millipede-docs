import { FC } from 'react';

import { useResetScrollOnRouteChange } from '../hooks/use-reset-scroll-on-route-change';
import { useSmoothScroll } from '../hooks/use-smooth-scroll';

export const AppWrapper: FC = ({ children }) => {
  // Use smooth scroll behavior application wide
  useSmoothScroll();

  useResetScrollOnRouteChange();
  return <>{children}</>;
};

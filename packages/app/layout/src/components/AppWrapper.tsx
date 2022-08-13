import { MittEmitter } from '@app/render-utils';
import { FC } from 'react';

import { useResetScrollOnRouteChange } from '../hooks/use-reset-scroll-on-route-change';
import { useSmoothScroll } from '../hooks/use-smooth-scroll';

interface AppWrapperProps {
  events?: MittEmitter;
}

export const AppWrapper: FC<AppWrapperProps> = ({ events, children }) => {
  useSmoothScroll(events);

  useResetScrollOnRouteChange(events);

  return <>{children}</>;
};

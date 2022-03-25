import { FC } from 'react';

import { useAnalyticsOnRouteChange } from '../hooks/use-analytics-on-route-change';

export const Analytics: FC = () => {
  useAnalyticsOnRouteChange();

  return null;
};

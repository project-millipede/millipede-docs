import googleAnalytics from '@analytics/google-analytics';
import { Analytics } from 'analytics';

const TRACKING_CODE_MILLIPEDE = 'UA-151314446-1';

const MEASUREMENT_ID = 'G-2CHT6Q64DP';

export const defaultAnalytics = Analytics({
  app: 'project-millipede',
  plugins: [
    googleAnalytics({
      trackingId: TRACKING_CODE_MILLIPEDE,
      measurementIds: [MEASUREMENT_ID]
    })
  ]
});

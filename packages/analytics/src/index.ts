import googleAnalytics from '@analytics/google-analytics';
import { Analytics } from 'analytics';

const TRACKING_CODE_MILLIPEDE = 'UA-151314446-1';

export const defaultAnalytics = Analytics({
  app: 'awesome-app',
  debug: true,
  plugins: [
    googleAnalytics({
      trackingId: TRACKING_CODE_MILLIPEDE
    })
  ]
});

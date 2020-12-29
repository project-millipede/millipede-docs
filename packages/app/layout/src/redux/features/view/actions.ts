import { action } from 'typesafe-actions';

import { HANDLE_DEVICE } from './actionTypes';

export const handleDevice = (isMobile: boolean) =>
  action(HANDLE_DEVICE, { isMobile });

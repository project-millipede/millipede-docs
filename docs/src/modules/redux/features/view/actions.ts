import { action } from 'typesafe-actions';

import { HANDLE_DEVICE, HANDLE_DRAWER } from './actionTypes';

export const handleDrawer = isDrawerExpanded =>
  action(HANDLE_DRAWER, { isDrawerExpanded });

export const handleDevice = isMobile => action(HANDLE_DEVICE, { isMobile });

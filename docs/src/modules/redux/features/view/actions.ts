import { action } from 'typesafe-actions';

import { HANDLE_DRAWER } from './actionTypes';

export const handleDrawer = isOpen => action(HANDLE_DRAWER, { isOpen });

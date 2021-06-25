import { atom } from 'recoil';

// TOOLBAR
export const TOOLBAR_HEIGHT = 8;

// TABLE OF CONTENTS
export const TOC_TOP = 12;
export const TOC_WIDTH = 30;

// DRAWER
export const MIN_DRAWER_WIDTH = 9;
export const MAX_DRAWER_WIDTH = 40;

// INPUT
export const INPUT_HEIGHT = 6;
export const INPUT_BORDER_RADIUS = INPUT_HEIGHT / 2;

// LABEL
export const LABEL_HEIGHT = 3;
export const LABEL_BORDER_RADIUS = LABEL_HEIGHT / 2;

export const APP_CONTENT_HEADER_HEIGHT = 7;

export const APP_CONTENT_SHARE_DIMENSION = 8;

export const ACTIVE_INDICATOR_WIDTH = 2;

export interface Layout {
  isDrawerExpanded: boolean;
}

export const initialState: Layout = {
  isDrawerExpanded: false
};

export const layoutState = atom({
  key: 'layout',
  default: initialState
});

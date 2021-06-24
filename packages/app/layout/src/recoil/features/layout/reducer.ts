import { atom } from 'recoil';

// TOOLBAR
export const TOOLBAR_HEIGHT = 64;

// TABLE OF CONTENTS
export const TOC_TOP = 96;
export const TOC_WIDTH = 225;

// DRAWER
export const MIN_DRAWER_WIDTH = 72;
export const MAX_DRAWER_WIDTH = 320;

// INPUT
export const INPUT_HEIGHT = 48;
export const INPUT_BORDER_RADIUS = INPUT_HEIGHT / 2;

// LABEL
export const LABEL_HEIGHT = 24;
export const LABEL_BORDER_RADIUS = LABEL_HEIGHT / 2;

export const APP_CONTENT_HEADER_HEIGHT = 56;
export const APP_CONTENT_SHARE_DIMENSION = 56;

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

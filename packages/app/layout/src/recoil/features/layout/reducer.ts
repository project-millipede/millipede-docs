import { atom } from 'recoil';

// TOOLBAR
export const TOOLBAR_HEIGHT = 64;

// TABLE OF CONTENTS
export const TOC_TOP = 96;
export const TOC_WIDTH = 225;

// DRAWER
export const MIN_DRAWER_WIDTH = 72;
export const MAX_DRAWER_WIDTH = 280;

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

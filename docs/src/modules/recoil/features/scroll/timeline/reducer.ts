import { atom } from 'recoil';

export enum VIEW {
  TIMELINE = 0,
  POSTS = 1
}

export interface Views {
  currentViews: { [key: string]: VIEW };
}

export const timelineViewState = atom<Views>({
  key: 'timelineView',
  default: {
    currentViews: {}
  }
});

import { MutableRefObject } from 'react';
import { atom, atomFamily } from 'recoil';

import { SyncHandle } from '../../components/types';
import { SourceToTargetType } from '../../components/types-private';

export type ArcherRef = {
  ref: MutableRefObject<HTMLElement>;
  dynamicRef: MutableRefObject<SyncHandle>;
};

export const archerRefState = atomFamily<ArcherRef, string>({
  key: 'archer-ref-state',
  default: {
    ref: null,
    dynamicRef: null
  },
  dangerouslyAllowMutability: true
});

export interface ArcherTransition {
  sourceToTargetsMap: Array<SourceToTargetType>;
}

export const archerTransitionState = atomFamily<ArcherTransition, string>({
  key: 'archer-transition-state',
  default: {
    sourceToTargetsMap: []
  }
});

export interface ArcherTransitionComposed {
  flattenedTransitions: Array<SourceToTargetType>;
  archerTransitionIds: Array<string>;
}

export const archerTransitionComposedState = atom<ArcherTransitionComposed>({
  key: 'archer-transition-composed-state',
  default: {
    flattenedTransitions: [],
    archerTransitionIds: []
  }
});

import { CollectionUtil } from '@app/utils';
import { EffectRef } from '@huse/effect-ref';
import { atom, atomFamily } from 'recoil';

import { NodesWithRelationsMap, RefContainerScroll, Views } from './types';

export const timelineViewState = atom<Views>({
  key: 'timelineView',
  default: {
    currentViews: {}
  }
});

export const nodesWithRelationsWithEdgeState = atom<NodesWithRelationsMap>({
  key: 'nodesWithRelationsWithEdge',
  default: {
    nodesWithRelations: {},
    activeId: '',
    counter: 0,
    finalSize: 0
  }
});

export const refContainerScrollState = atomFamily<RefContainerScroll, string>({
  key: 'refContainerScroll',
  default: {
    refObserved: null
  }
});

export const refContainerScrollFromArcherState = atomFamily<
  RefContainerScroll,
  string
>({
  key: 'refContainerScrollFromArcher',
  default: {
    refObserved: null
  }
});

const updateObservedItem = (
  state: RefContainerScroll,
  value: EffectRef<HTMLElement>
): RefContainerScroll => {
  return {
    ...state,
    refObserved: value
  };
};

const removeObservedItem = (state: RefContainerScroll): RefContainerScroll => {
  const refObservedUpdated = CollectionUtil.Object.removePropertyFromObject(
    state,
    'refObserved'
  );
  return {
    ...refObservedUpdated
  };
};

export const states = {
  timelineViewState,
  nodesWithRelationsWithEdgeState,
  refContainerScrollState,
  refContainerScrollFromArcherState
};

export const reducers = {
  updateObservedItem,
  removeObservedItem
};

export const selectors = {};

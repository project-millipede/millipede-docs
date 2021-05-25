import { CollectionUtil } from '@app/utils';
import { EffectRef } from '@huse/effect-ref';
import { atom, atomFamily } from 'recoil';

import { NodesWithRelationsMap, RefContainerScroll, Tab, View } from './types';

export const timelineViewState = atomFamily<Tab, string>({
  key: 'timeline-view',
  default: {
    activeTab: View.TIMELINE
  }
});

export const nodesWithRelationsWithEdgeState = atom<NodesWithRelationsMap>({
  key: 'nodes-with-relations-with-edge',
  default: {
    nodesWithRelations: {},
    activeId: '', // describes which element in object nodesWithRelations (map) is active (key)
    finalSize: 0
  }
});

export const refContainerScrollState = atomFamily<RefContainerScroll, string>({
  key: 'ref-container-scroll',
  default: {
    refObserved: undefined
  }
});

export const refContainerScrollFromArcherState = atomFamily<
  RefContainerScroll,
  string
>({
  key: 'ref-container-scroll-from-archer',
  default: {
    refObserved: undefined
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

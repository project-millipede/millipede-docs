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

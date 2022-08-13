import { EffectRef } from '@huse/effect-ref';
import { DefaultValue, selector, selectorFamily } from 'recoil';

import { Scroll } from '../../..';
import { getBodySliceIds, getDockedPostIds, getDockedSliceIds } from './selector-utils';
import { nodesWithRelationsWithEdgeState, refContainerScrollState } from './states';
import { NodeWithRelations, SliceMap, TDockPosition } from './types';

export const refContainerScrollSelector = selectorFamily<
  EffectRef<HTMLElement>,
  string
>({
  key: 'ref-container-scroll-selector',
  get:
    timelineId =>
    ({ get }) => {
      const refContainerScroll = get(refContainerScrollState(timelineId));
      return refContainerScroll.refObserved;
    },
  set:
    timelineId =>
    ({ set, get }, refContainerScroll) => {
      if (refContainerScroll instanceof DefaultValue) {
        console.log('refContainerScrollSelector - default:');
        return;
      }

      console.log('refContainerScrollSelector:');

      const existingRefContainerScroll = get(
        refContainerScrollState(timelineId)
      );
      if (existingRefContainerScroll.refObserved != refContainerScroll) {
        set(refContainerScrollState(timelineId), {
          ...existingRefContainerScroll,
          refObserved: refContainerScroll
        });
      }
    }
});

export const dockedPostIdsSelector = selectorFamily<
  Array<string>,
  { timelineId: string; position: TDockPosition }
>({
  key: 'docked-post-ids-selector',
  get:
    ({ timelineId, position }) =>
    ({ get }) => {
      const state = get(nodesWithRelationsWithEdgeState);
      return getDockedPostIds(timelineId, position, state);
    }
});

export const dockedSliceIdsSelector = selectorFamily<
  Array<SliceMap>,
  { timelineId: string; postId: string }
>({
  key: 'docked-slice-ids-selector',
  get:
    ({ timelineId, postId }) =>
    ({ get }) => {
      const state = get(nodesWithRelationsWithEdgeState);
      return getDockedSliceIds(timelineId, postId, state);
    }
});

export const bodySliceIdsSelector = selector<Array<Array<NodeWithRelations>>>({
  key: 'body-slice-ids-selector',
  get: ({ get }) => {
    const state = get(nodesWithRelationsWithEdgeState);
    return getBodySliceIds(state);
  }
});

export const actionCursorLengthSelector = selector<number>({
  key: 'active-cursor-length-selector',
  get: ({ get }) => {
    const state = get(nodesWithRelationsWithEdgeState);

    const { activeId, nodesWithRelations } = state;

    const activeNodesWithRelations =
      nodesWithRelations?.[activeId] ??
      ([
        { nodeWithRelations: [] }
      ] as Array<Scroll.Timeline.NodeWithRelationsWithEdge>);

    const [{ nodeWithRelations }] = activeNodesWithRelations;
    return nodeWithRelations.length;
  }
});

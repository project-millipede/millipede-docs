import { isEmptyString } from '@app/utils/src/string';
import {
  getSelectedPostIds,
  getSelectedSliceIds,
  getSelectedSliceIdsBody,
  SliceMap,
  TDockPosition,
} from '@demonstrators-social/flow/src/components/flow/Dock.svc';
import { EffectRef } from '@huse/effect-ref';
import { selector, selectorFamily } from 'recoil';

import { scrollStates } from '../../../..';
import { refContainerScrollState } from './reducer';
import { NodeWithRelations } from './types';

export const refContainerScrollSelector = selectorFamily<
  EffectRef<HTMLElement>,
  string
>({
  key: 'ref-container-scroll-selector',
  get:
    timelineId =>
    ({ get }) => {
      if (isEmptyString(timelineId)) return null;
      const refContainerScroll = get(refContainerScrollState(timelineId));
      return refContainerScroll.refObserved;
    },
  set:
    timelineId =>
    ({ set, get }, refContainerScroll) => {
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

export const postIdsSelector = selectorFamily<
  Array<string>,
  { timelineId: string; position: TDockPosition }
>({
  key: 'postIds-selector',
  get:
    ({ timelineId, position }) =>
    ({ get }) => {
      const {
        timeline: { nodesWithRelationsWithEdgeState }
      } = scrollStates;

      const value = get(nodesWithRelationsWithEdgeState);
      return getSelectedPostIds(timelineId, value, position);
    }
});

export const sliceIdsBodySelector = selector<Array<Array<NodeWithRelations>>>({
  key: 'sliceIds-body-selector',
  get: ({ get }) => {
    const {
      timeline: { nodesWithRelationsWithEdgeState }
    } = scrollStates;

    const value = get(nodesWithRelationsWithEdgeState);
    return getSelectedSliceIdsBody(value);
  }
});

export const sliceIdsSelector = selectorFamily<Array<SliceMap>, string>({
  key: 'sliceIds-selector',
  get:
    (timelineId: string) =>
    ({ get }) => {
      const {
        timeline: { nodesWithRelationsWithEdgeState }
      } = scrollStates;

      const value = get(nodesWithRelationsWithEdgeState);
      return getSelectedSliceIds(timelineId, value);
    }
});

export const selectors = {
  refContainerScrollSelector,
  postIdsSelector,
  sliceIdsBodySelector,
  sliceIdsSelector
};

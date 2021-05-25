import { CollectionUtil } from '@app/utils';
import { isEmptyString } from '@app/utils/src/string';
import { EffectRef } from '@huse/effect-ref';
import { atomFamily, selectorFamily } from 'recoil';

import { RefPostScrollType } from './types';

const postIdsState = atomFamily<Array<string>, string>({
  key: 'post-ids',
  default: []
});

const postIdsSelector = selectorFamily<Array<string>, string>({
  key: 'post-ids-selector',
  get:
    timelineId =>
    ({ get }) => {
      if (isEmptyString(timelineId)) return [];
      const postIds = get(postIdsState(timelineId));
      return postIds;
    },
  set:
    timeline =>
    ({ set }, newPostIds) => {
      set(postIdsState(timeline), newPostIds);
    }
});

export const refPostScrollState = atomFamily<RefPostScrollType, string>({
  key: 'ref-post-scroll',
  default: {}
});

const updateObservedItem = (
  state: RefPostScrollType,
  timelineId: string,
  value: EffectRef<HTMLElement>
): RefPostScrollType => {
  return {
    ...state,
    [timelineId]: {
      ...state[timelineId],
      refObserved: value
    }
  };
};

const removeObservedItem = (
  state: RefPostScrollType,
  timelineId: string
): RefPostScrollType => {
  const refObservedUpdated = CollectionUtil.Object.removePropertyFromObject(
    state[timelineId],
    'refObserved'
  );

  return {
    ...state,
    [timelineId]: {
      ...refObservedUpdated
    }
  };
};

const updateObservedSubSliceItem = (
  state: RefPostScrollType,
  timelineId: string,
  sliceId: string,
  value: EffectRef<HTMLElement>
): RefPostScrollType => {
  return {
    ...state,
    [timelineId]: {
      ...state[timelineId],
      refObservedSubSlices: {
        ...state[timelineId]?.refObservedSubSlices,
        [sliceId]: value
      }
    }
  };
};

const removeObservedSubSliceItem = (
  state: RefPostScrollType,
  timelineId: string,
  sliceId: string
): RefPostScrollType => {
  const { refObservedSubSlices } = state[timelineId];

  const refObservedSubSlicesUpdated =
    CollectionUtil.Object.removePropertyFromObject(
      refObservedSubSlices,
      sliceId
    );

  return {
    ...state,
    [timelineId]: {
      ...state[timelineId],
      refObservedSubSlices: refObservedSubSlicesUpdated
    }
  };
};

export const states = {
  postIdsState,
  refPostScrollState
};

export const reducers = {
  updateObservedItem,
  updateObservedSubSliceItem,
  removeObservedItem,
  removeObservedSubSliceItem
};

export const selectors = {
  postIdsSelector
};

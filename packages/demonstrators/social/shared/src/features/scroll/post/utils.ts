import { CollectionUtil } from '@app/utils';
import { EffectRef } from '@huse/effect-ref';

import { RefPostScrollMap } from './types';

export const updateObservedItem = (
  state: RefPostScrollMap,
  timelineId: string,
  value: EffectRef<HTMLElement>
): RefPostScrollMap => {
  return {
    ...state,
    [timelineId]: {
      ...state[timelineId],
      refObserved: value
    }
  };
};

export const removeObservedItem = (
  state: RefPostScrollMap,
  timelineId: string
): RefPostScrollMap => {
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

export const updateObservedSubSliceItem = (
  state: RefPostScrollMap,
  timelineId: string,
  sliceId: string,
  value: EffectRef<HTMLElement>
): RefPostScrollMap => {
  // if (state[timelineId]?.refObservedSubSlices[sliceId]) return state;

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

export const removeObservedSubSliceItem = (
  state: RefPostScrollMap,
  timelineId: string,
  sliceId: string
): RefPostScrollMap => {
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

import { EffectRef } from '@huse/effect-ref';
import { atomFamily } from 'recoil';

import { CollectionUtil } from '../../../../utils';

export const postIdsState = atomFamily<Array<string>, string>({
  key: 'postIds',
  default: []
});

export interface RefPostScroll {
  refObserved: EffectRef<HTMLElement>;
  refObservedSubSlices: { [key: string]: EffectRef<HTMLElement> };
}

export type RefPostScrollType = {
  [value: string]: RefPostScroll;
};

export const refPostScrollState = atomFamily<RefPostScrollType, string>({
  key: 'refPostScroll',
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

  const refObservedSubSlicesUpdated = CollectionUtil.Object.removePropertyFromObject(
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

export const scrollPostReducer = {
  updateObservedItem,
  updateObservedSubSliceItem,
  removeObservedItem,
  removeObservedSubSliceItem
};

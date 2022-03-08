import { Scroll } from '@demonstrators-social/shared';
import { isString } from 'lodash';
import isArray from 'lodash/isArray';

export const getSliceId = (
  sliceIds:
    | Scroll.Interaction.TSliceVariant
    | Array<Scroll.Interaction.TSliceVariant>,
  index: number,
  actions: Array<string>
) => {
  if (isString(sliceIds)) {
    return sliceIds;
  } else if (isArray(sliceIds) && sliceIds.length === 2) {
    const [firstSliceId, lastSliceId] = sliceIds;
    if (index === 0) {
      return firstSliceId;
    } else if (index === actions.length - 1) {
      return lastSliceId;
    } else {
      return `${firstSliceId}-${lastSliceId}`;
    }
  }
};

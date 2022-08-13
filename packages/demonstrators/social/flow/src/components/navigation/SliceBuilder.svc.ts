import { GuardUtil } from '@app/utils';
import { Scroll } from '@demonstrators-social/shared';

const { isString } = GuardUtil.Primitives;

export const getSliceId = (
  sliceIds:
    | Scroll.Interaction.TSliceVariant
    | Array<Scroll.Interaction.TSliceVariant>,
  index: number,
  actions: Array<string>
) => {
  if (isString(sliceIds)) {
    return sliceIds;
  }

  if (Array.isArray(sliceIds) && sliceIds.length === 2) {
    const [firstSliceId, lastSliceId] = sliceIds;
    if (index === 0) {
      return firstSliceId;
    }
    if (index === actions.length - 1) {
      return lastSliceId;
    }
    return `${firstSliceId}-${lastSliceId}`;
  }
};

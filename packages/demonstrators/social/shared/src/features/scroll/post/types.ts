import { EffectRef } from '@huse/effect-ref';

export interface RefPostScroll {
  refObserved: EffectRef<HTMLElement>;
  refObservedSubSlices: { [key: string]: EffectRef<HTMLElement> };
}

export type RefPostScrollMap = {
  [value: string]: RefPostScroll; // key corresponds to timelineId
};

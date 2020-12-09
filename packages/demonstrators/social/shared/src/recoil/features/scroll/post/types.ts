import { EffectRef } from '@huse/effect-ref';

export interface RefPostScroll {
  refObserved: EffectRef<HTMLElement>;
  refObservedSubSlices: { [key: string]: EffectRef<HTMLElement> };
}

export type RefPostScrollType = {
  [value: string]: RefPostScroll;
};

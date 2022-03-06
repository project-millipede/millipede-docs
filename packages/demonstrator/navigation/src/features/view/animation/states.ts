import { EffectRef } from '@huse/effect-ref';
import { atomFamily } from 'recoil';

export interface RefContainerViewAnimation {
  refAnimated: EffectRef<HTMLElement>;
}

export const refContainerViewAnimationState = atomFamily<
  RefContainerViewAnimation,
  string
>({
  key: 'ref-container-view-animation',
  default: {
    refAnimated: undefined
  }
});

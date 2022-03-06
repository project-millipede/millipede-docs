import { StringUtil } from '@app/utils';
import { EffectRef } from '@huse/effect-ref';
import { selectorFamily } from 'recoil';

import { refContainerViewAnimationState } from './states';

export const refContainerViewAnimationSelector = selectorFamily<
  EffectRef<HTMLElement>,
  string
>({
  key: 'ref-container-view-animation-selector',
  get:
    viewId =>
    ({ get }) => {
      if (StringUtil.isEmptyString(viewId)) return null;
      const refContainerViewAnimation = get(
        refContainerViewAnimationState(viewId)
      );
      return refContainerViewAnimation.refAnimated;
    },
  set:
    viewId =>
    ({ set, get }, refContainerViewAnimation) => {
      const existingRefContainerViewAnimation = get(
        refContainerViewAnimationState(viewId)
      );
      if (
        existingRefContainerViewAnimation.refAnimated !=
        refContainerViewAnimation
      ) {
        set(refContainerViewAnimationState(viewId), {
          ...existingRefContainerViewAnimation,
          refAnimated: refContainerViewAnimation
        });
      }
    }
});

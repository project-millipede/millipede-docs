import { DefaultValue, selector, selectorFamily } from 'recoil';

import { SourceToTargetType } from '../../components/types-private';
import {
  ArcherRef,
  archerRefState,
  ArcherTransition,
  ArcherTransitionComposed,
  archerTransitionComposedState,
  archerTransitionState,
} from './states';

export const getSourceToTargets = (sourceToTargetsMap: {
  [key: string]: Array<SourceToTargetType>;
}): Array<SourceToTargetType> => {
  return Object.values(sourceToTargetsMap).flat();
};

export const archerRefSelector = selectorFamily<ArcherRef, string>({
  key: 'archer-ref-selector',
  get:
    archerId =>
    ({ get }) => {
      const archerRef = get(archerRefState(archerId));
      return archerRef;
    },
  set:
    archerId =>
    ({ set }, newArcherRef) => {
      // if (newArcherRef instanceof DefaultValue) {
      //   return;
      // }
      set(archerRefState(archerId), newArcherRef);
    },
  dangerouslyAllowMutability: true
});

export const archerTransitionSelector = selectorFamily<
  ArcherTransition,
  string
>({
  key: 'archer-transition-selector',
  get:
    archerId =>
    ({ get }) => {
      return get(archerTransitionState(archerId));
    },
  set:
    archerId =>
    ({ set, get }, newArcherTransition) => {
      if (newArcherTransition instanceof DefaultValue) {
        return;
      }

      const { archerTransitionIds } = get(archerTransitionComposedState);

      const updatedArcherTransitionIds = !archerTransitionIds.includes(archerId)
        ? [...archerTransitionIds, archerId]
        : archerTransitionIds;

      const transitions = archerTransitionIds.reduce<{
        [key: string]: Array<SourceToTargetType>;
      }>((acc, transitionId) => {
        return {
          ...acc,
          [transitionId]: get(archerTransitionState(transitionId))
            .sourceToTargetsMap
        };
      }, {});

      const updatedTransitions = {
        ...transitions,
        [archerId]: newArcherTransition.sourceToTargetsMap
      };

      // The flat method of Array automatically removes empty array elements - in that case tail
      const flattenedTransitions = Object.values(updatedTransitions).flat();

      set(archerTransitionState(archerId), newArcherTransition);
      set(archerTransitionComposedState, state => {
        return {
          ...state,
          flattenedTransitions,
          archerTransitionIds: updatedArcherTransitionIds
        };
      });
    }
});

export const archerTransitionComposedSelector =
  selector<ArcherTransitionComposed>({
    key: 'archer-transition-composed-selector',
    get: ({ get }) => {
      return get(archerTransitionComposedState);
    }
  });

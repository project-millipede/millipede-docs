import { CollectionUtil } from '@app/utils';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { features } from '../features';
import { navigateById } from '../services/NavigationControl.svc';
import { PartialViewElement } from '../types';

export const useNavigation = (): ((
  activeViewElementId: string,
  newActiveViewElementId: string
) => void) => {
  const {
    reparent: {
      states: { reparentState },
      actions: { sendReparentableChild }
    },
    view: {
      navigation: {
        states: { viewNavigationState }
      }
    }
  } = features;

  const parentElements = useRecoilValue(reparentState);

  const [{ views, viewElements }, setViewNavigation] =
    useRecoilState(viewNavigationState);

  const reparent = useCallback(
    (viewElement: PartialViewElement) => {
      if (viewElement.parentId !== viewElement.previousParentId) {
        /**
         * Depending on the animation approach used
         *
         * Manual animation
         * Used to communicate animation before an element gets removed within the reparenting process.
         * The idea is to keep the current position used in the keyframe before the element gets finally removed and readded elsewhere.
         * Use this option in pure animation strategies, where no projection or layout animation is in place.
         *
         * Layout animation
         * Communication to signal an animation position has changed using the data property of an HTML element is not required.
         * Instead of using plain HTML components as the view-based building blocks, position-aware counterparts get used.
         *
         */
        const element = document.getElementById(viewElement.id);
        element.setAttribute('data-position', viewElement.position);
        element.setAttribute(
          'data-previous-position',
          viewElement.previousPosition
        );

        if (viewElement.parentId !== viewElement.previousParentId) {
          sendReparentableChild(
            parentElements,
            viewElement.previousParentId,
            viewElement.parentId,
            0,
            0
          );
        }
      }
    },
    [parentElements, sendReparentableChild]
  );

  const navigate = useCallback(
    (activeViewElementId: string, newActiveViewElementId: string) => {
      const { nextViewElements, direction } = navigateById(
        activeViewElementId,
        newActiveViewElementId,
        views,
        viewElements
      );
      // directions: left = -1, right = 1
      if (direction === 1) {
        nextViewElements.forEach(reparent);
      } else if (direction === -1) {
        CollectionUtil.Array.reverse(nextViewElements).forEach(reparent);
      }
      setViewNavigation(state => {
        return { ...state, viewElements: nextViewElements };
      });
    },
    [views, viewElements, parentElements.parentFiberMap, setViewNavigation]
  );
  return navigate;
};

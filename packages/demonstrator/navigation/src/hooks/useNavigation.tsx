import { CollectionUtil } from '@app/utils';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { reparentReducer, reparentState } from '../recoil/features/reparent/reducers';
import { viewNavigationState } from '../recoil/features/view-navigation/reducers';
import { navigateById } from '../services/NavigationControl.svc';

export const useNavigation = (): ((
  activeViewElementId: string,
  newActiveViewElementId: string
) => void) => {
  const reparent = useRecoilValue(reparentState);

  const { sendReparentableChild } = reparentReducer;

  const [{ views, viewElements }, setViewNavigation] =
    useRecoilState(viewNavigationState);

  const navigate = useCallback(
    (activeViewElementId: string, newActiveViewElementId: string) => {
      const { nextViewElements, direction: moveToRight } = navigateById(
        activeViewElementId,
        newActiveViewElementId,
        views,
        viewElements
      );

      moveToRight
        ? nextViewElements.forEach(
            viewElement =>
              viewElement.parentId &&
              viewElement.previousParentId &&
              sendReparentableChild(
                reparent,
                viewElement.previousParentId,
                viewElement.parentId,
                0,
                0
              )
          )
        : CollectionUtil.Array.reverse(nextViewElements).forEach(
            viewElement =>
              viewElement.parentId &&
              viewElement.previousParentId &&
              sendReparentableChild(
                reparent,
                viewElement.previousParentId,
                viewElement.parentId,
                0,
                0
              )
          );

      setViewNavigation(state => {
        return { ...state, viewElements: nextViewElements };
      });
    },
    [
      views,
      viewElements,
      reparent.parentFiberMap,
      navigateById,
      setViewNavigation
    ]
  );
  return navigate;
};

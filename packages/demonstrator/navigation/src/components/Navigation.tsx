import { AnimateSharedLayout } from 'framer-motion';
import React, { FC, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { appCompositionState } from '../recoil/features/app/reducers';
import { partialViewElements, viewNavigationState } from '../recoil/features/view-navigation/reducers';
import { getComponent, getViewElement } from '../services';
import { TView, TViewElement } from '../types';
import { createViewElements, createViews, flattenViewElements } from './Navigation.svc';
import { View } from './View';

interface NavigationProps {
  defaultViewElements: Array<TViewElement>;
}

export const Navigation: FC<NavigationProps> = ({ defaultViewElements }) => {
  const [{ views, viewElements }, setViewNavigationState] =
    useRecoilState(viewNavigationState);

  const resetViewNavigationState = useResetRecoilState(viewNavigationState);

  const { isMobile: isMobileManual } = useRecoilValue(appCompositionState);

  useEffect(() => {
    const flattendViewElements = flattenViewElements(
      partialViewElements,
      'siblings'
    );

    const [initialLeftViews, initialMiddleView, initialRightViews] =
      createViews(flattendViewElements);

    const initialViewsToConnect = [initialMiddleView, ...initialRightViews];

    const connectedViewElements = createViewElements(
      flattendViewElements,
      initialViewsToConnect
    );

    setViewNavigationState(state => {
      return {
        ...state,
        views: [...initialLeftViews, ...initialViewsToConnect],
        viewElements: connectedViewElements
      };
    });
    return () => {
      resetViewNavigationState();
    };
  }, []);

  const renderView = (view: TView) => {
    const renderedViewElements = viewElements
      .filter(viewElement => viewElement.parentId === view.id)
      .map(viewElement =>
        getComponent(
          getViewElement(defaultViewElements, viewElement.id),
          viewElement.update
        )
      );

    return (
      <View
        key={view.id}
        parentId={view.id} // generated through nanoid
        position={isMobileManual ? view.position : null}
        backgroundColor={view.backgroundColor}
      >
        {renderedViewElements && renderedViewElements.length > 0
          ? renderedViewElements
          : null}
      </View>
    );
  };

  // number of views are equal to number of view elements
  const viewsToRender = useMemo(() => {
    const allViewElementParentIds = viewElements.map(
      viewElement => viewElement.parentId
    );
    return views.filter(view => {
      return allViewElementParentIds.includes(view.id);
    });
  }, [views, viewElements]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateAreas: isMobileManual && `'left middle right'`,
        gridTemplateColumns: isMobileManual
          ? '100% 100% 100%'
          : `repeat(${viewsToRender.length}, 1fr)`,
        transform: isMobileManual && 'translateX(-100%)'
      }}
    >
      <AnimateSharedLayout type={'crossfade'}>
        {isMobileManual ? views.map(renderView) : viewsToRender.map(renderView)}
      </AnimateSharedLayout>
    </div>
  );
};

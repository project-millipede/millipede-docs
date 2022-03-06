import React, { FC, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { features } from '../features';
import { getComponent, getViewElement } from '../services/Navigation.svc';
import { PartialViewElement, TView, TViewElement } from '../types';
import { createViewElements, createViews, flattenViewElements } from './Navigation.svc';
import { View } from './View';

export const partialViewElements: Array<PartialViewElement> = [
  {
    id: 'LeftViewElement',
    label: 'Author',
    siblings: []
  },
  {
    id: 'ViewElement',
    label: 'Actions',
    siblings: [
      // {
      //   id: 'DockViewElementLeft',
      //   position: Position.left
      // },
      // { id: 'DockViewElementRight', position: Position.right }
    ]
  },
  {
    id: 'RightViewElement',
    label: 'Consumer',
    siblings: []
  }
];

interface NavigationProps {
  defaultViewElements: Array<TViewElement>;
}

export const Navigation: FC<NavigationProps> = ({ defaultViewElements }) => {
  const {
    view: {
      navigation: {
        states: { viewNavigationState },
        selector: { viewsToRenderSelector }
      }
    },
    app: {
      states: { appCompositionState }
    }
  } = features;

  const [{ views, viewElements }, setViewNavigationState] =
    useRecoilState(viewNavigationState);

  const viewsToRender = useRecoilValue(viewsToRenderSelector);

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

  const renderView = useCallback(
    (view: TView) => {
      // Identify if and which view element is assigned to the current view.
      const viewElement = viewElements.find(
        viewElement => viewElement.parentId === view.id
      );

      return (
        <View
          key={view.id}
          parentId={view.id} // generated through nanoid
          /**
           * 1st render function
           * Assign the parent reference (used for the re-parenting approach)
           * generated within the view component the uppermost div.
           */
          render={(parentId, parentRef) => {
            return (
              <div
                key={parentId}
                ref={parentRef}
                style={{
                  gridArea: isMobileManual && view.position
                }}
              >
                {viewElement &&
                  // Instantiate the component/base component specified in the view-element description.
                  getComponent(
                    // Get the view-element definition out of a list of available view-elements.
                    getViewElement(defaultViewElements, viewElement.id)
                  )}
              </div>
            );
          }}
        />
      );
    },
    [viewElements, isMobileManual]
  );

  /**
   * The navigator supports two display modes - mobile and desktop
   * Mobile - default: The number of views exceeds the number of view-elements (2 * N) -1
   * Desktop: The number of views corresponds to the number of view-elements
   */

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
      {isMobileManual ? views.map(renderView) : viewsToRender.map(renderView)}
    </div>
  );
};

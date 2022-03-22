import { Components as RenderComponents } from '@app/render-utils';
import { Player, StepProvider } from '@demonstrator/components';
import { Components, features as navigationFeatures, TViewElement } from '@demonstrator/navigation';
import { HeaderView } from '@demonstrators-social/components';
import { generateData } from '@demonstrators-social/data';
import { features } from '@demonstrators-social/shared';
import { FC } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import useAsyncEffect from 'use-async-effect';

import { StoryPlayer } from './StoryPlayer';
import LeftViewElement from './views/LeftViewElement';
import RightViewElement from './views/RightViewElement';
import ViewElement from './views/ViewElement';

const {
  BaseViewElement,
  BottomNavigationControl,
  TopNavigationControl,
  Navigation
} = Components;

const { Toggle } = Player.Components;

const {
  Responsive: { isMobile }
} = RenderComponents;

const GlobalStyle = createGlobalStyle`
  .fullscreen-enabled {
    background: #F0F0F0;    
  }
`;

export const TOOLBAR_HEIGHT = 64;

/**
 * Note: When more then one re-parentable gets used,
 * pre-defining the key for each component is necessary.
 */
const viewElements: Array<TViewElement> = [
  {
    id: 'LeftViewElement',
    key: 'LeftViewElement',
    component: LeftViewElement,
    baseComponent: BaseViewElement
  },
  {
    id: 'ViewElement',
    key: 'ViewElement',
    component: ViewElement,
    baseComponent: BaseViewElement
  },
  {
    id: 'RightViewElement',
    key: 'RightViewElement',
    component: RightViewElement,
    baseComponent: BaseViewElement
  }
];

export const App: FC = () => {
  const {
    timeline: {
      states: { timelineState },
      actions: { normalizeData }
    }
  } = features;

  const {
    app: {
      states: { appLayoutState, appCompositionState }
    }
  } = navigationFeatures;

  const handle = useFullScreenHandle();
  // const height = use100vh();

  const setData = useSetRecoilState(timelineState);

  useAsyncEffect(
    async () => {
      const data = await generateData();
      normalizeData(setData, data);
    },
    () => {
      console.log('unmount');
      // reset or destroy data
    },
    []
  );

  const { appContainer, bottomContainer } = useRecoilValue(appLayoutState);
  const { isMobile: isMobileManual } = useRecoilValue(appCompositionState);

  return (
    <FullScreen handle={handle}>
      <div
        ref={appContainer}
        style={{
          // height: height,
          // height: '100vh',
          height: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
          display: 'flex',
          flexDirection: 'column',

          /**
           * The style property overflowX, set to the value "hidden," is most important for measuring nested scroll areas.
           * The property specifies the outer barrier of scroll containers to capture the outer border of scroll containers;
           * see the function findScrollContainers in the hook useScroll.
           */
          overflowX: 'hidden',

          /**
           * The style property position, set to the value "relative," is most important
           * for the bottom-sheet component to work correctly.
           *
           * Note:
           * The app-container component gets tracked by a resize observer.
           * The default resize observer does not change the app-container style
           * compared to the element-based resize observer. When used, the element-based
           * resize observer injects the position style with the value "relative."
           */
          position: 'relative'
        }}
      >
        {!isMobile() && (
          <HeaderView fullScreenHandle={handle} style={{ margin: '8px' }} />
        )}
        <TopNavigationControl style={{ margin: '8px' }} />

        <Navigation defaultViewElements={viewElements} />

        <StepProvider>
          <StoryPlayer />
          <div
            ref={bottomContainer}
            style={{
              marginTop: 'auto',
              zIndex: 10,
              backgroundColor: '#FFFFFF'
            }}
          >
            <Toggle />
            {isMobileManual ? <BottomNavigationControl /> : null}
          </div>
        </StepProvider>

        <GlobalStyle />
      </div>
    </FullScreen>
  );
};

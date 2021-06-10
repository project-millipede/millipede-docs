import { Archer } from '@app/components';
import { useHoux } from '@app/houx';
import { Components } from '@app/render-utils';
import { Player, StepProvider } from '@demonstrator/components';
import { BottomNavigationControl, Navigation, TopNavigationControl, TViewElement } from '@demonstrator/navigation';
import { appCompositionState, appLayoutState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { HeaderView } from '@demonstrators-social/components';
import { generateData } from '@demonstrators-social/data';
import { actions, TimelineActions } from '@demonstrators-social/shared';
import React, { Dispatch, FC } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useRecoilValue } from 'recoil';
import { createGlobalStyle } from 'styled-components';
import useAsyncEffect from 'use-async-effect';

import { StoryPlayer } from './StoryPlayer';
import LeftViewElement from './views/LeftViewElement';
import RightViewElement from './views/RightViewElement';
import ViewElement from './views/ViewElement';

const {
  Responsive: { isMobile }
} = Components;

const GlobalStyle = createGlobalStyle`
  .fullscreen-enabled {
    background: #F0F0F0;
  }
`;

export const TOOLBAR_HEIGHT = 64;

export const getViewElements = (): Array<TViewElement> => {
  const viewElements: Array<TViewElement> = [
    /**
     * Note: When more then one re-parentable gets used,
     * pre-defining the key for each component is necessary
     */

    {
      id: 'LeftViewElement',
      key: 'LeftViewElement',
      component: LeftViewElement
    },
    {
      id: 'ViewElement',
      key: 'ViewElement',
      component: ViewElement
    },
    {
      id: 'RightViewElement',
      key: 'RightViewElement',
      component: RightViewElement
    }
  ];
  return viewElements;
};

export const App: FC = () => {
  const handle = useFullScreenHandle();
  // const height = use100vh();

  const {
    dispatch
  }: {
    dispatch: Dispatch<TimelineActions>;
  } = useHoux();

  useAsyncEffect(
    async () => {
      const data = await generateData();
      dispatch(actions.timeline.normalizeData(data));
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
          overflowX: 'hidden' // overflowX - most important flag to capture outer barrier of scroll containers, used in function findScrollContainers in useMeasure hook
        }}
      >
        {!isMobile() && (
          <HeaderView fullScreenHandle={handle} style={{ margin: '8px' }} />
        )}
        <TopNavigationControl style={{ margin: '8px' }} />

        <Archer.ArcherContext.TransitionProvider>
          <Archer.ArcherContext.RefProvider>
            <Navigation defaultViewElements={getViewElements()} />
          </Archer.ArcherContext.RefProvider>
        </Archer.ArcherContext.TransitionProvider>

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
            <Player.Components.Player />
            {isMobileManual ? <BottomNavigationControl /> : null}
          </div>
        </StepProvider>

        <GlobalStyle />
      </div>
    </FullScreen>
  );
};

import { Tabs } from '@app/components';
import { Components, HooksUtils } from '@app/render-utils';
import { Player, SheetNext, useStepState } from '@demonstrator/components';
import { NavigationControl } from '@demonstrator/components/src/player/components/controls';
import { ProgressControl, TextProgressControl } from '@demonstrator/components/src/player/components/progress';
import { playerLayoutState } from '@demonstrator/components/src/player/context/reducer';
import { PlayListItem, Step } from '@demonstrator/components/src/player/types';
import { appLayoutState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { DonutLarge, Subscriptions } from '@mui/icons-material';
import { Divider, Tab } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AnimateHeight, HeightVariants } from './AnimateHeight';

const {
  Responsive: { isMobile }
} = Components;

export const PlayerSheetTabs = {
  Playlist: 'Playlist',
  Actions: 'Actions'
} as const;

export type TPlayerSheetTabs =
  typeof PlayerSheetTabs[keyof typeof PlayerSheetTabs];

interface PlayerSheetProps {
  steps: Array<Step>;
  playlist: Array<PlayListItem>;
}

export const PlayerSheet: FC<PlayerSheetProps> = ({ steps, playlist }) => {
  const [appContainerMeasureRef] = HooksUtils.useResize();
  const [bottomContainerMeasureRef] = HooksUtils.useResize();

  // Note:
  // Required when integrating the component / storyplayer
  // with absolute positioning in the app.
  // - Use component SheetNext.SheetWithAbsolutePosition,
  // - Provide bottomContainerSize

  // const [appContainerMeasureRef] = HooksUtils.useResizeWithElement();
  // const [bottomContainerMeasureRef, bottomContainerSize] =
  //   HooksUtils.useResizeWithElement();

  const { isPlayerExpanded } = useRecoilValue(playerLayoutState);

  const setAppLayoutState = useSetRecoilState(appLayoutState);

  useEffect(() => {
    setAppLayoutState(state => {
      return {
        ...state,
        appContainer: appContainerMeasureRef,
        bottomContainer: bottomContainerMeasureRef
      };
    });
  }, [appContainerMeasureRef, bottomContainerMeasureRef]);

  const { target } = useStepState();
  const activeStep = steps[target];

  const [activeTab, setActiveTab] = useState<TPlayerSheetTabs>(
    PlayerSheetTabs.Playlist
  );

  const handleTabChange = (_event: ChangeEvent, newValue: number) => {
    let value: TPlayerSheetTabs = PlayerSheetTabs.Playlist;

    if (newValue === 0) value = PlayerSheetTabs.Playlist;
    if (newValue === 1) value = PlayerSheetTabs.Actions;

    setActiveTab(value);
  };

  const currentValue = useMemo(() => {
    if (activeTab === PlayerSheetTabs.Playlist) return 0;
    if (activeTab === PlayerSheetTabs.Actions) return 1;
  }, [activeTab]);

  const orientation = isMobile() ? 'horizontal' : 'vertical';
  const direction = isMobile() ? 'column' : 'row';

  return (
    <SheetNext.Sheet
      isOpen={isPlayerExpanded}
      // bottomContainerSize={bottomContainerSize}
      header={
        <Tabs.StyledTabs
          value={currentValue}
          onChange={handleTabChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab
            label='Playlist'
            icon={<Subscriptions />}
            id={`playersheet-tabset-tab-playlist`}
          />
          <Tab
            label='Actions'
            icon={<DonutLarge />}
            id={`playersheet-tabset-tab-actions`}
          />
        </Tabs.StyledTabs>
      }
      content={
        <>
          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Playlist}>
            <Player.Components.Playlist playlist={playlist} />
          </AnimateHeight>

          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Actions}>
            <FlowComponents.Navigation.ProgressiveStepBuilder ltr />
          </AnimateHeight>

          <AnimateHeight
            isVisible={
              activeTab === PlayerSheetTabs.Actions && activeStep != null
            }
            variantsType={HeightVariants.Dynamic}
          >
            <Player.Components.Playtext activeStep={activeStep} />
          </AnimateHeight>

          <AnimateHeight
            isVisible={activeTab === PlayerSheetTabs.Actions}
            style={{
              display: 'flex',
              flexDirection: direction,
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px'
            }}
          >
            <ProgressControl steps={steps} />
            <Divider
              orientation={orientation}
              variant='middle'
              flexItem
              sx={{ m: 1 }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <NavigationControl />
              <TextProgressControl steps={steps} />
            </div>
          </AnimateHeight>
        </>
      }
    />
  );
};

import { HooksUtils } from '@app/render-utils';
import { Player, SheetNext, useStepState } from '@demonstrator/components';
import { ProgressControl, TextProgressControl } from '@demonstrator/components/src/player/components/progress';
import { playerLayoutState } from '@demonstrator/components/src/player/context/reducer';
import { PlayListItem, Step } from '@demonstrator/components/src/player/types';
import { appLayoutState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { createStyles, Divider, makeStyles, Tab, Tabs as TabsComponent, Theme } from '@material-ui/core';
import { DonutLarge, Subscriptions } from '@material-ui/icons';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { AnimateHeight, HeightVariants } from './AnimateHeight';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap'
      },
      '& .MuiTab-root': {
        '&.MuiTab-labelIcon': {
          minHeight: theme.spacing(6),
          '& .MuiTab-wrapper > *:first-child': {
            marginBottom: 0
          }
        },
        '& .MuiTab-wrapper': {
          flexDirection: 'row',
          '& > *:first-child': {
            marginRight: theme.spacing(1)
          }
        }
      }
    }
  })
);

export const PlayerSheet: FC<PlayerSheetProps> = ({ steps, playlist }) => {
  const classes = useStyles();

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

  return (
    <SheetNext.Sheet
      isOpen={isPlayerExpanded}
      // bottomContainerSize={bottomContainerSize}
      header={
        <TabsComponent
          value={currentValue}
          onChange={handleTabChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
          className={classes.tabs}
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
        </TabsComponent>
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
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px'
            }}
          >
            <ProgressControl steps={steps} />
            <Divider orientation='vertical' variant='middle' flexItem />
            <TextProgressControl steps={steps} />
          </AnimateHeight>
        </>
      }
    />
  );
};

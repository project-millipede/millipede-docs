import { Tabs } from '@app/components';
import { Components as RenderComponents, HooksUtils } from '@app/render-utils';
import { Animation, Player, SheetNext } from '@demonstrator/components';
import { features } from '@demonstrator/navigation';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { DonutLarge, Subscriptions } from '@mui/icons-material';
import { Divider, Tab } from '@mui/material';
import React, { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const {
  Playtext,
  Playlist,
  Controls: { NavigationControl },
  Progress: { TextProgressControl, ProgressControl }
} = Player.Components;

const {
  Navigation: { ProgressiveStepBuilder, SliceBuilder, SliceBuilderMultiRow },
  Options: { SliceOptions }
} = FlowComponents;

const { AnimateHeight } = Animation;

const {
  Responsive: { isMobile }
} = RenderComponents;

export const LayoutVariants = {
  Absolute: 'Absolute',
  Relative: 'Relative'
} as const;

export type TLayoutVariants =
  typeof LayoutVariants[keyof typeof LayoutVariants];

export const PlayerSheetTabs = {
  Playlist: 'Playlist',
  Actions: 'Actions'
} as const;

export type TPlayerSheetTabs =
  typeof PlayerSheetTabs[keyof typeof PlayerSheetTabs];

interface PlayerSheetProps {
  steps: Array<Player.Step>;
  playlist: Array<Player.PlayListItem>;
  layout: TLayoutVariants;
}

export const PlayerSheet: FC<PlayerSheetProps> = ({
  playlist,
  steps,
  layout
}) => {
  const {
    app: {
      states: { appLayoutState }
    }
  } = features;

  const {
    layout: {
      states: { playerLayoutState }
    }
  } = Player.features;

  const [bottomContainerMeasureRef, bottomContainerSize] =
    HooksUtils.useResize();

  const { isPlayerExpanded } = useRecoilValue(playerLayoutState);

  const setAppLayoutState = useSetRecoilState(appLayoutState);

  useEffect(() => {
    setAppLayoutState(state => {
      return {
        ...state,
        bottomContainer: bottomContainerMeasureRef
      };
    });
  }, [bottomContainerMeasureRef]);

  const [activeTab, setActiveTab] = useState<TPlayerSheetTabs>(
    PlayerSheetTabs.Playlist
  );

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: TPlayerSheetTabs) => {
      setActiveTab(newValue);
    },
    []
  );

  const orientation = isMobile() ? 'horizontal' : 'vertical';
  const direction = isMobile() ? 'column' : 'row';

  const Comp =
    layout === LayoutVariants.Relative
      ? SheetNext.Sheet
      : SheetNext.SheetWithAbsolutePosition;

  /**
   * Note:
   * The property bottomContainerSize is mandatory for the absolute positioned sheet variant;
   * it is not required for the relative variant.
   *
   * Optional components:
   * The following components are not integrated yet.
   *
   * <FlowControl.ScenarioNavigator />
   * <FlowControl.ScenarioDetailNavigator />
   */

  return (
    <Comp
      isOpen={isPlayerExpanded}
      bottomContainerSize={bottomContainerSize}
      header={
        <Tabs.StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          variant='fullWidth'
          indicatorColor='primary'
          textColor='primary'
        >
          <Tab
            value='Playlist'
            label='Playlist'
            icon={<Subscriptions />}
            id={`playersheet-tabset-tab-playlist`}
          />
          <Tab
            value='Actions'
            label='Actions'
            icon={<DonutLarge />}
            id={`playersheet-tabset-tab-actions`}
          />
        </Tabs.StyledTabs>
      }
      content={
        <>
          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Playlist}>
            <Playlist playlist={playlist} />
          </AnimateHeight>

          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Actions}>
            <ProgressiveStepBuilder />
            <SliceBuilder />
            <SliceBuilderMultiRow />
            <SliceOptions />
          </AnimateHeight>

          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Actions}>
            <Playtext steps={steps} />
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
              sx={{ margin: 1 }}
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

import { Tabs } from '@app/components';
import { Components as RenderComponents, HooksUtils } from '@app/render-utils';
import { CursorSvc, Player, Sheet, useStepState } from '@demonstrator/components';
import { features } from '@demonstrator/navigation';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { DonutLarge, Subscriptions } from '@mui/icons-material';
import { Button, Divider, Tab } from '@mui/material';
import React, { FC, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const {
  Responsive: { isMobile }
} = RenderComponents;

const {
  Playtext,
  Playlist,
  Controls: { NavigationControl },
  Progress: { TextProgressControl, ProgressControl }
} = Player.Components;

const {
  Navigation: { ProgressiveStepBuilder }
} = FlowComponents;

export const PlayerSheetTabs = {
  Playlist: 'Playlist',
  Actions: 'Actions'
} as const;

export type TPlayerSheetTabs =
  typeof PlayerSheetTabs[keyof typeof PlayerSheetTabs];

const baseSnapPoints = [800, 300, 100];

interface PlayerSheetProps {
  steps: Array<Player.Step>;
  playlist: Array<Player.PlayListItem>;
}

export const PlayerSheet: FC<PlayerSheetProps> = ({ steps, playlist }) => {
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

  const [appContainerMeasureRef, appContainerSize] = HooksUtils.useResize();
  const [bottomContainerMeasureRef, bottomContainerSize] =
    HooksUtils.useResize();

  const setAppLayoutState = useSetRecoilState(appLayoutState);

  const { isPlayerExpanded } = useRecoilValue(playerLayoutState);

  useEffect(() => {
    setAppLayoutState(state => {
      return {
        ...state,
        appContainer: appContainerMeasureRef,
        bottomContainer: bottomContainerMeasureRef
      };
    });
  }, [appContainerMeasureRef, bottomContainerMeasureRef]);

  const { target, playing } = useStepState();

  const sheetHandleRef = useRef<Sheet.Types.SheetHandleProps>(null);

  const { snapTo, snapToPx, reset } =
    Sheet.Hooks.useBottomSheetActions(sheetHandleRef);

  const resizeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playing) {
      if (resizeControlRef && resizeControlRef.current != null) {
        const coordinatesText = CursorSvc.measure(resizeControlRef.current);
        const offsetTop = resizeControlRef.current.offsetTop;
        snapToPx(coordinatesText.height, offsetTop);
      } else {
        reset();
      }
    }
  }, [target]);

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

  return (
    <Sheet.Sheet
      ref={sheetHandleRef}
      isOpen={isPlayerExpanded}
      snapPoints={baseSnapPoints}
      initialSnapPointIndex={
        (baseSnapPoints &&
          baseSnapPoints.length > 0 &&
          baseSnapPoints.length - 1) ||
        0
      }
      appContainerSize={appContainerSize}
      bottomContainerSize={bottomContainerSize}
    >
      <Sheet.SheetContainer
        appContainerSize={appContainerSize}
        bottomContainerSize={bottomContainerSize}
      >
        <Sheet.SheetHeader>
          <Button onClick={() => snapTo(0)}>500</Button>
          <Button onClick={() => snapTo(1)}>300</Button>
          <Button onClick={() => snapTo(2)}>100</Button>
        </Sheet.SheetHeader>
        <Sheet.SheetContent>
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

          {activeTab === PlayerSheetTabs.Playlist && (
            <Playlist playlist={playlist} />
          )}

          {activeTab === PlayerSheetTabs.Actions && <ProgressiveStepBuilder />}

          {activeTab === PlayerSheetTabs.Actions && (
            <Playtext steps={steps} ref={resizeControlRef} />
          )}

          {activeTab === PlayerSheetTabs.Actions && (
            <div
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
            </div>
          )}
        </Sheet.SheetContent>
      </Sheet.SheetContainer>
    </Sheet.Sheet>
  );
};

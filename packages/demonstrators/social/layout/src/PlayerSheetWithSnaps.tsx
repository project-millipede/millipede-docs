import { Tabs } from '@app/components';
import { HooksUtils } from '@app/render-utils';
import { CursorSvc, Player, Sheet, useStepState } from '@demonstrator/components';
import { ProgressControl, TextProgressControl } from '@demonstrator/components/src/player/components/progress';
import { playerLayoutState } from '@demonstrator/components/src/player/context/reducer';
import { PlayListItem, Step } from '@demonstrator/components/src/player/types';
import { appLayoutState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { DonutLarge, Subscriptions } from '@mui/icons-material';
import { Button, Divider, Tab } from '@mui/material';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const PlayerSheetTabs = {
  Playlist: 'Playlist',
  Actions: 'Actions'
} as const;

export type TPlayerSheetTabs =
  typeof PlayerSheetTabs[keyof typeof PlayerSheetTabs];

const baseSnapPoints = [800, 300, 100];

interface PlayerSheetProps {
  steps: Array<Step>;
  playlist: Array<PlayListItem>;
}
export const PlayerSheet: FC<PlayerSheetProps> = ({ steps, playlist }) => {
  const [appContainerMeasureRef, appContainerSize] = HooksUtils.useResize();
  const [bottomContainerMeasureRef, bottomContainerSize] =
    HooksUtils.useResize();

  const setAppLayoutState = useSetRecoilState(appLayoutState);

  const [{ isPlayerExpanded }, setPlayerLayoutState] =
    useRecoilState(playerLayoutState);

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
  const activeStep = steps[target];

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

  const handleClose = useCallback(() => {
    setPlayerLayoutState(state => {
      return {
        ...state,
        isPlayerExpanded: false
      };
    });
  }, []);

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
      onClose={handleClose}
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

          {activeTab === PlayerSheetTabs.Playlist && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Player.Components.Playlist playlist={playlist} />
            </div>
          )}

          {activeTab === PlayerSheetTabs.Actions && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <FlowComponents.Navigation.ProgressiveStepBuilder ltr />
            </div>
          )}

          {activeTab === PlayerSheetTabs.Actions && (
            <div
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
            </div>
          )}

          {activeTab === PlayerSheetTabs.Actions && activeStep != null && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Player.Components.Playtext
                activeStep={activeStep}
                ref={resizeControlRef}
              />
            </div>
          )}
        </Sheet.SheetContent>
      </Sheet.SheetContainer>
    </Sheet.Sheet>
  );
};

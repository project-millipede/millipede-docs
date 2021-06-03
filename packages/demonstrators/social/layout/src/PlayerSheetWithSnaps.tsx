import { HooksUtils } from '@app/render-utils';
import { CursorSvc, Player, Sheet, useStepState } from '@demonstrator/components';
import { RowNarrow } from '@demonstrator/components/src/player/components/Player';
import { ProgressControl, TextProgressControl } from '@demonstrator/components/src/player/components/progress';
import { playerLayoutState } from '@demonstrator/components/src/player/context/reducer';
import { PlayListItem, Step } from '@demonstrator/components/src/player/types';
import { appLayoutState } from '@demonstrator/navigation/src/recoil/features/app/reducers';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { Button, createStyles, makeStyles, Tab, Tabs as TabsComponent, Theme, Typography } from '@material-ui/core';
import { DonutLarge, Subscriptions } from '@material-ui/icons';
import React, { ChangeEvent, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

export const PlayerSheetTabs = {
  Playlist: 'Playlist',
  Actions: 'Actions'
} as const;

export type TPlayerSheetTabs =
  typeof PlayerSheetTabs[keyof typeof PlayerSheetTabs];

export const SheetControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const baseSnapPoints = [800, 300, 100];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'italic'
    },
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

interface PlayerSheetProps {
  steps: Array<Step>;
  playlist: Array<PlayListItem>;
}

export const PlayerSheet: FC<PlayerSheetProps> = ({ steps, playlist }) => {
  const classes = useStyles();

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
          <SheetControls>
            <Button onClick={() => snapTo(0)}>500</Button>
            <Button onClick={() => snapTo(1)}>300</Button>
            <Button onClick={() => snapTo(2)}>100</Button>
          </SheetControls>
        </Sheet.SheetHeader>
        <Sheet.SheetContent>
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

          {activeTab === PlayerSheetTabs.Playlist && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography className={classes.heading}>Playlist</Typography>
              <Player.Components.Playlist playlist={playlist} />
            </div>
          )}

          {activeTab === PlayerSheetTabs.Actions && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Typography
                  style={{
                    margin: 0
                  }}
                  className={classes.heading}
                  gutterBottom={false}
                >
                  Actions
                </Typography>
                {/* <Help
                  message={'Actions used for the auto, and manual replay'}
                /> */}
              </div>

              <FlowComponents.Navigation.ProgressiveStepBuilder ltr />
            </div>
          )}

          {activeTab === PlayerSheetTabs.Actions && (
            <RowNarrow
              style={{
                height: `${48}px`,
                flex: '1 1 auto'
              }}
            >
              <ProgressControl steps={steps} />
              <TextProgressControl steps={steps} />
            </RowNarrow>
          )}

          {activeTab === PlayerSheetTabs.Actions && activeStep != null && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography className={classes.heading}>Description</Typography>
              <Player.Components.Playtext
                activeStep={activeStep}
                ref={resizeControlRef}
              />
            </div>
          )}

          {/* <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Playlist}>
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

          <AnimateHeight isVisible={activeTab === PlayerSheetTabs.Actions}>
            <RowNarrow
              style={{
                height: `${48}px`,
                flex: '1 1 auto'
              }}
            >
              <ProgressControl steps={steps} />
              <TextProgressControl steps={steps} />
            </RowNarrow>
          </AnimateHeight> */}
        </Sheet.SheetContent>
      </Sheet.SheetContainer>
    </Sheet.Sheet>
  );
};

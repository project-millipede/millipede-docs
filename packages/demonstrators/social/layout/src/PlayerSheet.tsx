import { Help } from '@app/components';
import { CursorSvc, Player, Sheet, useStepState } from '@demonstrator/components';
import { PlayListItem, Step } from '@demonstrator/components/src/player/types';
import { Components as FlowComponents } from '@demonstrators-social/flow';
import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface PlayerSheetProps {
  leftTimelineId: string;
  rightTimelineId: string;
  steps: Array<Step>;
  playlist: Array<PlayListItem>;
  size: Partial<DOMRect>;
  bottomSize: Partial<DOMRect>;
  isOpen: boolean;

  topic: string;
  onTopicChange: (topic: string) => void;
}

const baseSnapPoints = [800, 300, 100];

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      fontStyle: 'italic'
      // margin: 0
    }
  })
);

export const PlayerSheet: FC<PlayerSheetProps> = ({
  leftTimelineId,
  rightTimelineId,
  steps,
  playlist,
  size,
  bottomSize,
  isOpen,

  topic,
  onTopicChange
}) => {
  const classes = useStyles();
  const { target } = useStepState();

  const activeStep = steps[target];

  const sheetHandleRef = useRef<Sheet.Types.SheetHandleProps>(null);

  const { snapTo, snapToPx } = Sheet.Hooks.useBottomSheetActions(
    sheetHandleRef
  );

  const resizeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resizeControlRef && resizeControlRef.current != null) {
      const coordinatesText = CursorSvc.measure(resizeControlRef.current);
      const offsetTop = resizeControlRef.current.offsetTop;
      snapToPx(coordinatesText.height, offsetTop);
    }
  }, [target]);

  return (
    <Sheet.Sheet
      ref={sheetHandleRef}
      isOpen={isOpen}
      onClose={() => {}}
      snapPoints={baseSnapPoints}
      initialSnapPointIndex={
        baseSnapPoints && baseSnapPoints.length > 0
          ? baseSnapPoints.length - 1
          : 0
      }
      size={size}
      bottomSize={bottomSize}
    >
      <Sheet.SheetContainer size={size} bottomSize={bottomSize}>
        <Sheet.SheetHeader />
        <Sheet.SheetContent>
          <Controls>
            <Button onClick={() => snapTo(0)}>500</Button>
            <Button onClick={() => snapTo(1)}>300</Button>
            <Button onClick={() => snapTo(2)}>100</Button>
          </Controls>

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
              <Help message={'hello world'} />
            </div>

            <FlowComponents.Navigation.ProgressiveStepBuilder
              // ltr={state.ltr}
              ltr
              leftTimelineId={leftTimelineId}
              rightTimelineId={rightTimelineId}
            />
          </div>

          {activeStep && activeStep.description ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography className={classes.heading}>Description</Typography>
              <Player.Components.Playtext
                activeStep={activeStep}
                ref={resizeControlRef}
              />
            </div>
          ) : null}

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className={classes.heading}>Playlist</Typography>

            <Player.Components.Playlist
              playlist={playlist}
              topic={topic}
              onTopicChange={onTopicChange}
            />
          </div>
        </Sheet.SheetContent>
      </Sheet.SheetContainer>
    </Sheet.Sheet>
  );
};

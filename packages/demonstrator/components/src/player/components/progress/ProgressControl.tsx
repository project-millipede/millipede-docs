import { LABEL_BORDER_RADIUS } from '@app/layout/src/recoil/features/layout/reducer';
import { Slider } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { useStepDispatch, useStepState } from '../../context/StepProvider';
import { Step } from '../../types';
import { getStepByTime, getTimeData } from '../../utils/playertime';

export const getValue = (
  playing: boolean,
  globalEnd: number,
  target: number
) => {
  // Playing
  if (playing) {
    return globalEnd;
  }
  // Paused
  if (!playing && target > 0) {
    return globalEnd;
  }
  // Not started / finished
  return 0;
};

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: theme.spacing(8),
  width: '100%',
  backgroundColor: '#DDDDDD',
  borderRadius: theme.spacing(LABEL_BORDER_RADIUS),
  padding: theme.spacing(0, 2)
}));

export interface ProgressControlProps {
  steps: Array<Step>;
}

export const ProgressControl: FC<ProgressControlProps> = ({ steps }) => {
  const { target } = useStepState();
  const { stepsWithDuration, totalSeconds } = getTimeData(steps);

  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();

  const { globalEnd } =
    stepsWithDuration && stepsWithDuration.length > 0 && target >= 0
      ? stepsWithDuration[target]
      : { globalEnd: 0 };

  return (
    <Row>
      <Slider
        size='small'
        value={getValue(playing, globalEnd, target)}
        onChange={(_e, value) => {
          const { stepIndex } = getStepByTime(
            stepsWithDuration,
            value as number
          );
          stepDispatch({ type: 'SEEK', target: stepIndex });
        }}
        marks={stepsWithDuration.map(step => {
          return {
            value: step.end,
            label: step.label
          };
        })}
        max={totalSeconds}
        min={0}
      />
    </Row>
  );
};

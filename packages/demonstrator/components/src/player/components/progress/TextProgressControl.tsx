import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FC } from 'react';

import { useStepState } from '../../context/StepProvider';
import { Step } from '../../types';
import { getTimeData } from '../../utils/playertime';
import { CountDown } from '../counter/CountDown';
import { CountUp } from '../counter/CountUp';

export const useStyles = makeStyles((_theme: Theme) => {
  const height = 48;

  return createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: `${height}px`
    }
  });
});

interface TextProgressControlProps {
  steps: Array<Step>;
}

export const TextProgressControl: FC<TextProgressControlProps> = ({
  steps
}) => {
  const classes = useStyles();

  const { playing, target, maxStepsCount } = useStepState();

  const { stepsWithDuration, totalSeconds } = getTimeData(steps);

  const { duration } =
    stepsWithDuration.length > 0 ? stepsWithDuration[target] : { duration: 0 };

  return (
    <div className={classes.row}>
      <CountDown startTime={duration} playing={playing} step={target} />
      {` sec. - `}
      {`${target} of ${maxStepsCount} steps`}
      {` / `}
      <CountUp startTime={0} playing={playing} />
      {` of ${totalSeconds / 1000} sec.`}
    </div>
  );
};

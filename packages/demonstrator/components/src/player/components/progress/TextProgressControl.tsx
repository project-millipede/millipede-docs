import { LABEL_BORDER_RADIUS, LABEL_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';

import { useStepState } from '../../context/StepProvider';
import { Step } from '../../types';
import { getTimeData } from '../../utils/playertime';
import { CountDown } from '../counter/CountDown';
import { CountUp } from '../counter/CountUp';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    row: {
      borderRadius: LABEL_BORDER_RADIUS,
      backgroundColor: '#DDDDDD',
      display: 'flex',
      alignItems: 'center'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      height: '60px',
      width: 'max-content'
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemEnd: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    label: {
      height: LABEL_HEIGHT,
      borderRadius: LABEL_BORDER_RADIUS,
      backgroundColor: '#F1F1F1',
      padding: theme.spacing(0, 1),
      margin: theme.spacing(0, 1)
    }
  };
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
    stepsWithDuration && stepsWithDuration.length > 0 && target >= 0
      ? stepsWithDuration[target]
      : { duration: 0 };

  return (
    <div className={classes.row}>
      <div className={classes.column}>
        <div className={classes.item}>
          <Typography className={classes.label}>
            {`${target} of ${maxStepsCount} steps`}
          </Typography>
        </div>
      </div>
      <div className={classes.column}>
        <div className={classes.itemEnd}>
          <Typography className={classes.label}>
            <CountDown startTime={duration} playing={playing} step={target} />
            {` of ${duration / 1000} sec.`}
          </Typography>
        </div>
        <div className={classes.item}>
          <Typography className={classes.label}>
            <CountUp startTime={0} playing={playing} />
            {` of ${totalSeconds / 1000} sec.`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

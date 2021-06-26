import { LABEL_BORDER_RADIUS, LABEL_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { useStepState } from '../../context/StepProvider';
import { Step } from '../../types';
import { getTimeData } from '../../utils/playertime';
import { CountDown } from '../counter/CountDown';
import { CountUp } from '../counter/CountUp';

// export const useStyles = makeStyles((theme: Theme) => {
//   return {
//     item: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     itemEnd: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-end'
//     },
//   };
// });

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  borderRadius: theme.spacing(LABEL_BORDER_RADIUS)
}));

const Column = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: theme.spacing(8),
  width: 'max-content'
}));

const Item = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const Label = styled(Typography)(({ theme }) => ({
  backgroundColor: '#F1F1F1',
  height: theme.spacing(LABEL_HEIGHT),
  borderRadius: theme.spacing(LABEL_BORDER_RADIUS),
  padding: theme.spacing(0, 1),
  margin: theme.spacing(0, 1)
}));

interface TextProgressControlProps {
  steps: Array<Step>;
}

export const TextProgressControl: FC<TextProgressControlProps> = ({
  steps
}) => {
  // const classes = useStyles();

  const { playing, target, maxStepsCount } = useStepState();

  const { stepsWithDuration, totalSeconds } = getTimeData(steps);

  const { duration } =
    stepsWithDuration && stepsWithDuration.length > 0 && target >= 0
      ? stepsWithDuration[target]
      : { duration: 0 };

  return (
    <Row>
      <Column>
        <Item sx={{ justifyContent: 'center' }}>
          <Label>{`${target} of ${maxStepsCount} steps`}</Label>
        </Item>
      </Column>
      <Column>
        <Item sx={{ justifyContent: 'center' }}>
          <Label>
            <CountDown startTime={duration} playing={playing} step={target} />
            {` of ${duration / 1000} sec.`}
          </Label>
        </Item>
        <Item sx={{ justifyContent: 'center' }}>
          <Label>
            <CountUp startTime={0} playing={playing} />
            {` of ${totalSeconds / 1000} sec.`}
          </Label>
        </Item>
      </Column>
    </Row>
  );
};

import { ArrowLeft, ArrowRight, Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

import { useStepDispatch, useStepState } from '../../context/StepProvider';

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginRight: theme.spacing(1)
}));

export const NavigationControl: FC = () => {
  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();

  return (
    <Row>
      <IconButton size='small' onClick={() => stepDispatch({ type: 'PREV' })}>
        <ArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => {
          stepDispatch({ type: 'TOGGLE' });
        }}
      >
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton size='small' onClick={() => stepDispatch({ type: 'NEXT' })}>
        <ArrowRight />
      </IconButton>
    </Row>
  );
};

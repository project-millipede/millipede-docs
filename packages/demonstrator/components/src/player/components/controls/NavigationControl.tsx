import { INPUT_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { ArrowLeft, ArrowRight, Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

import { useStepDispatch, useStepState } from '../../context/StepProvider';

const Row = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: theme.spacing(INPUT_HEIGHT)
}));

export const NavigationControl: FC = () => {
  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();

  return (
    <Row>
      <IconButton onClick={() => stepDispatch({ type: 'PREV' })}>
        <ArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => {
          stepDispatch({ type: 'TOGGLE' });
        }}
      >
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={() => stepDispatch({ type: 'NEXT' })}>
        <ArrowRight />
      </IconButton>
    </Row>
  );
};

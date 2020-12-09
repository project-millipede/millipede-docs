import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import { ArrowLeft, ArrowRight, Pause, PlayArrow } from '@material-ui/icons';
import React, { FC } from 'react';

import { useStepDispatch, useStepState } from '../../context/StepProvider';

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

export const NavigationControl: FC = () => {
  const classes = useStyles();

  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();

  return (
    <div className={classes.row}>
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
    </div>
  );
};

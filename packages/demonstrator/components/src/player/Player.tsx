import { createStyles, Divider, makeStyles, Theme } from '@material-ui/core';
import { useWindupString } from '@project-millipede/windups';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import { NavigationControl } from './components/controls/NavigationControl';
import { ProgressControl } from './components/progress/ProgressControl';
import { TextProgressControl } from './components/progress/TextProgressControl';
import { useStepState } from './context/StepProvider';
import { Step } from './types';

export const useStyles = makeStyles((theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;

  return createStyles({
    column: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    },
    rowProgressControls: {
      display: 'flex',
      padding: theme.spacing(0, 3),
      alignItems: 'center',
      justifyContent: 'center',
      height: `${height}px`
    },
    rowProgressText: {
      display: 'flex',
      padding: theme.spacing(0, 3),
      height: `${height}px`
    }
  });
});

interface PlayerProps {
  steps: Array<Step>;
}

export const Player: FC<PlayerProps> = ({ steps }) => {
  const classes = useStyles();

  const { target } = useStepState();

  const { t } = useTranslation();

  const activeStep = steps[target];

  const [text] = useWindupString(t(activeStep?.description) || '');

  return (
    <div className={classes.column}>
      <NavigationControl />
      <Divider variant={'middle'} />
      <div className={classes.rowProgressControls}>
        <ProgressControl steps={steps} />
        <TextProgressControl steps={steps} />
      </div>
      <Divider variant={'middle'} />
      <div className={classes.rowProgressText}>{text}</div>
    </div>
  );
};

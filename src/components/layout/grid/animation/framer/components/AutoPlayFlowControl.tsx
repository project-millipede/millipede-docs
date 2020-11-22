import { createStyles, Divider, IconButton, makeStyles, Slider, Theme } from '@material-ui/core';
import { ArrowLeft, ArrowRight, Pause, PlayArrow } from '@material-ui/icons';
import useTranslation from 'next-translate/useTranslation';
import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { useWindupString } from 'windups';

import { getSteps, Step } from './AutoPlayFlowControl.cfg';
import { getStepByTime, getTimeData, useStepsProgress } from './AutoPlayFlowControl.svc';
import { StepProvider, useStepDispatch, useStepState } from './codehike/site/src/steps/StepProvider';
import { CountDown } from './counter/CountDown';
import { CountUp } from './counter/CountUp';
import { Cursor } from './cursor/Cursor';
import { PortalIn } from './shared/portals/portals';
import { PortalType } from './shared/portals/portals.constants';

interface AutoPlayFlowControlProps {
  leftTimelineId: string;
  rightTimelineId: string;
  handleControlOffset?: (value: number) => void;
  style?: CSSProperties;
}

export const AutoPlayFlowControl: FC<AutoPlayFlowControlProps> = ({
  leftTimelineId,
  rightTimelineId
}) => {
  return (
    <StepProvider>
      <StepsRangeWrapper
        leftTimelineId={leftTimelineId}
        rightTimelineId={rightTimelineId}
      />
    </StepProvider>
  );
};

type AutoPlayFlowProps = AutoPlayFlowControlProps;

interface ProgressControlProps {
  steps: Array<Step>;
}

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

export const TextProgressControl: FC<ProgressControlProps> = ({ steps }) => {
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

export const ProgressControl: FC<ProgressControlProps> = ({ steps }) => {
  const { target } = useStepState();

  const { stepsWithDuration, totalSeconds } = getTimeData(steps);

  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();

  const { globalEnd } =
    stepsWithDuration.length > 0 ? stepsWithDuration[target] : { globalEnd: 0 };

  return (
    <Slider
      value={getValue(playing, globalEnd, target)}
      onChange={(_e, value) => {
        const { stepIndex } = getStepByTime(stepsWithDuration, value as number);
        stepDispatch({ type: 'SEEK', target: stepIndex });
      }}
      marks={stepsWithDuration.map(s => {
        return {
          value: s.end,
          label: s.label
        };
      })}
      max={totalSeconds}
      min={0}
    />
  );
};

export const useStyles = makeStyles((theme: Theme) => {
  const height = 48;
  const borderRadius = height / 2;

  return createStyles({
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: `${height}px`
    },
    rowProgressControls: {
      display: 'flex',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      alignItems: 'center',
      justifyContent: 'center',
      height: `${height}px`
    },
    rowProgressText: {
      display: 'flex',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      height: `${height}px`
    },
    rowRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 'auto',
      height: `${height}px`
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    },
    input: {
      height: `${height}px`,
      backgroundColor: '#f1f3f4',
      borderRadius: `${borderRadius}px`
    }
  });
});

interface NavigationControlsProps {}

const NavigationControls: FC<NavigationControlsProps> = () => {
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

interface PlayerProps {
  steps: Array<Step>;
}

export const Player: FC<PlayerProps> = ({ steps }) => {
  const classes = useStyles();

  const { target } = useStepState();

  const { t } = useTranslation();

  const activeStep = steps[target];

  const [text] = useWindupString(t(activeStep?.description));

  return (
    <div className={classes.column}>
      <NavigationControls />
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

export const StepsRangeWrapper: FC<AutoPlayFlowProps> = ({
  leftTimelineId,
  rightTimelineId
}) => {
  const { target, playing, maxStepsCount } = useStepState();

  const stepDispatch = useStepDispatch();

  const [steps, setSteps] = useState<Array<Step>>([]);

  useEffect(() => {
    if (maxStepsCount === 0 && playing) {
      const steps = getSteps(leftTimelineId, rightTimelineId).standard;
      stepDispatch({ type: 'INIT', maxStepsCount: steps.length });
      setSteps(steps);
    }
  }, [leftTimelineId, rightTimelineId, maxStepsCount, playing]);

  const { stepsWithDuration } = getTimeData(steps);

  const activeStep = steps[target];

  const { duration } =
    stepsWithDuration.length > 0 ? stepsWithDuration[target] : { duration: 0 };

  // does the heavy lifting
  useStepsProgress(duration);

  return (
    <>
      <Player steps={steps} />

      <PortalIn portalType={PortalType.Cursor}>
        {playing && activeStep ? (
          <Cursor selector={`#${activeStep?.selector}`} />
        ) : null}
      </PortalIn>
    </>
  );
};

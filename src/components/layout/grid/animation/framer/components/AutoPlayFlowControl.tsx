import { Button, createStyles, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight, Pause, PlayArrow } from '@material-ui/icons';
import clsx from 'clsx';
import React, { CSSProperties, FC, useEffect, useState } from 'react';

import { AbsoluteStep, getStepByTime, getTimeData, useStepsProgress } from './AutoPlayFlowControl.svc';
import { StepProvider, useStepDispatch, useStepState } from './codehike/site/src/steps/StepProvider';

interface AutoPlayFlowControlProps {
  leftTimelineId: string;
  rightTimelineId: string;
  handleControlOffset?: (value: number) => void;
  style?: CSSProperties;
}

// Wrapper

// <InteractionFlowControlObserver
//   handleControlOffset={handleControlOffset}
//   style={style}
// >

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
  stepsWithDuration: Array<AbsoluteStep>;
  totalSeconds: number;
  target: number;
}

export const ProgressControl: FC<ProgressControlProps> = ({
  stepsWithDuration,
  totalSeconds,
  target
}) => {
  const stepDispatch = useStepDispatch();
  const { playing } = useStepState();
  const { globalEnd } = stepsWithDuration[target] || { globalEnd: 0 };

  return (
    <Slider
      value={playing ? globalEnd : 0}
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

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      alignItems: 'center',

      overflow: 'hidden',
      transition: 'flex 0.3s ease-out', // note that we're transitioning flex, not height!
      height: 'auto',
      flex: '1'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    collapsed: {
      flex: 0
    }
  })
);

interface PlayerProps {
  steps: Array<Step>;
}

const Player: FC<PlayerProps> = ({ steps }) => {
  const classes = useStyles();

  const { target, playing } = useStepState();
  const stepDispatch = useStepDispatch();

  const { stepsWithDuration, totalSeconds } = getTimeData(steps);

  return (
    <div className={classes.column}>
      <div className={classes.row}>
        <Button onClick={() => stepDispatch({ type: 'PREV' })}>
          <ArrowLeft />
        </Button>
        <Button
          onClick={() => {
            stepDispatch({ type: 'TOGGLE' });
          }}
        >
          {playing ? <Pause /> : <PlayArrow />}
        </Button>
        <Button onClick={() => stepDispatch({ type: 'NEXT' })}>
          <ArrowRight />
        </Button>

        <ProgressControl
          stepsWithDuration={stepsWithDuration}
          totalSeconds={totalSeconds}
          target={target}
        />
      </div>
    </div>
  );
};

export const StepsRangeWrapper: FC<AutoPlayFlowProps> = ({
  leftTimelineId,
  rightTimelineId
}) => {
  const classes = useStyles();

  const { target, playing, maxStepsCount } = useStepState();

  const stepDispatch = useStepDispatch();

  const [steps, setSteps] = useState<Array<Step>>([]);

  useEffect(() => {
    if (maxStepsCount === 0 && playing) {
      const steps = getSteps(leftTimelineId, rightTimelineId);
      stepDispatch({ type: 'INIT', maxStepsCount: steps.length });
      setSteps(steps);
    }
  }, [leftTimelineId, rightTimelineId, maxStepsCount, playing]);

  const { stepsWithDuration } = getTimeData(steps);

  const activeStepWithDuration = stepsWithDuration[target];

  const activeStep = steps[target];

  // does the heavy lifting
  useStepsProgress(activeStepWithDuration?.duration);

  return (
    <>
      <Player steps={steps} />

      <div
        className={clsx(classes.row, {
          [classes.collapsed]: !activeStep?.description
        })}
      >
        <Typography variant='h4'>{activeStep?.description}</Typography>
      </div>
    </>
  );
};

interface Step {
  selector: string;
  start: number;
  end: number;
  label: string;
  description?: string;
  timelineId?: string;
}

const getSteps = (timelineId: string, _rightTimelineId: string) =>
  [
    {
      selector: `timeline-${timelineId}-tab-posts`,
      start: 0,
      end: 5000,
      label: '1',
      description: `Let's create some content on your favorite social media platform bookface.com. To do so, navigate to the posts tab.`
    },
    {
      selector: `timeline-${timelineId}-content-create`,
      start: 5000,
      end: 10000,
      label: '2',
      description: `Enter the editor and type your content.`
    },
    {
      selector: `timeline-${timelineId}-content-post`,
      start: 10000,
      end: 15000,
      label: '3',
      description: `Submit the content once it's finished.`
    },
    {
      selector: `progressiveStepBuilder-${0}`,
      start: 15000,
      end: 20000,
      label: '4',
      description: `You hand the content to the operator to distribute it among your social contacts, and even further, the content is leaving your range of control.`,
      timelineId
    },
    {
      selector: `progressiveStepBuilder-${1}`,
      start: 20000,
      end: 25000,
      label: '5',
      description: `The content gets uploaded and enters the operator's digital infrastructure.`,
      timelineId
    },
    {
      selector: `progressiveStepBuilder-${2}`,
      start: 25000,
      end: 30000,
      label: '6',
      description: `The operator distributes your content to all your friends and or users subscribed to your social media profile`,
      timelineId
    },
    {
      selector: `progressiveStepBuilder-${3}`,
      start: 30000,
      end: 35000,
      label: '7',
      description: `On request, the content gets downloaded from the operator's digital infrastructure to the user's device. A typical social media application puts new content at the top of your news feed.`,
      timelineId
    }
  ] as Array<Step>;

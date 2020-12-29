import { Portal } from '@app/components';
import {
  Player,
  PlayerHooks,
  PlayerTypes,
  PlayerUtils,
  StepProvider,
  useStepDispatch,
  useStepState,
} from '@demonstrator/components';
import dynamic from 'next/dynamic';
import React, { FC, useEffect, useState } from 'react';

import { getSteps } from './FlowPlayControl.cfg';

interface FlowPlayControlProps {
  leftTimelineId: string;
  rightTimelineId: string;
}

const Cursor = dynamic(
  () => import('@demonstrator/components').then(module => module.Cursor),
  { ssr: false }
);

export const FlowPlayControl: FC<FlowPlayControlProps> = ({
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

const StepsRangeWrapper: FC<FlowPlayControlProps> = ({
  leftTimelineId,
  rightTimelineId
}) => {
  const { target, playing, maxStepsCount } = useStepState();

  const stepDispatch = useStepDispatch();

  const [steps, setSteps] = useState<Array<PlayerTypes.Step>>([]);

  useEffect(() => {
    if (maxStepsCount === 0 && playing) {
      const steps = getSteps(leftTimelineId, rightTimelineId).standard;
      stepDispatch({ type: 'INIT', maxStepsCount: steps.length });
      setSteps(steps);
    }
  }, [leftTimelineId, rightTimelineId, maxStepsCount, playing]);

  const activeStep = steps[target];

  const { stepsWithDuration } = PlayerUtils.playertime.getTimeData(steps);

  const { duration } =
    stepsWithDuration.length > 0 ? stepsWithDuration[target] : { duration: 0 };

  // does the heavy lifting
  PlayerHooks.useStepsProgress(duration);

  return (
    <>
      <Player steps={steps} />

      <Portal.PortalIn portalType={Portal.PortalType.Cursor}>
        {playing && activeStep ? (
          <Cursor selector={`#${activeStep?.selector}`} />
        ) : null}
      </Portal.PortalIn>
    </>
  );
};

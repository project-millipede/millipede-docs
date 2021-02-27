import { Portal } from '@app/components';
import { Player, useStepDispatch, useStepState } from '@demonstrator/components';
import { Step } from '@demonstrator/components/src/player/types';
import dynamic from 'next/dynamic';
import React, { FC, useEffect, useMemo } from 'react';

interface FlowPlayControlProps {
  steps: Array<Step>;
  topic: string;
}

const Cursor = dynamic(
  () => import('@demonstrator/components').then(module => module.Cursor),
  { ssr: false }
);

export const FlowPlayControl: FC<FlowPlayControlProps> = ({ steps, topic }) => {
  return <StepsRangeWrapper topic={topic} steps={steps} />;
};

const StepsRangeWrapper: FC<FlowPlayControlProps> = ({ steps, topic }) => {
  const { target, playing, maxStepsCount } = useStepState();

  const stepDispatch = useStepDispatch();

  useEffect(() => {
    if (maxStepsCount === 0 && playing) {
      stepDispatch({ type: 'INIT', maxStepsCount: steps.length });
    }
  }, [maxStepsCount, playing, topic]);

  const activeStep = steps[target];
  const { stepsWithDuration } = Player.Utils.playertime.getTimeData(steps);

  const duration = useMemo(() => {
    const { duration } =
      stepsWithDuration && stepsWithDuration.length > 0 && target >= 0
        ? stepsWithDuration[target]
        : { duration: 0 };
    return duration;
  }, [target]);

  // does the heavy lifting
  Player.Hooks.useStepsProgress(duration);

  return (
    <Portal.PortalIn portalType={Portal.PortalType.Cursor}>
      {playing && activeStep ? (
        <Cursor selector={`#${activeStep?.selector}`} />
      ) : null}
    </Portal.PortalIn>
  );
};

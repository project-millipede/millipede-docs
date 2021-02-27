import { Portal } from '@app/components';
import { StringUtil } from '@app/utils';
import { Player, useStepDispatch, useStepState } from '@demonstrator/components';
import { Step } from '@demonstrator/components/src/player/types';
import isFunction from 'lodash/isFunction';
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

  const { selector } = steps[target] || { selector: '' };
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

  useEffect(() => {
    if (isFunction(selector)) {
      selector();
    }
  }, [selector]);

  return (
    <Portal.PortalIn portalType={Portal.PortalType.Cursor}>
      {playing &&
      !isFunction(selector) &&
      !StringUtil.isEmptyString(selector as string) ? (
        <Cursor selector={`#${selector}`} />
      ) : null}
    </Portal.PortalIn>
  );
};

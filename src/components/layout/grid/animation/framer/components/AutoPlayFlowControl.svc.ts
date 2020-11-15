import _ from 'lodash';
import { useEffect, useRef } from 'react';

import { useStepDispatch, useStepState } from './codehike/site/src/steps/StepProvider';

export type Step = {
  label: string;
  start: number;
  end: number;
};

export type AbsoluteStep = Step & {
  duration: number;
  globalStart: number;
  globalEnd: number;
};

export const useInterval = (cb: () => void, delay: number) => {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const tick = () => {
      callbackRef.current();
    };
    if (delay > 0) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};

export const useStepsProgress = (delay: number) => {
  const { playing, target, maxStepsCount } = useStepState();
  const stepDispatch = useStepDispatch();

  useInterval(
    () => {
      if (target === maxStepsCount - 1) {
        stepDispatch({ type: 'RESET' });
        return;
      }
      if (playing) {
        stepDispatch({ type: 'AUTO' });
      }
    },
    playing ? delay : 0
  );
};

export const getStepByTime = (steps: Array<AbsoluteStep>, value: number) => {
  const stepIndices: Array<{ stepIndex: number }> = [];

  steps.forEach((step, index) => {
    if (_.inRange(value, step.globalStart, step.globalEnd)) {
      stepIndices.push({
        stepIndex: index
      });
    }
  });

  const [firstStep] = stepIndices;

  return firstStep;
};

export const getTimeData = (steps: Array<Step>) => {
  let cumulativeDuration = 0;
  const stepsWithDuration =
    steps.map(step => {
      const duration = step.end - step.start;
      cumulativeDuration += duration;
      return {
        ...step,
        duration,
        globalStart: cumulativeDuration - duration,
        globalEnd: cumulativeDuration
      };
    }) || [];

  const totalSeconds = stepsWithDuration.reduce((t, s) => s.duration + t, 0);

  return {
    totalSeconds,
    stepsWithDuration
  };
};

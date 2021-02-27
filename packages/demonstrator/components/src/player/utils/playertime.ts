import inRange from 'lodash/inRange';

import { Step } from '../types';

export type AbsoluteStep = Step & {
  duration: number;
  globalStart: number;
  globalEnd: number;
};

export const getStepByTime = (steps: Array<AbsoluteStep>, value: number) => {
  const stepIndices: Array<{ stepIndex: number }> = [];

  steps.forEach((step, index) => {
    if (inRange(value, step.globalStart, step.globalEnd)) {
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
    steps.map<AbsoluteStep>(step => {
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

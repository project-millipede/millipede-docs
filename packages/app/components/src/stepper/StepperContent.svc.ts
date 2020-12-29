import { ContentTypes } from '@app/types';

export const getStepsLength = (
  elements: Array<ContentTypes.Content> = []
): number => {
  return elements.map(item => item.step).reduce(findMax, 0);
};

export const findMax = (acc: number, value: number) => {
  return Math.max(acc, value);
};

export const selectContent = (
  steps: Array<ContentTypes.Content> = [],
  currentStep: number
): Array<ContentTypes.Content> => {
  return steps.filter(value => value.step === currentStep);
};

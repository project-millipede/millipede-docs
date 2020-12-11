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
  array: Array<ContentTypes.Content> = [],
  step: number
): Array<ContentTypes.Content> => {
  return array.filter(value => value.step === step).map(value => value);
};

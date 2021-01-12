import isArray from 'lodash/isArray';

export const isEmptyString = (value: string) => {
  if (typeof value === 'string' && value.length === 0) {
    return true;
  }
  return false;
};

export const stringToArray = (text: Array<string> | string) => {
  if (isArray(text)) {
    return [...text];
  }
  if (typeof text === 'string') {
    return [...text.split(' ')];
  }
  return [];
};

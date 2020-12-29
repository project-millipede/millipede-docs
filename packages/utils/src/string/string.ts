import isArray from 'lodash/isArray';

export const stringToArray = (text: Array<string> | string) => {
  if (isArray(text)) {
    return [...text];
  }
  if (typeof text === 'string') {
    return [...text.split(' ')];
  }
  return [];
};

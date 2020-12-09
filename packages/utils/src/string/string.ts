import _ from 'lodash';

export const stringToArray = (text: Array<string> | string) => {
  if (_.isArray(text)) {
    return [...text];
  }
  if (typeof text === 'string') {
    return [...text.split(' ')];
  }
  return [];
};

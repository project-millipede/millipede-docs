import { isString } from '../guard/primitives';

export const isEmptyString = (value: string) => {
  if (isString(value) && value.length === 0) {
    return true;
  }
  return false;
};

export const contains = <T>(array: Array<T>) => (val: T) =>
  array.indexOf(val) !== -1;

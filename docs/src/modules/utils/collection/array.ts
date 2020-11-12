import { compareDesc } from 'date-fns';
import _ from 'lodash';

type FilterFunction<T> = (item: T) => boolean;

/**
 * A function to insert an item into an array. If the given index is within the array bounds,
 * then we replace the item in the array at that index with the given item. Else we simply append
 * the item to the end of the array.
 *
 * Function returns a new array and does not mutate the given array.
 *
 * @param array The array to insert into
 * @param item The item to insert
 * @param position The position of the item in the given array, can be either a number index or a function to filter by
 */
export const arrayInsert = <T>(
  array: Array<T> = [],
  item: T,
  position: number | FilterFunction<T>
): Array<T> => {
  if (typeof position === 'function') {
    return array.reduce((acc, val) => {
      if (position(val)) {
        acc.push(item);
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  }

  if (position > -1 && position < array.length) {
    return [
      ...array.slice(0, position),
      item,
      ...array.slice(position + 1, array.length)
    ];
  }

  return [...array, item];
};

/**
 * A function to omit an item from an array at a given index. We return
 * a new array with all elements up until the index and all elements that
 * follow after the index, excluding the item at the provided index.
 *
 * Function returns a new array and does not mutate the given array.
 *
 * @param array The array to exclude the item
 * @param index The index of the item to exclude
 */
export const omitAtIndex = <T>(
  array: Array<T> = [],
  index: number
): Array<T> => {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
};

export const insertAtWithPreserve = <T>(
  array: Array<T> = [],
  item: T,
  index: number
): Array<T> => {
  if (index > -1 && index < array.length) {
    return [
      ...array.slice(0, index),
      item,
      ...array.slice(index, array.length)
    ];
  }
  return [...array, item];
};

export const updateAt = <T>(
  source: Array<T>,
  item: T,
  index: number
): Array<T> => [...source.slice(0, index), item, ...source.slice(index + 1)];

export const contains = <T>(array: Array<T>) => (val: T) =>
  array.indexOf(val) !== -1;

/**
 * Picks a number of items from an array at random
 * @param {Array} arr - Array to pick items from
 * @param {Number} num - Number of items to take
 * @returns {Array} N number of values taken from array at random
 *
 * @example
 * takeNRandom([1, 2, 3, 4, 5], 3); // [3, 5, 2]
 */

export const takeNRandom = <T>(arr: Array<T>, num: number) => {
  const indices = [];

  while (
    // the indices array is less than the amount we want
    indices.length < num &&
    // the indices array is not the same length as the array
    // this will stop the loop if the indices array becomes the same size as the array
    indices.length !== arr.length
  ) {
    // get a random number according to the array's length
    const random = Math.floor(Math.random() * arr.length);

    // if the array already includes the item, do not push item
    if (!indices.includes(random)) {
      indices.push(random);
    }
  }

  // map each index to the item in the array at each index
  return indices.map(index => arr[index]);
};

export const compareDescFn = (field: string) => (a: any, b: any) => {
  return compareDesc(_.get(a, field), _.get(b, field));
};

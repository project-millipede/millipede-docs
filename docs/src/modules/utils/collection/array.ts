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

// TODO: GRI: A test is neccessary
export const updateAt = <T>(
  source: Array<T>,
  item: T,
  index: number
): Array<T> => [...source.slice(0, index), item, ...source.slice(index + 1)];
